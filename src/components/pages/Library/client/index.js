import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {api} from '../../../../constants';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Document, Page, pdfjs} from 'react-pdf';
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import {request} from "../../../../helpers/request";
import './style.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Library() {
  let socket;
  const [intervalID, setId] = useState();
  const [resources, setResources] = useState([]);
  const [seconds, setSeconds] = useState(-1);
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPage] = useState(1);
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    getResources();
    startTimer();
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (seconds >= 0) {
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
    }
  }, [seconds]);

  const getResources = async () => {
    const result = await request('GET', true, null, `${api}/library`);
    setResources(result);
  };

  const startTimer = () => {
    socket = new WebSocket("ws://localhost:8888");
    socket.onopen = () => {
      socket.send(localStorage.token);
    };
    socket.onmessage = (event) => {
      const {time} = JSON.parse(event.data);
      const sec = time / 1000;
      setTimer({
        minutes: ((sec) / 60).toFixed(),
        seconds: ((sec) % 60).toFixed(),
      });
      setSeconds(sec);
    };
  };

  const handleChange = async (title, checked) => {
    await request('PUT', true, {title, checked}, `${api}/library/check`);
    getResources();
  };

  const handleOpen = (link) => {
    setLink(link);
    setOpen(true);
  };

  const handleClose = () => {
    setLink(false);
    setPage(1);
    setOpen(false);
  };

  const onDocumentLoadSuccess = ({numPages}) => {
    setNumPages(numPages);
  };

  const changePage = offset => setPage(pageNumber + offset);

  const previousPage = () => pageNumber > 1 && changePage(-1);

  const nextPage = () => pageNumber < numPages && changePage(1);


  return (
    <div className="library">
      <div className="timer">
        <span className="timer-label">Timer</span>
        <span className="timer-value">
           {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
          :
          {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
        </span>
        <PlayCircleOutlineTwoToneIcon className="timer-icon"/>
      </div>
      <div className="list">
        {resources && resources
          .map((resource, index) => {
            return (
              <div className="library-row" key={index}>
                {resource.checked ?
                  <CheckCircleTwoToneIcon onClick={() => handleChange(resource.title, !resource.checked)}
                                          className="check-icon"/>
                  : <CheckCircleOutlineTwoToneIcon onClick={() => handleChange(resource.title, !resource.checked)}
                                                   className="check-icon"/>
                }
                <div className="right-block">
                  <div>
                    <div className="text-bold">{resource.title}</div>
                  </div>
                  <Button onClick={() => handleOpen(resource.link)} className="btn-tooltip" variant="outlined">
                    <LinkOutlinedIcon className="pair-tooltip"/>
                  </Button>
                </div>
              </div>
            )
          })
        }
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal-pdf">
            <Document
              file={link}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page height={window.innerHeight - 100} pageNumber={pageNumber}/>
            </Document>
            <p className="pdf-pagination pdf-pagination__counter">
              Page <b>{pageNumber || (numPages ? 1 : '--')}</b> of {numPages || '--'}
            </p>
            <NavigateBeforeIcon
              className="pdf-pagination pdf-pagination_prev"
              type="button"
              onClick={previousPage}
            />
            <NavigateNextIcon
              className="pdf-pagination pdf-pagination_next"
              type="button"
              onClick={nextPage}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Library;