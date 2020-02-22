import React, {useEffect, useState} from 'react';
import Table from "../../../../common/Table";
import {api} from "../../../../../constants";
import {request} from "../../../../../helpers/request";
import 'react-circular-progressbar/dist/styles.css';
import './style.css';
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

function Stat() {
  const history = useHistory();
  const [top, setTop] = useState([]);
  useEffect(() => { getTop(); }, []);

  const pushToCalc = () => {
    history.push('/calculator');
  };

  const getTop = async () => {
    const result = await request('GET', true, null,`${api}/math-stat/top`);
    setTop(result);
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
      <div className="full-stat">
        <Table
          title="Users math statistic"
          columns={[
            { title: 'User', field: 'email' },
            { title: 'Score', field: 'correct' },
            { title: 'Attempts', field: 'attempts' },
          ]}
          route="/math-stat/all"
          isEditable={false}
        />
      </div>
    </div>
  )
}

export default Stat;
