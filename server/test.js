const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: '/dev/ttyS0', baudRate: 14400 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', console.log)
