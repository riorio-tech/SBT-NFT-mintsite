import React from "react";

export const useAudio = url => {

    const [audio] = React.useState(new Audio(url));
    const [, _forceUpdate] = React.useState(false);
    const forceUpdate = () => _forceUpdate(prevState => !prevState);
  
    React.useEffect(() => {
      audio.play();
      audio.addEventListener("play", forceUpdate);
      audio.addEventListener("pause", forceUpdate);
      // audio.addEventListener("ended", forceUpdate);
      audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
      audio.addEventListener("timeupdate", forceUpdate);
  
      return () => {
        audio.removeEventListener("play", forceUpdate);
        audio.removeEventListener("pause", forceUpdate);
        audio.removeEventListener("ended", forceUpdate);
        audio.removeEventListener("timeupdate", forceUpdate);
      };
    }, []);
  
    const play = () => audio.play();
    const pause = () => audio.pause();
    const jump = value => (audio.currentTime += value);
  
    return [!audio.paused, audio.currentTime, play, pause, jump];
  };