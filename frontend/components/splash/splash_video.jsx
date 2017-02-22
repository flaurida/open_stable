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
      <YouTube
        videoId="3XVHyhLB8Hg"
        opts={ opts } />
    );
  }
}

export default SplashVideo;
