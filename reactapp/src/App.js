// App.js
import React, { useState } from 'react';
import Inputstuff from './Inputstuff';
import productsData from './products.json';
import { useSortedProducts } from './useSortedProducts';
import ProductTable from './ProductTable';

export default function App() {
  const [pet, setPet] = useState({ type: '', weight: '', kcal: 0 });
  const { sortedProducts, handleHeaderClick } = useSortedProducts(productsData, pet);

  return (
    <>
      <Inputstuff pet={pet} setPet={setPet} />
      <ProductTable sortedProducts={sortedProducts} handleHeaderClick={handleHeaderClick} />
    </>
  );
}
