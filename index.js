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



// definir https
const https = require('https');

//definir fs
const fs = require('fs');

//extraer datos de https
https.get(`https://mindicador.cl/api`, resp => {
    resp.on('data', data => {
      let myData = JSON.parse(data);
      let exchangeRate = myData[`${parameters.economicIndex}`].valor
      let conversion = (parameters.pesosQuantity / exchangeRate).toFixed(2);

      fs.writeFile(`${parameters.newFileName}.${parameters.newFileExtension}`, `A la fecha: ${new Date}\nFue realizada la cotización con los siguientes datos:\nCantidad de pesos a convertir: ${parameters.pesosQuantity} pesos\nConvertido a "${parameters.economicIndex}" da un total de: ${conversion}`, `utf8`, () => {
        fs.readFile(`${parameters.newFileName}.${parameters.newFileExtension}`, `utf8`, (err, readFileData) => {
          console.log(readFileData);
        })
      })

    })
  })

  .on('error', err => {
    console.log('Error: ' + err.message)
  })