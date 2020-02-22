import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FunctionsIcon from '@material-ui/icons/Functions';
import TranslateIcon from '@material-ui/icons/Translate';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import {api} from '../../../constants';
import './style.css';
import {request} from "../../../helpers/request";

function Dashboard() {
  const [username, setUsername] = useState('');
  const [math, setMath] = useState('-');
  const [vocabulab, setVocabulab] = useState('-');
  const [library, setLibrary] = useState('-');

  const history = useHistory();

  const onClickCard = (path) => {
    history.push(path);
  };

  useEffect(() => {
    if (localStorage.role === 'student') {
      getUsername();
      getMath();
    }
  }, []);

  const getUsername = async () => {
    const { username } = await request('GET', true, null,`${api}/dashboard/username`);
    setUsername(username);
  };

  const getMath = async () => {
    const { stat } = await request('GET', true, null,`${api}/math-stat`);
    setMath(stat);
  };

  return (
    <div className="dashboard">
      {username && <h1>
        {`Hi, ${username}! Its time to study`}
      </h1>}
      <div className="cards">
        <Card onClick={() => onClickCard('/calculator')} className="card card-math">
          <CardActionArea className="action">
            <h1 className="value">{math}</h1>
            <CardContent>
              <Typography className="d-flex align-items-center justify-content-center" gutterBottom
                          variant="h4" component="h2">
                <FunctionsIcon className="icon"/>
                Math
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Interesting tip</b>: An electronic calculator is typically a portable electronic
                device used
                to perform calculations, ranging from basic arithmetic to complex mathematics.
                The first solid-state electronic calculator was created in the early 1960s.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card onClick={() => onClickCard('/vocabular')} className="card card-vocabular">
          <CardActionArea className="action">
            <h1 className="value">{vocabulab}</h1>
            <CardContent>
              <Typography className="d-flex align-items-center justify-content-center" gutterBottom
                          variant="h4" component="h2">
                <TranslateIcon className="icon"/>
                Vocabular
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Interesting tip</b>: A vocabulary is a set of familiar words within a person's
                language. A vocabulary,
                usually developed with age, serves as a useful and fundamental tool for communication
                and acquiring knowledge.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card onClick={() => onClickCard('/library')} className="card card-library">
          <CardActionArea className="action">
            <h1 className="value">{library}</h1>
            <CardContent>
              <Typography className="d-flex align-items-center justify-content-center" gutterBottom
                          variant="h4" component="h2">
                <MenuBookIcon className="icon"/>
                Library
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Interesting tip</b>: A library is a curated collection of sources of information and similar
                resources,
                selected by experts, his appointments and made accessible to a defined community for reference or
                borrowing.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
