import React, { useState } from 'react';

export default function Inputstuff() {
  const [pet, setPet] = useState({ type: '', weight: '', kcal: 0 });
  const [food, setFood] = useState({ weight: '', kcal: '', price: '', pricePerDay: 0 });

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

  function handleFoodWeightChange(event) {
    const newFoodWeight = event.target.value;
    setPet({ ...food, weight: newFoodWeight });
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
      <label>
        Food Package Weight (kg):
        <input
          type="number"
          value={food.weight}
          onChange={handleWeightChange}
        />
      </label>
  </div>
);
}