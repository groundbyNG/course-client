import React from 'react';
import StudentMathStat from './client';
import AdminMathStat from './admin';

function MathStat() {
  return (
    <>
      {localStorage.role === 'student' ?
        <StudentMathStat/> : <AdminMathStat/>
      }
    </>
  );
}

export default MathStat;
