'use strict';

const pid = Date.now();
if (GM_getValue('pid') > pid) return console.log('Older instance found. Exiting...');
GM_setValue('pid', pid);

let search_words = [];
const random_word_api = "https://random-word-api.herokuapp.com/word?number=20";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getSearchWords() {
  try {
    const response = await fetch(random_word_api);
    if (!response.ok) throw new Error('Network response was not ok');
    search_words = await response.json();
  } catch (error) {
    console.error('Fetching random words failed:', error);
    search_words = [];
  }
}

// Randomized Search Timing
async function performSearches() {
  await getSearchWords();
  const numSearches = getRandomInt(10, 30); // Random number of searches
  for (let i = 0; i < numSearches; i++) {
    if (search_words.length === 0) {
      break;
    }
    const word = search_words.pop();
    const delay = getRandomInt(5 * 1000, 10 * 1000); // Random delay between searches
    setTimeout(() => {
      window.location.href = `https://www.ecosia.org/search?q=${encodeURIComponent(word)}`;
    }, delay);
  }
}

// Error Handling
window.onerror = function(message, source, lineno, colno, error) {
  console.log(`Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${JSON.stringify(error)}`);
};

// User Notifications
GM_registerMenuCommand('Start Searching (Randomized)', function() {
  performSearches().catch(error => {
    alert('An error occurred. Check the console for details.');
    console.error(error);
  });
});
