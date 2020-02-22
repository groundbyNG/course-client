import React from 'react';
import StudentLibrary from './client';
import AdminLibrary from './admin';

function Library() {
  return (
    <>
      {localStorage.role === 'student' ?
        <StudentLibrary/> : <AdminLibrary/>
      }
    </>
  );
}

export default Library;
