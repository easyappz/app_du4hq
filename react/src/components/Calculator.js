import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    if (waitingForSecondValue) {
      setCurrentValue(parseFloat(display + value));
    }
  };

  const handleOperationClick = (op) => {
    if (currentValue === null) {
      setCurrentValue(parseFloat(display));
    } else if (operation) {
      const result = calculateResult();
      setDisplay(result.toString());
      setCurrentValue(result);
    }
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const calculateResult = () => {
    const secondValue = parseFloat(display);
    switch (operation) {
      case '+':
        return currentValue + secondValue;
      case '-':
        return currentValue - secondValue;
      case '*':
        return currentValue * secondValue;
      case '/':
        return currentValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqualsClick = () => {
    if (currentValue !== null && operation) {
      const result = calculateResult();
      setDisplay(result.toString());
      setCurrentValue(null);
      setOperation(null);
      setWaitingForSecondValue(false);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper elevation={6} sx={{ width: 320, padding: 2, borderRadius: 3, backgroundColor: '#fff' }}>
        <Box sx={{ backgroundColor: '#222', color: '#fff', padding: 2, borderRadius: 1, textAlign: 'right', marginBottom: 2 }}>
          <Typography variant="h4" sx={{ fontFamily: 'monospace' }}>
            {display}
          </Typography>
        </Box>
        <Grid container spacing={1}>
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant={btn === '=' ? 'contained' : 'outlined'}
                color={['+', '-', '*', '/'].includes(btn) ? 'secondary' : 'primary'}
                fullWidth
                sx={{ height: 60, fontSize: 20, borderRadius: 1 }}
                onClick={() => {
                  if (btn === 'C') handleClearClick();
                  else if (btn === '=') handleEqualsClick();
                  else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn);
                  else handleNumberClick(btn);
                }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Calculator;
