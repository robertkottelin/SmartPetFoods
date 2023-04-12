// ProductTable.js
import React from 'react';

export default function ProductTable({ sortedProducts, handleHeaderClick }) {
  return (
    <table>
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick('name')}>Name</th>
            <th onClick={() => handleHeaderClick('weight')}>Weight</th>
            <th onClick={() => handleHeaderClick('pricePerKg')}>Price/kg</th>
            <th onClick={() => handleHeaderClick('kcal')}>kcal</th>
            <th onClick={() => handleHeaderClick('costPerDay')}>Price/day</th>
          </tr>
        </thead>
      <tbody>
        {sortedProducts.map((item, index) => {
          if (item.costPerDay !== null && !isNaN(item.costPerDay) && item.costPerDay !== Infinity) {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.weight}</td>
                <td>{item.pricePerKg}</td>
                <td>{item.kcal}</td>
                <td>{item.costPerDay}</td>
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
}
