import React from 'react';
import Table from "../../../common/Table";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import './style.css';
import StudentVocabular from "../client";
import AdminVocabular from "../admin";

function Stat() {
  const history = useHistory();

  const pushToVocabular = () => {
    history.push('/vocabular');
  };

  return (
    <div className="admin-vocabulab-stat">
      {localStorage.role !== 'student' ?
        <>
          <div className="btn-container">
            <Button className="back-button" variant="contained" color="primary" onClick={pushToVocabular}>
              <KeyboardBackspaceIcon/>
            </Button>
          </div>
          <div className="full-stat">
            <Table
              title="Users words statistic"
              columns={[
                { title: 'Email', field: 'email' },
                { title: 'User', field: 'username' },
                { title: 'Learned words', field: 'learned' },
                { title: 'Not learned', field: 'notLearned' },
              ]}
              route="/vocabulab-stat"
              isEditable={false}
            />
          </div>
        </> : null
      }
    </div>
  )
}

export default Stat;
