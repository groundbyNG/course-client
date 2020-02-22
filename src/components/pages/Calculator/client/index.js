import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import DoneIcon from '@material-ui/icons/Done';
import MathJax from 'react-mathjax2'
import BackspaceIcon from '@material-ui/icons/Backspace';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './style.css';
import {request} from "../../../../helpers/request";
import {api} from "../../../../constants";

function Calculator() {
  const history = useHistory();
  const [answer, setAnswer] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [taskNumber, setTaskNumber] = useState(-1);
  const [results, setResult] = useState([]);
  const [examples, setExamples] = useState([]);

  useEffect(() => { getTasks() }, []);

  const getTasks = async () => {
    const result = await request('GET', true, null,`${api}/math`);
    setExamples(examples.concat(result));
    setTaskNumber(taskNumber + 1);
  };

  const sendAnswer = _id => {
    request('POST', true, {_id, answer},`${api}/math-stat`);
  };

  const onButtonClick = (digit) => {
    if (answer.length < 6) {
      setAnswer(answer + digit);
    }
  };

  const onRemoveDigit = () => {
    setAnswer(answer.slice(0, -1));
  };

  const onReady = () => {
    if (answer.length > 0) {
      results.push({
        question: examples[taskNumber].question,
        answer,
        correct: examples[taskNumber].answer === answer,
        correctAnswer: examples[taskNumber].answer,
      });
      setPercentage(Math.floor((results.map(result => result.correct).filter(result => result).length / results.length) * 100));
      setResult(results);
      setAnswer('');
      sendAnswer(examples[taskNumber]._id);
      taskNumber === examples.length - 1 ? getTasks() : setTaskNumber(taskNumber + 1);
    }
  };

  const pushToStat = () => {
    history.push('/math-stat');
  };

  return (
    <div className="student-calculator">
      {examples.length > 0 && taskNumber >= 0 && (
        <>
          <div className="calc-wrapper">
            <div className="calc-container">
            <div className="task">
              <div className="question">
                <MathJax.Context input='ascii'>
                  <div>
                    <MathJax.Node inline>{examples[taskNumber].question}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <div className="answer">
                {answer}
              </div>
            </div>
            <div className="input-block row">
              {
                Array(12).fill(0).map((elem, index) => {
                  switch (index + 1) {
                    case 10: {
                      return (
                        <div key={index} className="mt-3 mb-3 col-4">
                          <Button onClick={onRemoveDigit} className="number-btn error-btn">
                            <BackspaceIcon/>
                          </Button>
                        </div>

                      )
                    }
                    case 11: {
                      return (
                        <div key={index} className="mt-3 mb-3 col-4">
                          <Button onClick={() => onButtonClick(0)} className="number-btn">
                            0
                          </Button>
                        </div>
                      )
                    }
                    case 12: {
                      return (
                        <div key={index} className="mt-3 mb-3 col-4">
                          <Button onClick={onReady} className="number-btn ready-btn">
                            <DoneIcon/>
                          </Button>
                        </div>
                      )
                    }
                    default: {
                      return (
                        <div key={index} className="mt-3 mb-3 col-4">
                          <Button onClick={() => onButtonClick(index + 1)} className="number-btn">
                            {index + 1}
                          </Button>
                        </div>
                      )
                    }
                  }
                })
              }
            </div>
          </div>
          </div>
          <div className="result-container">
            <CircularProgressbar className="progress" value={percentage} text={`${percentage}%`} />
            <h2>Results: </h2>
            {
              results.length > 0 && results.map((result, index) => {
                return (
                  <div key={index} className="result">
                    <div className="result-task">
                      <MathJax.Context input='ascii'>
                        <div>
                          <MathJax.Node inline>{result.question}</MathJax.Node>
                        </div>
                      </MathJax.Context>
                      {result.answer}
                    </div>
                    {!result.correct && <p>(correct: {result.correctAnswer})</p>}
                  </div>
                )
              })
            }
          </div>
          <div className="stat-container">
            <Button variant="contained" color="primary" onClick={pushToStat}>
              <EqualizerIcon/>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Calculator;
