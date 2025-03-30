import { useState } from 'react';
import * as math from 'mathjs';
import Button from './Button';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [isDegree, setIsDegree] = useState(true);

  const handleClick = (value) => {
    if (value === 'DEG/RAD') {
      setIsDegree(!isDegree);
      return;
    }

    if (value === '=') {
      try {
        let expression = display;
        if (isDegree && (expression.includes('sin(') || expression.includes('cos(') || expression.includes('tan('))) {
          // Convert degree to radian before calculation
          expression = expression.replace(/sin\(/g, 'sin(pi/180*');
          expression = expression.replace(/cos\(/g, 'cos(pi/180*');
          expression = expression.replace(/tan\(/g, 'tan(pi/180*');
        }
        setDisplay(math.evaluate(expression).toString());
      } catch (error) {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
    } else if (value === '⌫') {
      setDisplay(display.slice(0, -1));
    } else if (value === 'π') {
      setDisplay(display + Math.PI);
    } else if (value === 'e') {
      setDisplay(display + Math.E);
    } else if (value === '√') {
      setDisplay(display + 'sqrt(');
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    'sin(', 'cos(', 'tan(', '(',    ')',    'DEG/RAD',
    'π',    'e',    '^',    '√',    'log(', 'C',
    '7',    '8',    '9',    '/',    '%',    '⌫',
    '4',    '5',    '6',    '*',    '!',    'abs(',
    '1',    '2',    '3',    '-',    'acos(','asin(',
    '0',    '.',    '=',    '+',    'atan(', 'exp('
  ];

  return (
    <div className="calculator">
      <input type="text" className="display" value={display} readOnly />
      <div className="buttons">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            className={`btn ${
              btn === 'DEG/RAD' 
                ? 'mode-toggle' 
                : isNaN(btn) && btn !== '.' 
                  ? 'operator' 
                  : 'number'
            }`}
            value={btn === 'DEG/RAD' ? (isDegree ? 'DEG' : 'RAD') : btn}
            onClick={() => handleClick(btn)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
