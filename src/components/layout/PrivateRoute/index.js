import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const history = useHistory();

    useEffect(() => {
        !localStorage.token && history.replace('/login');
    }, []);

    return localStorage.token ? children : null;
};

export default PrivateRoute;