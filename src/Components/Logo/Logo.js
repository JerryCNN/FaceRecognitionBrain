import React from 'react';
import Tilt from 'react-tilt';
import brain from './Brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0 topleft'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 120, width: 120 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;