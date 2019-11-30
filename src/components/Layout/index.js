import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FunctionsIcon from '@material-ui/icons/Functions';
import TranslateIcon from '@material-ui/icons/Translate';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {
  Link,
  useHistory
} from "react-router-dom";
import './style.css';

const Layout = ({children}) => {
  const [sidebarState, setState] = useState(false);
  const history = useHistory();
  const sections = [
    {
      name: 'Calculator',
      icon: (<FunctionsIcon/>),
      link: '/calculator',
    },
    {
      name: 'Vocabular',
      icon: (<TranslateIcon/>),
      link: '/vocabular',
    },
    {
      name: 'Library',
      icon: (<MenuBookIcon/>),
      link: '/library',
    }
  ]
  const onLogout = () => {
    localStorage.clear();
    history.replace('/login');
  }

  const toggleDrawer = (state) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(state);
  };

  return (
    <>
      <AppBar className="header" position="static">
        <Toolbar className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <Typography className="ml-1" variant="h6">
              <Link className="d-flex justify-content-center align-items-center" to="/">
                Learning managment system
                <LocalLibraryOutlinedIcon className="header-icon" />
              </Link>
            </Typography>
          </div>
          <Button onClick={onLogout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <div className="content">
        {children}
      </div>
      <Drawer className="sidebar" open={sidebarState} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
        >
          <List>
            {sections.map((section, index) => (
              <div key={index}>
                {index !== 0 && <Divider/>}
                <ListItem onClick={toggleDrawer(false)} button key={section.name}>
                  <Link className="sidebar-link" to={section.link}>
                    <ListItemIcon>
                      {section.icon}
                    </ListItemIcon>
                    <ListItemText primary={section.name}/>
                  </Link>
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default Layout;
