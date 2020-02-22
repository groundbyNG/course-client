import React from 'react';
import StudentVocabular from './client';
import AdminVocabular from './admin';

function Vocabular() {
  return (
    <>
      {localStorage.role === 'student' ?
        <StudentVocabular/> : <AdminVocabular/>
      }
    </>
  );
}

export default Vocabular;
