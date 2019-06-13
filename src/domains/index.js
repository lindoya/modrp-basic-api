
const tcpp = require('tcp-ping')

const database = require('../database')

const service = require('../services')

const { FieldValidationError } = require('../helpers/errors')

const Request = database.model('request')
const Status = database.model('status')

const ConnectionTest = async (ip, port) => new Promise((resolve, reject) => {
  tcpp.ping({
    address: ip, port, attempts: 3, timeout: 5000,
  }, (err, data) => {
    if (err) reject(err)
    if (data.min) resolve(true)
    resolve(false)
  })
})

const PingTest = async (ip, port) => new Promise((resolve, reject) => {
  tcpp.ping({
    address: ip, port, attempts: 10, timeout: 5000,
  }, (err, data) => {
    if (err) reject(err)
    resolve(data)
  })
})

module.exports = class RequestDomain {
  async newRequest(bodyData, options = {}) {
    const { transaction = null } = options
    const { ip = null, port = 3001, action = null } = bodyData

    if (!ip) {
      throw new FieldValidationError([{
        field: 'ip',
        message: 'O ip informado está inválido.',
      }])
    }

    const regexIp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g

    if (!regexIp.test(ip)) {
      throw new FieldValidationError([{
        field: 'ip',
        message: 'O ip informado está inválido.',
      }])
    }

    if (!action) {
      throw new FieldValidationError([{
        field: 'action',
        message: 'A ação informada está inválida.',
      }])
    }

    const newRequest = {
      ip,
      actionReset: false,
      actionResetSucess: false,
      actionStatus: false,
      actionStatusSucess: false,
      actionPing: false,
      actionPingSucess: false,
      offLine: false,
      notV4: false,
      status: null,
    }

    let response = null

    if (action === 'getStatus') {
      newRequest.actionStatus = true

      if (!await ConnectionTest(ip, 3001)) {
        newRequest.offLine = true
        await Request.create(newRequest)
        throw new FieldValidationError([{
          field: 'ip',
          message: 'O módulo está offline.',
        }])
      }

      if (!await ConnectionTest(ip, 4560)) {
        newRequest.notV4 = true
        await Request.create(newRequest)
        throw new FieldValidationError([{
          field: 'ip',
          message: 'Este não é um módulo V4.',
        }])
      }

      const newStatus = {
        ip: newRequest.ip,
        tempoLigado: '0',
        tempoConectado: '0',
        tempoDesconectado: '0',
        quantasVezesTPLinkReiniciou: '0',
        ping: '0',
        firmwareVersion: '0',
        percent: '0',
      }

      response = await service.getStatus(ip)

      try {
        if (response.success) {
          newStatus.tempoLigado = response.data.tempoLigado
          newStatus.tempoConectado = response.data.tempoConectado
          newStatus.tempoDesconectado = response.data.tempoDesconectado
          newStatus.quantasVezesTPLinkReiniciou = response.data.quantasVezesTPLinkReiniciou
          newStatus.ping = response.data.ping
          newStatus.firmwareVersion = response.data.firmwareVersion
          newStatus.percent = response.data.percent
          newRequest.status = newStatus
          newRequest.actionStatusSucess = true
        }
      } catch (err) {
        newRequest.actionStatusSucess = false
      }

      const requestCreated = await Request.create(newRequest, { include: [Status], transaction })

      return requestCreated
    }

    if (action === 'resetRelogio') {
      newRequest.actionReset = true

      if (!await ConnectionTest(ip, 3001)) {
        newRequest.offLine = true
        await Request.create(newRequest)
        throw new FieldValidationError([{
          field: 'ip',
          message: 'O módulo está offline.',
        }])
      }

      if (!await ConnectionTest(ip, 4560)) {
        newRequest.notV4 = true
        await Request.create(newRequest)
        throw new FieldValidationError([{
          field: 'ip',
          message: 'Este não é um módulo V4.',
        }])
      }

      try {
        response = await service.resetRelogio(ip)

        if (response) {
          newRequest.actionResetSucess = true
        }
      } finally {
        // nothing
      }
      const requestCreated = await Request.create(newRequest)
      return requestCreated
    }

    if (action === 'ping') {
      newRequest.actionPing = true

      if (!await ConnectionTest(ip, 3001)) {
        newRequest.offLine = true
        await Request.create(newRequest)
        throw new FieldValidationError([{
          field: 'ip',
          message: 'O módulo está offline.',
        }])
      }

      const data = await PingTest(ip, 3001)

      const newPingFormatted = {
        ...data,
        results: JSON.stringify(data.results),
      }
      newRequest.actionPingSucess = true

      newRequest.ping = newPingFormatted

      await Request.create(newRequest)

      newRequest.ping = data

      return newRequest
    }

    if (action === 'port') {
      newRequest.actionPort = true

      if (!await ConnectionTest(ip, 3001)) {
        newRequest.offLine = true
        await Request.create(newRequest)
        throw new FieldValidationError([{
          field: 'ip',
          message: 'O módulo está offline.',
        }])
      }

      newRequest.actionPortSucess = await ConnectionTest(ip, port)

      await Request.create(newRequest)

      return newRequest
    }

    return newRequest
  }
}
