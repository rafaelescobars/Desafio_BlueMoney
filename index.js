//definir arreglo de argumentos
const myArgs = process.argv.slice(2)

//definir objeto con parámetros
let parameters = {
  newFileName: '',
  newFileExtension: '',
  economicIndex: '',
  pesosQuantity: ''
}

let i = 0
for (let value in parameters) {
  parameters[value] = myArgs[i]
  i++
}

let newFileName = parameters.newFileName
let newFileExtension = parameters.newFileExtension
let pesosQuantity = parameters.pesosQuantity
let economicIndex = parameters.economicIndex

//definir función que retorne template
const templateReturn = (pesosQuantity, economicIndex, conversion) => {
  return `A la fecha: ${new Date}\nFue realizada la cotización con los siguientes datos:\nCantidad de pesos a convertir: ${pesosQuantity} pesos\nConvertido a "${economicIndex}" da un total de: ${conversion}`
}

// definir https
const https = require('https');

//definir fs
const fs = require('fs');

//extraer datos de https
https.get(`https://mindicador.cl/api`, resp => {
    resp.on('data', data => {
      let myData = JSON.parse(data);
      let exchangeRate = myData[`${parameters.economicIndex}`].valor
      let conversion = (pesosQuantity / exchangeRate).toFixed(2);

      fs.writeFile(`${newFileName}.${newFileExtension}`, templateReturn(pesosQuantity, economicIndex, conversion), `utf8`, () => {
        fs.readFile(`${newFileName}.${newFileExtension}`, `utf8`, (err, readFileData) => {
          console.log(readFileData);
        })
      })

    })
  })

  .on('error', err => {
    console.log('Error: ' + err.message)
  })