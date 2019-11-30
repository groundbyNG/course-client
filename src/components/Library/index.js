import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import {api} from '../../constants';
import './style.css';
import PauseCircleOutlineTwoToneIcon from '@material-ui/icons/PauseCircleOutlineTwoTone';
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

function Library() {
  const [intervalID, setId] = useState();
  const [materials, setMaterials] = useState([
    {
      title: 'Бунин И. А. Три сборника произведений',
      link: 'http://bunin.niv.ru/',
      checked: true,
    },
    {
      title: 'Достоевский Ф. М. Произведения',
      link: 'http://dostoevskiy.niv.ru/',
      checked: false,
    },
    {
      title: 'Пастернак Б. Произведения (Доктор Живаго и др.; Сборник стихотворений и поэм).',
      link: 'http://pasternak.niv.ru/',
      checked: false,
    },
    {
      title: 'Пастернак Б. Произведения (Доктор Живаго и др.; Сборник стихотворений и поэм).',
      link: 'http://pasternak.niv.ru/',
      checked: true,
    },
    {
      title: 'Тургенев И. С. Сайт посвящен жизни и творчеству писателя. Биография, музеи, галерея. Библиотека: статьи о творчестве и жизни; произведения писателя.',
      link: 'http://www.turgenev.org.ru/',
      checked: false,
    },
    {
      title: 'Есенин С. А. Биография, семья, фотографии, окружение. Произведения автора. Стихотворения, отсортированные по названию; по началу, по годам. Статьи о Есенине.',
      link: 'http://esenin.niv.ru/',
      checked: true,
    },
    {
      title: 'Толстой Л. Н. История семьи (предки, жена, потомки). Жизнь и творчество. Взгляды на вопросы политики, религии, семьи. Роль и значение Толстого в российской и мировой культуре.',
      link: 'http://tolstoy.ru/',
      checked: false,
    },
    {
      title: 'Полное собрание сочинений, биографические материалы, художественное творчество Пушкина и имеющее отношение к Пушкину',
      link: 'http://www.magister.msk.ru/library/pushkin/pushkin.htm',
      checked: false,
    },
  ]);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setPause] = useState(false);
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });
  const handleChange = (index) => {
    materials[index].checked = !materials[index].checked;
    setMaterials(materials);
  };

  const changePause = () => {
    if (!isPaused) {
      clearInterval(intervalID);
    } else {
      setSeconds(seconds - 1);
    }
    setPause(!isPaused);
  }

  useEffect(() => {
    setId(setInterval(
      () => {
        setSeconds(seconds + 1);
        setTimer({
          minutes: ((seconds + 1) / 60).toFixed(),
          seconds: ((seconds + 1) % 60).toFixed(),
        });
      },
      1000
    ));
    return clearInterval(intervalID);
  }, [seconds]);

  return (
    <div className="library">
      <div className="timer">
        <span className="timer-label">Timer</span>
        <span className="timer-value">
           {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
          :
          {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
        </span>
        {!isPaused ?
          <PauseCircleOutlineTwoToneIcon className="timer-icon" onClick={changePause} />
          :
          <PlayCircleOutlineTwoToneIcon className="timer-icon" onClick={changePause} />
        }
      </div>
      <div className="list">
        {
          materials
            .map((material, index) => {
              return (
                <div className="library-row" key={index}>
                  {material.checked ?
                    <CheckCircleTwoToneIcon className="check-icon"/>
                    : <CheckCircleOutlineTwoToneIcon onClick={() => handleChange(index)} className="check-icon"/>
                  }
                  <div className="right-block">
                    <div>
                      <div className="text-bold">{material.title}</div>
                    </div>
                    <a href={material.link}>
                      <Button className="btn-tooltip" variant="outlined">
                        <LinkOutlinedIcon className="pair-tooltip"/>
                      </Button>
                    </a>
                  </div>
                </div>
              )
            })
        }
      </div>
    </div>
  );
}

export default Library;