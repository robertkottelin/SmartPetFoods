// ProductTable.js
import React from 'react';

export default function ProductTable({ sortedProducts, handleHeaderClick }) {
  return (
    <table>
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick('name')}>Name</th>
            <th onClick={() => handleHeaderClick('price')}>Price</th>
            <th onClick={() => handleHeaderClick('pricePerKg')}>Weight</th>
            <th onClick={() => handleHeaderClick('kcal')}>kcal</th>
            <th onClick={() => handleHeaderClick('price/day')}>Price/day</th> {/* Add this header */}
          </tr>
        </thead>
      <tbody>
        {sortedProducts.map((item, index) => (
        <tr key={index}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.pricePerKg}</td>
            <td>{item.kcal}</td>
            <td>{item.pricePerDay.toFixed(2)}</td>
        </tr>
        ))}
      </tbody>
    </table>
  );
}
