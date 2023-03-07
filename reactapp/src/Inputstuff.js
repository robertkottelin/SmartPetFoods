import React, { useState } from 'react';

export default function Inputstuff() {
  const [pet, setPet] = useState({ type: '', weight: '', kcal: 0 });

  function handleTypeChange(event) {
    setPet({ ...pet, type: event.target.value });
    updateKcal(pet.weight, event.target.value);
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
    const newKcal = weight ? 130 * Math.pow(parseFloat(weight), 0.75) : 0;
    setPet({ ...pet, kcal: newKcal, type: type });
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value="dog"
          checked={pet.type === 'dog'}
          onChange={handleTypeChange}
        />
        Dog
      </label>
      <br />
      <label>
        <input
          type="checkbox"
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
    </div>
  );
}
