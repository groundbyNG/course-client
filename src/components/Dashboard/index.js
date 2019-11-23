import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FunctionsIcon from '@material-ui/icons/Functions';
import TranslateIcon from '@material-ui/icons/Translate';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import {api} from '../../constants';
import './style.css';

function Dashboard() {
    const [username, setUsername] = useState('username');
    const [status, setStatus] = useState('taxDefining');
    const [destination, setDestination] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.token}`},
                }
                const response = await fetch(`${api}/user/`, options);
                const {name} = await response.json();
                setUsername(name);

            } catch (err) {
                console.log(err);
            }
        })()
    })
    return (
        <div className="dashboard">
            <h1>
                Hi, {username}! Its time to study
            </h1>
            <div className="cards">
                <Card className="card card-math">
                    <CardActionArea className="action">
                        <h1 className="value">0</h1>
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
                <Card className="card card-vocabular">
                    <CardActionArea className="action">
                        <h1 className="value">0</h1>
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
                <Card className="card card-library">
                    <CardActionArea className="action">
                        <h1 className="value">0</h1>
                        <CardContent>
                            <Typography className="d-flex align-items-center justify-content-center" gutterBottom
                                        variant="h4" component="h2">
                                <MenuBookIcon className="icon"/>
                                Library
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              <b>Interesting tip</b>: A library is a curated collection of sources of information and similar resources,
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
