import React from 'react';

import MiniPlayer from './components/mini-player';
import Broadcast from './components/Broadcast';

const STREAM_PLAYBACK_URL =
  'https://d3608ec8df2e.us-east-1.playback.live-video.net/api/video/v1/us-east-1.284665384246.channel.eHnBE0OzCydy.m3u8';

const App = () => {
  return (
    <div className="App">
      <Broadcast />
      <MiniPlayer
        streamUrl={STREAM_PLAYBACK_URL}
      />
    </div>
  );
};

export default App;
