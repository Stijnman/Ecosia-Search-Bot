'use strict';

// Initialization Code
const MIN_REWARDS = 10;
const MAX_REWARDS = 30;
const MIN_DELAY = 5 * 1000;
const MAX_DELAY = 10 * 1000;
const wiki_apis = {
  en: "https://en.wikipedia.org/api/rest_v1/page/random/summary",
  nl: "https://nl.wikipedia.org/api/rest_v1/page/random/summary"
};

// Helper Functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLanguage() {
  return Math.random() < 0.5 ? 'en' : 'nl';
}

async function getSearchWords() {
  try {
    const lang = getRandomLanguage();
    const response = await fetch(wiki_apis[lang]);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    const content = data.extract.split(' ');
    return content.slice(0, getRandomInt(5, 20)); // Use a random number of words for searches
  } catch (error) {
    console.error('Fetching random Wikipedia article failed:', error);
    return [];
  }
}

// Main Logic
async function performSearches() {
  const search_words = await getSearchWords();
  const numSearches = getRandomInt(MIN_REWARDS, MAX_REWARDS);
  for (let i = 0; i < numSearches; i++) {
    if (search_words.length === 0) {
      break;
    }
    const word = search_words.pop();
    const delay = getRandomInt(MIN_DELAY, MAX_DELAY);
    setTimeout(() => {
      window.location.href = `https://www.ecosia.org/search?q=${encodeURIComponent(word)}`;
    }, delay);
  }
}

// Error Handling
window.onerror = function(message, source, lineno, colno, error) {
  console.log(`Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${JSON.stringify(error)}`);
};

// Export Functions (if needed)
export { getRandomInt, getRandomLanguage, getSearchWords, performSearches };
