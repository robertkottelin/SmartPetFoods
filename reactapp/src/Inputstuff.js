import React, { useState } from 'react';

function Inputstuff({ pet, setPet }) {
  
  function handleTypeChange(event) {
    const newType = event.target.value;
    setPet({ ...pet, type: newType });
    updateKcal(pet.weight, newType);
  }

  function handleWeightChange(event) {
    const newWeight = event.target.value;
    setPet({ ...pet, weight: newWeight });
  }

  function handleWeightKeyPress(event) {
    if (event.key === 'Enter') {
      updateKcal(pet.weight, pet.type);
    }
  }

  function updateKcal(weight, type) {
    let newKcal = 0;
    if (weight) {
      if (type === 'dog') {
        newKcal = 130 * Math.pow(parseFloat(weight), 0.75);
      } else if (type === 'cat') {
        newKcal = 100 * Math.pow(parseFloat(weight), 0.67);
      }
    }
    setPet({ ...pet, kcal: newKcal, type: type });
  }


  return (
    <div>
      <label>
        <input
          type="radio"
          value="dog"
          checked={pet.type === 'dog'}
          onChange={handleTypeChange}
        />
        Dog
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="cat"
          checked={pet.type === 'cat'}
          onChange={handleTypeChange}
        />
        Cat
      </label>
      <br />
      <label>
        Weight (kg):
        <input
          type="number"
          value={pet.weight}
          onChange={handleWeightChange}
          onKeyPress={handleWeightKeyPress}
        />
      </label>
      <br />
      <label>
        Kilocalories:
        <input
          type="number"
          value={pet.kcal}
          onChange={() => {}}
          readOnly
        />
      </label>
      <br />
  </div>
);
}

export default Inputstuff;