import React from 'react';
import Table from "../../../common/Table";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';
import './style.css';

function Stat() {
  const history = useHistory();

  const pushToLibrary = () => {
    history.push('/library');
  };

  return (
    <div className="admin-vocabulab-stat">
      {localStorage.role !== 'student' ?
        <>
          <div className="btn-container">
            <Button className="back-button" variant="contained" color="primary" onClick={pushToLibrary}>
              <KeyboardBackspaceIcon/>
            </Button>
          </div>
          <div className="full-stat">
            <Table
              title="Users library statistic"
              columns={[
                { title: 'User', field: 'email' },
                { title: 'Visited resources', field: 'visited' },
                { title: 'Not visited', field: 'notVisited' },
                { title: 'Spent time', field: 'time', render: rowData =>
                    <span>
                      {`0${moment.duration(rowData.time).hours()}`.substr(-2)}:
                      {`0${moment.duration(rowData.time).minutes()}`.substr(-2)}:
                      {`0${moment.duration(rowData.time).seconds()}`.substr(-2)}
                      {/*{moment(rowData.time).format('HH:mm:ss')}*/}
                    </span> },
              ]}
              route="/library-stat"
              isEditable={false}
            />
          </div>
        </> : null
      }
    </div>
  )
}

export default Stat;
