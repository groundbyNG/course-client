import React, {useEffect, useState} from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import {api} from "../../../../../constants";
import {request} from "../../../../../helpers/request";
import 'react-circular-progressbar/dist/styles.css';
import './style.css';
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {useHistory} from "react-router-dom";

function Stat() {
  const history = useHistory();
  const [top, setTop] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getTop();
    getPercentage();
  }, []);

  const pushToCalc = () => {
    history.push('/calculator');
  };

  const getTop = async () => {
    const result = await request('GET', true, null,`${api}/math-stat/top`);
    setTop(result);
  };

  const getPercentage = async () => {
    const results = await request('GET', true, null,`${api}/math-stat/all`);
    if (results.attempts) {
      setPercentage(Math.floor(((results.correct / 10) / results.attempts) * 100));
      setAttempts(results.attempts);
      setScore(results.correct);
    }
  };

  return (
    <div className="client-math-stat">
      <Button className="back-button" variant="contained" color="primary" onClick={pushToCalc}>
        <KeyboardBackspaceIcon/>
      </Button>
      <div className="scoreboard">
        <div className="scoreboard-row scoreboard-header">
          Top 5
        </div>
        {top.length > 0 && (
          top.map((elem, index) => (
            <div key={index} className="scoreboard-row">
              <span className="scoreboard-email">
                {elem.email}
              </span>
              <span className="scoreboard-value">
                {elem.correct}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="percentage">
        <CircularProgressbar className="progress-stat" value={percentage} text={`${percentage}%`} />
        <div className="user-stat">
          <div>
            <h2>Attempts</h2>
            <span>{attempts}</span>
          </div>
          <div>
            <h2>Score</h2>
            <span>{score}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stat;
