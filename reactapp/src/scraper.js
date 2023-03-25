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
  
      const kcalText = $('div.dropdown-content p').text();
      const kcalRegex = /(\d+)\s*kcal\/100g/;
      let kcalMatch = kcalText.match(kcalRegex);
      let kcal = kcalMatch ? parseFloat(kcalMatch[1]) : null;
      if (!kcalMatch) {
        const kcalPerKgRegex = /(\d+)\s*kcal\/kg/;
        kcalMatch2 = kcalText.match(kcalPerKgRegex);
        kcal = kcalMatch2 ? parseFloat(kcalMatch2[1]) / 10 : null;
      }
      if (!kcalMatch2) {
        kcal = null;
      }
      return { name, price, kcal, url, pricePerKg };
    } catch (error) {
      console.log(`Error while parsing product details: ${url} - ${error.message}`);
      return null;
    }
  }
  
  

async function main() {
    const mainUrl = 'https://www.arkenzoo.se/hund-hundmat-torrfoder'; 
    const productList = await scrapeProductsList(mainUrl);

    fs.writeFileSync('products.json', JSON.stringify(productList, null, 2));
}

main();