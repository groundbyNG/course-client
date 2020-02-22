import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import {useHistory} from "react-router-dom";

import Table from '../../../common/Table';
import './style.css';

function Vocabular() {
  const history = useHistory();

  const pushToStat = () => {
    history.push('/vocabular-stat');
  };
  return (
    <div className="admin-vocabulab">
      <div className="stat-container">
        <Button variant="contained" color="primary" onClick={pushToStat}>
          <EqualizerIcon/>
        </Button>
      </div>
      <Table
        title="Vocabulab words"
        columns={[
          { title: 'English', field: 'english' },
          { title: 'Russian', field: 'russian' },
          { title: 'Description', field: 'description' },
          { title: 'Category',
            field: 'category',
            editComponent: props => (
              <Select
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              >
                <MenuItem value={1}>New</MenuItem>
                <MenuItem value={2}>Familiar</MenuItem>
                <MenuItem value={3}>Learned</MenuItem>
              </Select>
            ) },
        ]}
        route="/vocabulab"
        isEditable={true}
        deleteField="english"
      />
    </div>
  );
}

export default Vocabular;
