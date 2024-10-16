'use strict';

// Unique process ID to prevent multiple instances of the script running simultaneously
const pid = Date.now();
if (GM_getValue('pid') > pid) return console.log('Older instance found. Exiting...');
GM_setValue('pid', pid);

let searchWords = []; // Array to store randomly generated search words
const randomWordApi = 'https://random-word-api.herokuapp.com/word?number=20';

// Helper function to generate random integers within a specified range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fetch random words from the API and handle any errors
async function getSearchWords() {
  try {
    const response = await fetch(randomWordApi);
    if (!response.ok) throw new Error('Network response was not ok');
    searchWords = await response.json();
    console.log(`Fetched ${searchWords.length} random words`);
  } catch (error) {
    console.error('Fetching random words failed:', error);
    searchWords = [];
  }
}

// Main functionality for performing randomized Ecosia searches with timing delays
async function performSearches() {
  try {
    // Get random search words first
    await getSearchWords();

    // Determine a random number of searches within a reasonable range
    const numSearches = getRandomInt(10, 30);
    console.log(`Performing ${numSearches} randomized searches`);

    // Perform the searches with randomized delays
    for (let i = 0; i < numSearches; i++) {
      if (searchWords.length === 0) {
        break;
      }
      const word = searchWords.pop();
      const delay = getRandomInt(7 * 1000, 20 * 1000); // Increased random delay between searches
      setTimeout(() => {
        console.log(`Searching for: ${word}`);
        window.location.href = `https://www.ecosia.org/search?q=${encodeURIComponent(word)}`;
      }, delay);
    }
  } catch (error) {
    console.error('Error performing searches:', error);
  }
}

// Global error handling for any unexpected errors that occur
window.onerror = function (message, source, lineno, colno, error) {
  console.log(`Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${JSON.stringify(error)}`);
};

// Add a Greasemonkey menu command to initiate the randomized searches
GM_registerMenuCommand('Start Searching (Randomized)', function () {
  performSearches()
    .catch((error) => {
      alert('An error occurred. Check the console for details.');
      console.error(error);
    });
});

// Add a Greasemonkey menu command to clear the search history
GM_registerMenuCommand('Clear Search History', function() {
  GM_setValue('pid', 0);
  searchWords = [];
  console.log('Search history cleared');
});

// Add a Greasemonkey menu command to display the current search words
GM_registerMenuCommand('Display Search Words', function() {
  console.log('Current search words:', searchWords);
});

// Add a Greasemonkey menu command to restart the script
GM_registerMenuCommand('Restart Script', function() {
  GM_setValue('pid', 0);
  location.reload();
  console.log('Script restarted');
});
