import React from 'react';

const Reduction = ({ unit, label = `${unit} Reduction`, low, high }) => {
  if (!high) {
    return false;
  }

  return (
    <div>
      <label>{label}</label>
      <p>
        {low.toLocaleString('en-US')}
        {unit} - {high.toLocaleString('en-US')}
        {unit}
      </p>
    </div>
  );
};

export default Reduction;
