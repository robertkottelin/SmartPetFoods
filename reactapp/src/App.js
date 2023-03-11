import React from 'react'
import Inputstuff from './Inputstuff'
import productsData from './products.json';

export default function App() {
  return (
    <>
      <Inputstuff />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Weight</th>
            <th>kcal</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.weight}</td>
              <td>{item.kcal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
