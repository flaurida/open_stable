import React from 'react';
import YouTube from 'react-youtube';

class SplashVideo extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
        loop: 1,
        controls: 0,
        disablekb: 1,
        showinfo: 0,
        modestbranding: 1,
        start: '345',
        end: '390'
      }
    };

    return (
      <video className="splash-video" src="https://s3.amazonaws.com/openstable-pro/seed/dothraki-video.mp4"
        muted autoPlay loop />
    );
  }
}

export default SplashVideo;
