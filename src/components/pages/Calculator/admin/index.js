import React from 'react';
import MathJax from "react-mathjax2";
import Button from "@material-ui/core/Button";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import {useHistory} from "react-router-dom";

import Table from '../../../common/Table';
import './style.css';

function Calculator() {
  const history = useHistory();

  const pushToStat = () => {
    history.push('/math-stat');
  };
  return (
    <div className="admin-calculator">
      <div className="stat-container">
        <Button variant="contained" color="primary" onClick={pushToStat}>
          <EqualizerIcon/>
        </Button>
      </div>
      <Table
        title="Math tasks"
        columns={[
          {
            title: 'Question',
            field: 'question',
            render: rowData =>
              <MathJax.Context input='ascii'>
                <div>
                  <MathJax.Node inline>{rowData.question}</MathJax.Node>
                </div>
              </MathJax.Context>
          },
          { title: 'Answer', field: 'answer' },
        ]}
        route="/math"
        isEditable={true}
        deleteField="_id"
      />
    </div>
  );
}

export default Calculator;
