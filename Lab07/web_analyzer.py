import matplotlib.pyplot as plt
import re
import requests
from bs4 import BeautifulSoup

url = "https://en.wikipedia.org/wiki/University_of_Calgary"
headers = {
    "User-Agent": "lab07-web-analyzer"
}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Ensures the request was successful
    soup = BeautifulSoup(response.text, 'html.parser')
    print(f"Successfully fetched content from {url}")
except Exception as e:
    print(f"Error fetching content: {e}")

print(soup.prettify())

# Count headings (h1 to h6)
headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
headings_count = len(headings)

# Count links
links = soup.find_all('a')
links_count = len(links)

# Count paragraphs
paragraphs = soup.find_all('p')
paragraphs_count = len(paragraphs)

# Print results
print("Headings:", headings_count)
print("Links:", links_count)
print("Paragraphs:", paragraphs_count)

# Extract all text content from the webpage
all_text = soup.get_text()

# Convert text to lowercase
all_text = all_text.lower()

# Split text into words using regex
words = re.findall(r'\b\w+\b', all_text)

# Count frequency of each word
word_counts = {}

for word in words:
    if word in word_counts:
        word_counts[word] += 1
    else:
        word_counts[word] = 1

# Sort words by frequency in descending order
sorted_words = sorted(word_counts.items(),
                      key=lambda item: item[1], reverse=True)

# Display top 5 most frequent words
print("Top 5 most frequent words:")
for word, count in sorted_words[:5]:
    print(word, ":", count)


# Ask user for keyword
keyword = input("Enter a keyword to search: ").lower()

# Get all text from page
text = soup.get_text().lower()

# Count occurrences
count = text.count(keyword)

# Print result
print(f"The keyword '{keyword}' appears {count} times in the webpage.")

# Find all paragraphs
paragraphs = soup.find_all('p')

longest_paragraph = ""
max_word_count = 0

for p in paragraphs:
    text = p.get_text().strip()
    words = text.split()

    if len(words) >= 5:
        if len(words) > max_word_count:
            max_word_count = len(words)
            longest_paragraph = text

# Print result
print("\nLongest Paragraph:")
print(longest_paragraph)
print("Word count:", max_word_count)

labels = ['Headings', 'Links', 'Paragraphs']
values = [headings_count, links_count, paragraphs_count]
plt.bar(labels, values)
plt.title('19')
plt.ylabel('Count')
plt.savefig('web_analysis_results.png') # Save the figure as an image file
plt.show()
