import React from 'react';
import './Home.css';

import homeLogo from '../../../assets/home-main.svg';
import bgvideo from '../../../assets/bg-video2.mp4';

class Home extends React.Component {
  state = {};

  render() {
    return (
      <div className='home'>
        <video autoPlay muted loop id='myVideo'>
          <source src={bgvideo} type='video/mp4' />
        </video>

        <div className='content'>
          <div className='i-left'>
            <div className='i-name'>
              <span>Welcome!</span>
              <span>To Feedback and Ratings System</span>
              <span>
              provide feedback anonymously, fostering honest opinions without fear of repercussions :)
              </span>
            </div>
          </div>

          <div className='i-right'>
            <img
              src={homeLogo}
              alt='home pic'
              className='img-fluid'
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
