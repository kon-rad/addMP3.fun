import React from 'react';

export default () => {
  return (
    <div className="spinnerOuter">
      <div className="spinnerWrapper">
        <div className="loader" />
      </div>
      <div>
        <span>Converting file ...</span>
      </div>
    </div>
  );
}