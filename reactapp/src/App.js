import React, { useState } from 'react';
import Inputstuff from './Inputstuff';
import productsData from './products.json';

export default function App() {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedProducts = productsData.sort((a, b) => {
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
      case 'price/kcal':
        return (first.price / first.kcal) - (second.price / second.kcal);
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
      <Inputstuff />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick('name')}>Name</th>
            <th onClick={() => handleHeaderClick('price')}>Price</th>
            <th onClick={() => handleHeaderClick('weight')}>Weight</th>
            <th onClick={() => handleHeaderClick('kcal')}>kcal</th>
            <th onClick={() => handleHeaderClick('price/kcal')}>Price/kcal</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.weight}</td>
              <td>{item.kcal}</td>
              <td>{(item.price / (item.weight * 100 * item.kcal / 100)).toFixed(2)}</td>
              <td>{(item.weight * 100 * item.kcal / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
