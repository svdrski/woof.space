import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeSlider = ({rangeValues, setRangeValues}) => {
  

  const handleRangeChange = (values) => {
    setRangeValues(values);
  };

  return (
    <div>
      <label className='agelabel'>Between <span>{rangeValues[0]}</span> and <span>{rangeValues[1]}</span></label>
      <Slider min={0} max={20} range value={rangeValues} onChange={handleRangeChange}/>
    </div>
  );
};

export default RangeSlider;
