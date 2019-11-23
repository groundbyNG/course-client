import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { PacmanLoader } from 'react-spinners';
import { api } from '../../constants';
import './style.css';

function Calculator() {
  const [status, setStatus] = useState('taxDefining');
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [tax, setTax] = useState(0);
  const [taxProcent, setTaxProcent] = useState(0);
  const history = useHistory();

  const handleDestination = (event) => setDestination(event.target.value);
  const handleAmount = (event) => setAmount(event.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'taxDefining') {
      try {
        setStatus('loading');
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${localStorage.token}` },
        }
        const response = await fetch(`${api}/tax`, options);
        const { taxRate } = await response.json();
        setStatus('confirmOperation');
        setTax((taxRate / 100 * amount).toFixed());
        setTaxProcent(taxRate);
      } catch (err) { console.log(err); }
    } else {
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${localStorage.token}` },
          body: JSON.stringify({
            destination,
            amount,
            tax
          }),
        }
        const response = await fetch(`${api}/transaction`, options);
        const { status } = await response.json();
        if (status === 200) {
          setStatus('taxDefining');
          setStatus('');
          setDestination('');
          setAmount('');
          setTax('');
          setTaxProcent('');
          alert('Success');
        }
      } catch (err) { console.log(err); }
    }
  }

  const onLogout = () => {
    localStorage.clear();
    history.replace('/');
  }
  
  return (
    <>

    </>
  );
}

export default Calculator;
