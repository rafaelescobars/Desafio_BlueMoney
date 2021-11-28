// Definir child_process
const child_process = require("child_process");

//ejecutar child process entregando arhgumentos por consola
child_process.exec('node index.js Desafio_BlueMoney txt dolar 100000', (err, result) => {
  console.log(result);
});