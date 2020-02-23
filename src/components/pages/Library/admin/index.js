import React from 'react';
import Button from "@material-ui/core/Button";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import {useHistory} from "react-router-dom";

import Table from '../../../common/Table';
import './style.css';

function Library() {
  const history = useHistory();

  const pushToStat = () => {
    history.push('/library-stat');
  };
  return (
    <div className="admin-library">
      <div className="stat-container">
        <Button variant="contained" color="primary" onClick={pushToStat}>
          <EqualizerIcon/>
        </Button>
      </div>
      <Table
        title="Library resources"
        columns={[
          {
            title: 'Title',
            field: 'title',
          },
          { title: 'Link', field: 'link' },
        ]}
        route="/library"
        isEditable={true}
        deleteField="title"
      />
    </div>
  );
}

export default Library;
