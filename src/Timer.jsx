import {useEffect, useState} from 'react';

function Timer() {
  const [countDown, setCountDown] = useState(500);
  const days = Math.floor(countDown / 86400);
  const hours = Math.floor((countDown % 86400) / 3600);
  const mins = Math.floor((countDown % 3600) / 60);
  const sec = countDown % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        setCountDown(prev => prev - 1);
      }, 1000);

      return () => clearInterval(id);
    },
    [countDown, setCountDown]
  );

  return (
    <div className="time d-flex">
      <span className=" me-3 color-start timer days">
        {days < 10 && '00'} <p className="time">Days</p>
      </span>{' '}
      <span className=" me-3 color-end timer hours">
        {' '}
        {hours < 10 ? `0${hours} ` : hours} <p className="time">Hours </p>
      </span>{' '}
      <span className=" me-3 color-end timer mins">
        {mins < 10 ? `0${mins} ` : mins} <p className="time">Minutes </p>
      </span>{' '}
      <span className=" me-3 color-start timer sec">
        {sec < 10 && '0'}
        {sec} <p className="time">Seconds</p>
      </span>{' '}
    </div>
  );
}

export default Timer;
