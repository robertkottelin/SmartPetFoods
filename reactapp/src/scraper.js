const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');



async function fetchPage(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching URL: ${url}`);
    return null;
  }
}

async function scrapeProductsList(url) {
    const productList = [];
    const html = await fetchPage(url);
  
    if (!html) {
      console.log(`Failed to fetch the page: ${url}`);
      return productList;
    }
  
    const $ = cheerio.load(html);
    const productPromises = [];
    $('.prodbox_sizes').each((_, element) => {
      $(element).find('a').each(async (_, anchor) => {
        const href = $(anchor).attr('href');
        if (href) {
          const url = `https://www.arkenzoo.se/${href}`;
          const promise = parseProductDetails(url);
          productPromises.push(promise);
        }
      });
    });
  
    const products = await Promise.all(productPromises);
  
    products.forEach((product) => {
      if (product) {
        productList.push(product);
      }
    });
  
    return productList;
  }
  
  
  async function parseProductDetails(url) {
    try {
      const html = await fetchPage(url);
  
      if (!html) {
        console.log(`Failed to fetch the product details page: ${url}`);
        return null;
      }
  
      const $ = cheerio.load(html);
      const name = $('div.col-12.lg-col-6.md-col-6.md-none h1[itemprop="name"]').text();
  
      const priceText = $('div.mb-2 .product_price .price_font.price.bold.currency_sek.hide span').text();
      if (!priceText) {
        priceText = $('div.mb-2 .product_price .price_font.sale.bold.currency_sek.hide').text();
      }
      const priceRegex = /(\d+(?:[.,]\d{1,2})?)/;
      const priceMatch = priceText.match(priceRegex);
      const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : null;

      const pricePerKgText = $('.product_price .unit_price .nowrap').text();
      if (!pricePerKgText) {
        pricePerKgText = $('div.mb-2 .product_price .sale_normal currency_sek hide').text();
      }
      const pricePerKgRegex = /(\d+(?:[.,]\d{1,2})?)\s*kr/;
      const pricePerKgMatch = pricePerKgText.match(pricePerKgRegex);
      const pricePerKg = pricePerKgMatch ? parseFloat(pricePerKgMatch[1].replace(',', '.')) : null;
  
      const weightText = $('div.mb-4 .clear_after label').text();
      if (!weightText) {
        weightText = $('input.varradio.sale').next('label').text();
      }
      const weightRegex = /(\d+(?:[.,]\d{1,2})?)\s*kg/;
      const weightMatch = weightText.match(weightRegex);
      const weight = weightMatch ? parseFloat(weightMatch[1].replace(',', '.')) : null;
  
      const kcalText = $('.border-bottom.mb3.container.dropdown-container .dropdown-content p').text();
      const kcalRegex = /(\d+)\s*kcal\/100g/;
      const kcalMatch = kcalText.match(kcalRegex);
      const kcal = kcalMatch ? parseFloat(kcalMatch[1]) : null;
  
      return { name, price, weight, kcal, url, pricePerKg };
    } catch (error) {
      console.log(`Error while parsing product details: ${url} - ${error.message}`);
      return null;
    }
  }
  
  

async function main() {
    const BASE_URL = 'https://www.arkenzoo.se'; 
    const mainUrl = 'https://www.arkenzoo.se/hund-hundmat-torrfoder'; // Replace with the main URL where the products are listed
    const productUrls = await scrapeProductsList(mainUrl);
    console.log(productUrls)

    const productsData = [];
    for (const url of productUrls) {
        const product = await parseProductDetails(url);
        if (product) {
        productsData.push(product);
        }
    }

    fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2));
}

main();