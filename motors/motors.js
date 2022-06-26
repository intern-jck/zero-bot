
const Gpio = require('pigpio').Gpio;

const pwmA = new Gpio( 18, { mode: Gpio.OUTPUT });
const in1 = new Gpio( 17, { mode: Gpio.OUTPUT });
const in2 = new Gpio( 27, { mode: Gpio.OUTPUT });

const pwmB = new Gpio( 12, { mode: Gpio.OUTPUT });
const in3 = new Gpio( 20, { mode: Gpio.OUTPUT });
const in4 = new Gpio( 21, { mode: Gpio.OUTPUT });


const moveBot = (dir, spd) => {

  switch(dir) {
    // Stop
    case 0:
      in1.digitalWrite(0);
      in2.digitalWrite(0);
      pwmA.pwmWrite(0);
      in3.digitalWrite(0);
      in4.digitalWrite(0);
      pwmB.pwmWrite(0);
      break;

    // Forward
    case 1:
      in1.digitalWrite(1);
      in2.digitalWrite(0);
      pwmA.pwmWrite(spd);
      in3.digitalWrite(1);
      in4.digitalWrite(0);
      pwmB.pwmWrite(spd);
      break;

    // Backward
    case 2:
      in1.digitalWrite(0);
      in2.digitalWrite(1);
      pwmA.pwmWrite(spd);
      in3.digitalWrite(0);
      in4.digitalWrite(1);
      pwmB.pwmWrite(spd);
      break;

    // Left
    case 3:
      in1.digitalWrite(0);
      in2.digitalWrite(1);
      pwmA.pwmWrite(spd);
      in3.digitalWrite(1);
      in4.digitalWrite(0);
      pwmB.pwmWrite(spd);
      break;

    // Right
    case 4:
      in1.digitalWrite(1);
      in2.digitalWrite(0);
      pwmA.pwmWrite(spd);
      in3.digitalWrite(0);
      in4.digitalWrite(1);
      pwmB.pwmWrite(spd);
      break;
  }
}



/*
const leftMotor = (dir, spd) => {

  switch(dir) {

    case 0:
     
      break;

    case 1:
      in1.digitalWrite(1);
      in2.digitalWrite(0);
      pwmA.pwmWrite(spd);
      break;

    case 2:
      in1.digitalWrite(0);
      in2.digitalWrite(1);
      pwmA.pwmWrite(spd);
      break;
  };
};

const rightMotor = (dir, spd) => {

  switch(dir) {

    case 0:
      in3.digitalWrite(0);
      in4.digitalWrite(0);
      pwmB.pwmWrite(0);
      break;

    case 1:
      in3.digitalWrite(0);
      in4.digitalWrite(1);
      pwmB.pwmWrite(spd);
      break;

    case 3:
      in3.digitalWrite(1);
      in4.digitalWrite(0);
      pwmB.pwmWrite(spd);
      break;
  };
};
*/
//module.exports = { leftMotor, rightMotor };
module.exports = { moveBot };
