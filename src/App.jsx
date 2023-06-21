import React from 'react';

import MiniPlayer from './components/mini-player';

const STREAM_PLAYBACK_URL =
  'https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.xJ2tVekwmMGd.m3u8';

const App = () => {
  return (
    <div className="App">
      <MiniPlayer
        streamUrl={STREAM_PLAYBACK_URL}
      />
    </div>
  );
};

export default App;
