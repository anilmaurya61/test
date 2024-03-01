import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

HighchartsExporting(Highcharts);

function App() {

  const [homeValue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(5);
  const [principle, setPrinciple] = useState(0);
  const [interest, setInterest] = useState(0)
  
  useEffect(() => {
    const chart = Highcharts.chart('container1', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Principle and Interest'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Percentage',
        colorByPoint: true,
        data: [{
          name: 'Principle',
          y: principle
        }, {
          name: 'Interest',
          y: interest,
          selected: true
        }]
      }]
    });

    return () => {
      chart.destroy();
    };
  }, [principle, interest]);

  function calculatePrincipleAndInterest(homeValue, downPayment, loanAmount, interestRate, tenure) {
    // Calculate principle amount
    const principle = loanAmount;

    // Calculate total interest
    const monthlyInterestRate = interestRate / 1200; // Convert annual interest rate to monthly and percentage to decimal
    const numberOfPayments = tenure * 12; // Convert tenure from years to months
    const totalInterest = (loanAmount * monthlyInterestRate * numberOfPayments) / loanAmount * 100; // Calculate interest as a percentage of the loan amount

    return {
        principle: principle,
        interest: totalInterest
    };
}

  const handleHomevalueChange = (event, newValue) => {
    setHomeValue(newValue);
  };
  const handleDownPaymentChange = (event, newValue) => {
    setDownPayment(newValue);
  };
  const handleLoanAmountChange = (event, newValue) => {
    setLoanPayment(newValue);
  };
  const handleInterestRateChange = (event, newValue) => {
    setInterestRate(newValue);
  };
  const handleTenureChange = (event) => {
    setTenure(event.target.value);
  };

  useEffect(()=>{
    let principleandInterest = calculatePrincipleAndInterest(homeValue, downPayment, loanAmount, interestRate, tenure)
    setPrinciple(principleandInterest.principle)
    setInterest(principleandInterest.interest)
    console.log(principleandInterest)
  },[homeValue, downPayment, loanAmount, interestRate, tenure])
  return (
    <div className="container">
      <div className='left-container'>
        <div className='slider'>
          <div className='home-value'>
            <p>Home Value</p>
            <p>₹ {homeValue}</p>
            <Slider
              value={homeValue}
              onChange={handleHomevalueChange}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={1000}
              max={10000000}
              step={1000}
              defaultValue={1000}
            />
          </div>

          <div className='home-value'>
            <p>Down Payment</p>
            <p>₹ {downPayment}</p>
            <Slider
              value={downPayment}
              onChange={handleDownPaymentChange}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={10}
              defaultValue={0}
            />
          </div>

          <div className='home-value'>
            <p>Loan Amount</p>
            <p>₹ {loanAmount}</p>
            <Slider
              value={loanAmount}
              onChange={handleLoanAmountChange}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={10}
              defaultValue={0}
            />
          </div>

          <div className='home-value'>
            <p>Intrest Rate</p>
            <p>% {interestRate}</p>
            <Slider
              value={interestRate}
              onChange={handleInterestRateChange}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={2}
              max={18}
              step={1}
              defaultValue={2}
            />
          </div>
        </div>
        <div className='formcontrol'>
          <FormControl style={{ width: '80%', margin: '0 auto' }}>
            <InputLabel id="demo-simple-select-label">Tenure</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tenure}
              label="Tenure"
              onChange={handleTenureChange}
            >
              <MenuItem value={5}>5 Years</MenuItem>
              <MenuItem value={10}>10 Years</MenuItem>
              <MenuItem value={15}>15 Years</MenuItem>
              <MenuItem value={20}>20 Years</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='right-container'>
        <h2>Monthly Payment: ₹ 1597.00</h2>
        <div id="container1" style={{ width: '100%', height: '400px' }}></div>
      </div>
    </div>
  );
}

export default App;
