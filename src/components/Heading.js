import React from 'react';
import logo from './assets/snail_logo.png'

const Heading = () => {

  return(
    <>
      <img src={logo} alt="snail_logo" />
      <h4 className="heading_tagline">view contents of bulk .eml files without opening them</h4>
    </>
  )

}

export default Heading;