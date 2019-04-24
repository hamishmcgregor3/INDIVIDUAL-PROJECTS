import React, { Component } from 'react';
import im2 from './im2.png';
import im3 from './im3.png';
import im4 from './im4.png';

function Header() {
    return (
        <div>
            <h1 > Hey Everyone! </h1>
            We are the developers of this site, Hamish and Lucia. Thank you so much for coming to check out our site!
            We've worked so hard on it and we hope you love it!
            <br></br>
            <br></br>
            <img src={im2} alt="im2" />
            <br></br>
            <br></br>
            We're sophomores at Washington University in St. Louis studying Computer Science! Can you tell? Haha!
            Hamish is from Sydney and Lucia is from Texas! 
            <br></br>
            <br></br>
            <img src={im3} alt="im3" />
            <br></br>
            <br></br>
            This is an ecommerce website that allows you to message sellers and buy items! Some cool features include:
            Our buttons change color when a listing has been bought!
            There is a dynamic, interactive message board that allows you to communicate with sellers and buyers! 
            Who knows, you might also just get lucky ;) !
            <br></br>
            <br></br>
            <img src={im4} alt="im4" />
            <h1 > Happy Shopping! </h1>
        </div>
    );
}

export default Header; 