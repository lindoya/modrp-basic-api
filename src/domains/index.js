
//  const ping = require('node-http-ping')

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
      tempoLigado: '0',
      tempoConectado: '0',
      tempoDesconectado: '0',
      quantasVezesTPLinkReiniciou: '0',
      ping: '0',
      firmwareVersion: '0',
      percent: '0',
      actionPing: false,
      actionPingSucess: false,
      latencia: '0',
      pingsArray: '[]',
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

        if (response) {
          newRequest.actionResetSucess = true
        }
      } finally {
        // NOTHING
      }
    }

    console.log(action)

    if (action === 'ping') {
      const pingArray = []
      try {
  //       ping('google.com', 80 /* optional */)
  // .then(time => console.log(`Response time: ${time}ms`))
  // .catch(() => console.log(`Failed to ping google.com`))
        // // for (let index = 0; index <= 10; index += 1) {
        //   ping('8.8.8.8')
        //     .then((time) => {
        //       console.log(time)
        //     })
        
        // if (pingArray.length > 3) {
        //   newRequest.actionPingSucess = true
        // }
      } finally {
        // NOTHING
      }
    }


    const requestCreated = await Request.create(newRequest)

    return requestCreated
  }
}
