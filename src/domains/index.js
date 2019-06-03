
const database = require('../database')

const service = require('../services')

const { FieldValidationError } = require('../helpers/errors')

const Request = database.model('request')

module.exports = class RequestDomain {
  async newRequest(bodyData) {
    const { ip = null, action = null } = bodyData

    if (!ip) {
      throw new FieldValidationError([{
        field: 'ip',
        message: 'ip is inválid',
      }])
    }

    if (!action) {
      throw new FieldValidationError([{
        field: 'action',
        message: 'action is inválid',
      }])
    }

    const newRequest = {
      ip,
      actionReset: false,
      actionResetSucess: false,
      actionStatus: false,
      actionStatusSucess: false,
      tempoLigado: '0',
      tempoConectado: '0',
      tempoDesconectado: '0',
      quantasVezesTPLinkReiniciou: '0',
      ping: '0',
      firmwareVersion: '0',
      percent: '0',
    }

    let response = null

    if (action === 'getStatus') {
      response = await service.getStatus(ip)

      newRequest.actionStatus = true

      if (response.success) {
        newRequest.actionStatusSucess = true
        newRequest.tempoLigado = response.data.tempoLigado
        newRequest.tempoConectado = response.data.tempoConectado
        newRequest.tempoDesconectado = response.data.tempoDesconectado
        newRequest.quantasVezesTPLinkReiniciou = response.data.quantasVezesTPLinkReiniciou
        newRequest.ping = response.data.ping
        newRequest.firmwareVersion = response.data.firmwareVersion
        newRequest.percent = response.data.percent
      }
    }

    if (action === 'resetRelogio') {
      try {
        response = await service.resetRelogio(ip)

        newRequest.actionReset = true

        if (response.success) {
          newRequest.actionResetSucess = true
        }
      } finally {
        // NOTHING
      }
    }

    const requestCreated = await Request.create(newRequest)

    return requestCreated
  }
}
