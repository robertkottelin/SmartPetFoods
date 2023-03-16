import React, { useState } from 'react';
import Inputstuff from './Inputstuff';
import productsData from './products.json';

export default function App() {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pet, setPet] = useState({ type: '', weight: '', kcal: 0 });


  const sortedProducts = productsData.map(item => {
    const kcalPerKg = (item.kcal * 10); // kcal value is per 100g, so multiply by 10 to get kcal per kg
    const kgPerDay = pet.kcal / kcalPerKg; // Calculate the kg of food required per day
    const pricePerKg = item.price / item.weight; // Calculate the price per kg of the food
    const pricePerDay = kgPerDay * pricePerKg; // Calculate the price per day
    return { ...item, pricePerDay };
  }).sort((a, b) => {
    const isDesc = sortOrder === 'desc';
    const [first, second] = isDesc ? [b, a] : [a, b];
    switch (sortBy) {
      case 'name':
        return first.name.localeCompare(second.name);
      case 'price':
        return first.price - second.price;
      case 'weight':
        return first.weight - second.weight;
      case 'kcal':
        return first.kcal - second.kcal;
      case 'price/day':
        return first.pricePerDay - second.pricePerDay;
      default:
        return 0;
    }
  });

  const handleHeaderClick = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  return (
    <>
      <Inputstuff pet={pet} setPet={setPet} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick('name')}>Name</th>
            <th onClick={() => handleHeaderClick('price')}>Price</th>
            {/* <th onClick={() => handleHeaderClick('weight')}>Weight</th>
            <th onClick={() => handleHeaderClick('kcal')}>kcal</th> */}
            <th onClick={() => handleHeaderClick('price/day')}>Price/day</th> {/* Add this header */}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              {/* <td>{item.weight}</td>
              <td>{item.kcal}</td> */}
              <td>{item.pricePerDay.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
