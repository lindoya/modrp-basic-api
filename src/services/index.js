const axios = require('axios')

const getStatus = async (IP) => {
  const formatMinutes = (min) => {
    let newMin = min
    newMin = parseInt(newMin, 10)
    const dias = Math.floor(newMin / 1440)
    newMin -= (dias * 1440)
    const horas = Math.floor(newMin / 60)
    newMin -= (horas * 60)

    return `${dias} dias ${horas}h ${newMin}min`
  }

  let responseObject = {
    success: false,
  }

  await axios.get(`http://${IP}:4560/getStatus`, { timeout: 25000 })
    .then((response) => {
      if (response.status === 200) {
        responseObject.success = true

        const dataFormatted = (response.data).split(';')
        responseObject = {
          ...responseObject,
          data: {
            tempoLigado: formatMinutes(dataFormatted[0]),
            tempoConectado: formatMinutes(dataFormatted[1]),
            tempoDesconectado: formatMinutes(dataFormatted[0] - dataFormatted[1]),
            quantasVezesTPLinkReiniciou: dataFormatted[2],
            ping: dataFormatted[3],
            firmwareVersion: dataFormatted[4],
            percent: Math.floor((dataFormatted[1] / dataFormatted[0]) * 100),
          },
        }
      }
    })
    .catch(() => {
      responseObject.success = false
    })
  return responseObject
}

const resetRelogio = async (IP) => {
  let success = false

  await axios.get(`http://${IP}:4560/resetRelogio`, { timeout: 25000 })
    .then((response) => {
      if (response.status === 200) {
        success = true
      }
    })
    .catch(() => {
      success = false
    })
  return success
}

module.exports = {
  getStatus,
  resetRelogio,
}
