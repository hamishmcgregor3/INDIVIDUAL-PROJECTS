import React, { Component } from 'react';
import im1 from './im1.png';
import im2 from './im2.png';
import im3 from './im3.png';
import im4 from './im4.png';

function Header() {
    return (
        <div>
            <img src={im1} alt="im1" />
            <img src={im2} alt="im2" />
            <img src={im3} alt="im3" />
            <img src={im4} alt="im4" />
        </div>
    );
}

export default Header; 