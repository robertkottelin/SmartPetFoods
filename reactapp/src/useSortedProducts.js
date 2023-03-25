// useSortedProducts.js
import { useState, useMemo } from 'react';

export function useSortedProducts(productsData, pet) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedProducts = useMemo(() => {
    return productsData.map(item => {
      
    const kcalPerKg = (item.kcal * 10); // kcal value is per 100g, so multiply by 10 to get kcal per kg
    const kgPerDay = pet.kcal / kcalPerKg; // Calculate the kg of food required per day
    const pricePerKg = item.pricePerKg; // Calculate the price per kg of the food
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
