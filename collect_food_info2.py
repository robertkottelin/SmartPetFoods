import os
import re
import json
from bs4 import BeautifulSoup

# Create a list to store the extracted information
products = []

# Iterate through all the HTML files in the hrefs directory
for filename in os.listdir("hrefs"):
    if filename.endswith(".html"):
        filepath = os.path.join("hrefs", filename)
        with open(filepath, encoding="utf-8") as fp:
            soup = BeautifulSoup(fp, "html.parser")
        # Find the script tag containing the dataLayer information
        data_layer_script = soup.find("script", text=re.compile("var dataLayer"))
        if data_layer_script:
            # Extract the dataLayer object from the script tag
            match = re.search(r"var dataLayer\s*=\s*(\{.*\});", str(data_layer_script), re.DOTALL)
            if match:
                data_layer_str = match.group(1)
                # Convert the dataLayer object to a JSON object
                data_layer_dict = json.loads(data_layer_str)
                products.append(data_layer_dict)
                # Print the data_layer_dict
                print(data_layer_dict)

# Print the total number of products extracted
print(f"Total products extracted: {len(products)}")
