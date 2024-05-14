//give basic code for component called loader

import React from 'react';
import "./Loader.css";

const Loader = () => {
  return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
     </div>
  );
}

export default Loader;