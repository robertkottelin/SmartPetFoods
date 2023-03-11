import os
import re
import json
from bs4 import BeautifulSoup

# Create an empty list to store the product objects
products = []

# Iterate through all the HTML files in the hrefs directory
for filename in os.listdir("hrefs"):
    if filename.endswith(".html"):
        filepath = os.path.join("hrefs", filename)
        with open(filepath, encoding="utf-8") as fp:
            soup = BeautifulSoup(fp, "html.parser")

        # Find the script tag containing the dataLayer information
        data_layer_script = soup.find("script", text=re.compile("var dataLayer"))
        



        # Extract the name, price, and weight from the dataLayer script and create a product object
        if data_layer_script:
            data_layer_string = str(data_layer_script.string)
            name_match = re.search(r"'name':\s*'([^']*)'", data_layer_string)
            price_match = re.search(r"'price':\s*'([^']*)'", data_layer_string)
            weight_match = re.search(r"\(([\d\.]+)\s*(kg|g)\)", data_layer_string)
            if name_match and price_match:
                name = name_match.group(1).strip()
                price = float(price_match.group(1))
                if weight_match:
                    weight = float(weight_match.group(1))
                    if weight_match.group(2) == "g":
                        weight /= 1000  # convert grams to kilograms
                else:
                    weight = None
                
                kcal_tag = soup.find("p", text=re.compile("kcal/100g"))
                if kcal_tag:
                    kcal_match = re.search(r"(\d+)\s*kcal/100g", kcal_tag.text)
                    kcal = float(kcal_match.group(1))
                
                    product = {"name": name, "price": price, "weight": weight, "kcal": kcal}
                
                    products.append(product)
                else:
                    kcal = None
            else:
                print(f"No name or price found in {filename}")
        else:
            print(f"No dataLayer script found in {filename}")
    

# Convert the list of product objects to a JSON object and print it
json_products = json.dumps(products, indent=2, ensure_ascii=False)
print(json_products)
