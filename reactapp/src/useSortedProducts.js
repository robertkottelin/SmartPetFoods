// useSortedProducts.js
import { useState, useMemo } from 'react';

export function useSortedProducts(productsData, pet) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  console.log(productsData)

  const sortedProducts = useMemo(() => {
    return productsData.map(item => {

      let kcal = item.kcal; // kcal value is per 100g
      let name = item.name; // name of the product
      let pricePerKg = item.pricePerKg; // price per kg
      let url = item.url; // url to the product

      let petcalories = pet.kcal; // required kcal value per day for the pet
          
      let kcalPerKg = (kcal * 10); // kcal value is per 100g, so multiply by 10 to get kcal per kg

      // calculate the cost per day from the price per kg and the kcal value
      let costPerDay = ((petcalories / kcalPerKg) * pricePerKg);

      return { ...item, costPerDay };
  
    }).sort((a, b) => {
      
    const isDesc = sortOrder === 'desc';
    const [first, second] = isDesc ? [b, a] : [a, b];
    switch (sortBy) {
      case 'costPerDay':
        return first.costPerDay - second.costPerDay;
      default:
        return 0;
    }
  
    });
  }, [sortBy, sortOrder, pet]);

  const handleHeaderClick = (columnName) => {
    
    if (sortBy === columnName) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(columnName);
        setSortOrder('asc');
      }
    
  };

  return { sortedProducts, handleHeaderClick };
}
