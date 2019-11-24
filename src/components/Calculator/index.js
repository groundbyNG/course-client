import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import MathJax from 'react-mathjax2'
import BackspaceIcon from '@material-ui/icons/Backspace';
import {api} from '../../constants';
import './style.css';

function Calculator() {
  const [answer, setAnswer] = useState('');
  const [taskNumber, setTaskNumber] = useState(0);
  const [results, setResult] = useState([]);
  const examples = [
    {
      question: '\\sqrt{64} = ',
      answer: '8',
    },
    {
      question: '176\\div4 = ',
      answer: '44',
    },
    {
      question: '99+14 = ',
      answer: '108',
    },
    {
      question: '165\\div15 = ',
      answer: '11',
    },
    {
      question: '164-86 = ',
      answer: '78',
    },
    {
      question: '116-68 = ',
      answer: '48',
    },
    {
      question: '113-15 = ',
      answer: '98',
    },
    {
      question: '175\\div5 = ',
      answer: '35',
    },
  ];
  const history = useHistory();

  const onButtonClick = (digit) => {
    if (answer.length < 6) {
      setAnswer(answer + digit);
    }
  }

  const onRemoveDigit = () => {
    setAnswer(answer.slice(0, -1));
  }

  const onReady = () => {
    if (answer.length > 0) {
      results.push({
        question: ascii,
        answer,
        correct: examples[taskNumber].answer === answer,
        correctAnswer: examples[taskNumber].answer,
      })
      setResult(results);
      setAnswer('');
      taskNumber === examples.length ? setTaskNumber(0) : setTaskNumber(taskNumber + 1);
    }
  }

  const ascii = examples[taskNumber].question;
  return (
    <div className="calculator">
      <div className="cacl-container">
        <div className="task">
          <div className="question">
            <MathJax.Context input='ascii'>
              <div>
                <MathJax.Node inline>{ascii}</MathJax.Node>
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
                    <div className="mt-3 mb-3 col-4">
                      <Button onClick={onRemoveDigit} className="number-btn error-btn">
                        <BackspaceIcon/>
                      </Button>
                    </div>

                  )
                }
                case 11: {
                  return (
                    <div className="mt-3 mb-3 col-4">
                      <Button onClick={() => onButtonClick(0)} className="number-btn">
                        0
                      </Button>
                    </div>
                  )
                }
                case 12: {
                  return (
                    <div className="mt-3 mb-3 col-4">
                      <Button onClick={onReady} className="number-btn ready-btn">
                        <DoneIcon/>
                      </Button>
                    </div>
                  )
                }
                default: {
                  return (
                    <div className="mt-3 mb-3 col-4">
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
      <div className="result-container">
        <h2>Results: </h2>
        {
          results.length > 0 && results.map((result, index) => {
            return (
              <div className="result">
                {index + 1}:
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
    </div>
  );
}

export default Calculator;
