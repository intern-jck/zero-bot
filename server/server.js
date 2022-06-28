// Bot Control
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { moveBot } = require('../motors/motors.js');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

const gpsData = {
  'RMC': {},
  'VTG': {},
  'GGA': {},
  'GSA': {},
  'GLL': {},
};

const gpsPort = new SerialPort({ path: '/dev/ttyS0', baudRate: 9600 });
const parser = gpsPort.pipe(new ReadlineParser());

parser.on('data', (data) => {

  // Parse NMEA sentance
  let sentance = data.split(',');
  let end = sentance.pop();
  end = end.split('*');
  sentance.push(end[0]);
  sentance.push(end[1]);
  sentance[0] = sentance[0].slice(3);

  if (sentance[0] === 'GGA') {
    gpsData.GGA.data = sentance;
    console.log(data);
  // Need to sort out parsing of the sentance
/*
    let GGA = gpsData.GGA;
    GGA.time = sentance[1];
    let n = 1;
    let sign = 1;
    switch(sentance[3]) {
      case 'S':
    }
    GGA.lat = sentance[2], sentance[3];
*/
  }
});

// Send GGA data back
app.get('/bot-gps', (req, res) => {
  res.send(gpsData.GGA);
});

// Motor control
app.put('/bot-move', (req, res) => {
  console.log(req.body);
  moveBot(req.body.dir, req.body.spd);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Zero Bot listening on port ${PORT}`);
});
