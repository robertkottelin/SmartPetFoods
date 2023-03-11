import os
import requests
import re

# Create the hrefs directory if it doesn't already exist
if not os.path.exists("hrefs/"):
    os.makedirs("hrefs/")

# Read the hrefs from hrefs.txt
with open("hrefs.txt") as f:
    hrefs = f.read().splitlines()

# Download each HTML file and save it to the hrefs directory
for href in hrefs:
    filename = os.path.basename(href)
    # Replace any invalid characters in the filename with underscores
    filename = re.sub(r'[^\w\-\.]', '_', filename)
    file_path = os.path.join("hrefs", filename + ".html")
    response = requests.get(href)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(response.text)
    print(f"Downloaded {filename}.html to hrefs directory")
