import React, {useEffect, useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import 'react-virtualized/styles.css';
import './style.css';
import {request} from "../../../../helpers/request";
import {api} from "../../../../constants";

const Vocabular = () => {
  const [anchor, setAnchor] = useState({
    element: null,
    description: '',
  });
  const [tabValue, setTab] = useState(1);
  const [words, setWords] = useState([]);

  useEffect(() => { getWords() }, []);

  const getWords = async () => {
    const result = await request('GET', true, null,`${api}/vocabulab`);
    setWords(result);
  };

  const openPopover = (description) => (event) => {
    setAnchor({
      element: event.target,
      description,
    });
  };

  const closePopover = () => {
    setAnchor({
      element: null,
      description: '',
    });
  };

  const handleChange = (english) => async (event) => {
    await request('PUT', true, {
      english, checked: event.target.checked},`${api}/vocabulab/check`);
    getWords();
  };

  const tabsChange = (event, value) => {
    setTab(value);
  };

  return (
    <div className="vocabular">
      <AppBar position="static" className="tabs">
        <Tabs centered value={tabValue} onChange={tabsChange} aria-label="simple tabs example">
          <Tab icon={<TurnedInNotOutlinedIcon />} value={1} label="NEW" />
          <Tab icon={<BookmarksOutlinedIcon />} value={2} label="FAMILIAR" />
          <Tab icon={<BookmarkOutlinedIcon />} value={3} label="LEARNED" />
        </Tabs>
      </AppBar>
      <div className="list">
        {words.length > 0 && words
            .filter((word) => word.category == tabValue)
            .map((word, index) => {
              return (
                <div className="list-row" key={index}>
                  <Checkbox
                    onChange={handleChange(word.english)}
                    checked={word.checked}
                  />
                  <div className="right-block">
                    <div>
                      <div className="text-bold">{word.english}</div>
                      <div>{word.russian}</div>
                    </div>
                    <Button className="btn-tooltip" variant="outlined">
                      <ChatOutlinedIcon className="pair-tooltip" onClick={openPopover(word.description)}/>
                    </Button>
                  </div>
                </div>
              )
            }
          )
        }
        <Popover
          open={Boolean(anchor.element)}
          onClose={closePopover}
          anchorEl={anchor.element}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
        >
          {anchor.description}
        </Popover>
      </div>
    </div>
  );
}

export default Vocabular;
