import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import {api} from '../../../constants';
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

const Vocabular = () => {
  const [anchor, setAnchor] = useState({
    element: null,
    description: '',
  });
  const [tabValue, setTab] = useState(0);
  const [words, setWords] = useState([
    {
      english: 'Butterfly',
      russian: 'Бабочка',
      description: 'Butterflies are insects in the macrolepidopteran clade Rhopalocera from the order Lepidoptera, which also includes moths. Adult butterflies have large, often brightly coloured wings, and conspicuous, fluttering flight.',
      checked: false,
      anchorEl: null,
      category: 0,
    },
    {
      english: 'Spoon',
      russian: 'Ложка',
      description: 'A spoon is a utensil consisting of a small shallow bowl (also known as a head), oval or round, at the end of a handle.',
      checked: false,
      anchorEl: null,
      category: 0,
    },
    {
      english: 'Water',
      russian: 'Вода',
      description: 'Water is a transparent, tasteless, odorless, and nearly colorless chemical substance, which is the main constituent of Earth\'s hydrosphere, and the fluids of most living organisms.',
      checked: false,
      anchorEl: null,
      category: 1,
    },
    {
      english: 'Guest',
      russian: 'Гость',
      description: 'A person who is given hospitality',
      checked: false,
      anchorEl: null,
      category: 2,
    },
    {
      english: 'Rain',
      russian: 'Дождь',
      description: 'Rain is liquid water in the form of droplets that have condensed from atmospheric water vapor and then become heavy enough to fall under gravity.',
      checked: false,
      anchorEl: null,
      category: 2,
    },
    {
      english: 'Pair',
      russian: 'Пара',
      description: 'Matching of members unable to attend, so as not to change the voting margin',
      checked: false,
      anchorEl: null,
      category: 1,
    },
    {
      english: 'Water',
      russian: 'Вода',
      description: 'Water is a transparent, tasteless, odorless, and nearly colorless chemical substance, which is the main constituent of Earth\'s hydrosphere, and the fluids of most living organisms.',
      checked: false,
      anchorEl: null,
      category: 2,
    },
    {
      english: 'Spoon',
      russian: 'Ложка',
      description: 'A spoon is a utensil consisting of a small shallow bowl (also known as a head), oval or round, at the end of a handle.',
      checked: false,
      anchorEl: null,
      category: 2,
    },
    {
      english: 'Butterfly',
      russian: 'Бабочка',
      description: 'Butterflies are insects in the macrolepidopteran clade Rhopalocera from the order Lepidoptera, which also includes moths. Adult butterflies have large, often brightly coloured wings, and conspicuous, fluttering flight.',
      checked: false,
      anchorEl: null,
      category: 1,
    },
    {
      english: 'Salt',
      russian: 'Соль',
      description: 'Salt is a mineral consisting primarily of sodium chloride (NaCl), a chemical compound belonging to the larger class of salts; salt in its natural form as a crystalline mineral is known as rock salt or halite.',
      checked: false,
      anchorEl: null,
      category: 0,
    },
    {
      english: 'Math',
      russian: 'Математика',
      description: 'Mathematics (from Greek μάθημα máthēma, "knowledge, study, learning") includes the study of such topics as quantity (number theory),[1] structure (algebra), space (geometry), and change (mathematical analysis).',
      checked: false,
      anchorEl: null,
      category: 0,
    },
    {
      english: 'Spoon',
      russian: 'Ложка',
      description: 'A spoon is a utensil consisting of a small shallow bowl (also known as a head), oval or round, at the end of a handle.',
      checked: false,
      anchorEl: null,
      category: 1,
    },
    {
      english: 'Butterfly',
      russian: 'Бабочка',
      description: 'Butterflies are insects in the macrolepidopteran clade Rhopalocera from the order Lepidoptera, which also includes moths. Adult butterflies have large, often brightly coloured wings, and conspicuous, fluttering flight.',
      checked: false,
      anchorEl: null,
      category: 2,
    },
    {
      english: 'Water',
      russian: 'Вода',
      description: 'Water is a transparent, tasteless, odorless, and nearly colorless chemical substance, which is the main constituent of Earth\'s hydrosphere, and the fluids of most living organisms.',
      checked: false,
      anchorEl: null,
      category: 0,
    },
  ]);

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

  const handleChange = (index) => (event) => {
    words[index].checked = event.target.checked;
    setWords(words);
  };

  const tabsChange = (event, value) => {
    setTab(value);
  }
  return (
    <div className="vocabular">
      <AppBar position="static" className="tabs">
        <Tabs centered value={tabValue} onChange={tabsChange} aria-label="simple tabs example">
          <Tab icon={<TurnedInNotOutlinedIcon />} label="NEW" />
          <Tab icon={<BookmarksOutlinedIcon />} label="FAMILIAR" />
          <Tab icon={<BookmarkOutlinedIcon />} label="LEARNED" />
        </Tabs>
      </AppBar>
      <div className="list">
        {
          words
            .filter((word) => word.category === tabValue)
            .map((word, index) => {
            return (
              <div className="list-row" key={index}>
                <Checkbox
                  onChange={handleChange(index)}
                  value={word.checked}
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
          })
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
