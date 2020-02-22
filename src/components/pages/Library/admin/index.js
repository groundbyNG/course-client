import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import {api} from '../../../../constants';
import './style.css';
import PauseCircleOutlineTwoToneIcon from '@material-ui/icons/PauseCircleOutlineTwoTone';
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

function Library() {
  const [list, setList] = useState(0);
  const handleChange = () => {

  };

  useEffect(async () => {
    try {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(`${api}/library`, options);
      const { err } = await response.json();
      if (!err) {

      } else {
        alert(err);
      }
    } catch (err) { console.log(err); }
  }, []);

  return (
    <div className="library-admin">

    </div>
  );
}

export default Library;