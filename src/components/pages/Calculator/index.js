import React from 'react';
import StudentCalculator from './client';
import AdminCalculator from './admin';

function Calculator() {
  return (
    <>
      {localStorage.role === 'student' ?
        <StudentCalculator/> : <AdminCalculator/>
      }
    </>
  );
}

export default Calculator;
