// Sample coin data (replace this with actual data from an API if needed)
const coins = [
  "ai16z",
  "fartcoin",
  "grass",
  "goatseus-maximus",
  "ionet",
  "act-i-the-ai-prophecy",
  "zerebro",
  "nosana",
  "griffain",
  "tai",
  "ai-rig-complex",
  "eliza",
  "alchemist-ai",
  "memes-ai",
  "degen-spartan-ai",
  "dasha",
  "dolos-the-bully",
  "kween",
  "orbit",
  "fxn",
  "top-hat",
  "shoggoth",
  "agenttank",
  "deep-worm",
  "big-pharmai",
  "bongo-cat",
  "numogram",
  "ava-ai",
  "opus",
  "obot",
  "project89",
  "chaos-and-disorder",
  "meow",
  "koala-ai",
  "kitten-haimer",
  "pippin",
  "max",
  "aimonica-brands",
  "autonomous-virtual-beings",
  "forest",
  "solaris-ai",
  "synesis-one",
  "moe",
  "universal-basic-compute",
  "mizuki",
  "naitzsche",
  "slopfather",
  "the-lokie-cavbal",
  "tensor",
  "arok-vc",
  "aiwithdaddyissues",
  "bloomsperg-terminal",
  "omega",
  "thales-ai",
  "keke-terminal",
  "hor",
  "quasar",
  "ropirito",
  "kolin",
  "kwantxbt",
  "dither",
  "duck-ai",
  "centience",
  "iq6900",
  "darksun",
  "weird-medieval-memes",
  "yousim",
  "sensus",
  "ocada-ai",
  "singularry",
  "patchwork-naval",
  "kira",
  "kirakuru",
  "brot",
  "effective-accelerationism",
  "cheshire-grin",
  "limbo",
  "size",
  "neroboss",
  "gmika",
  "convo",
  "sqrfund",
  "ugly-dog",
  "gemxbt",
  "roastmaster9000",
  "nova-on-mars",
  "sendor",
  "flowerai",
  "dojo-protocol",
  "internosaur",
  "devin",
  "lea-ai",
  "rex",
  "aletheia",
  "mona-arcane",
  "apicoin",
  "cyphomancer",
  "lucy-ai",
  "agent-rogue",
];
// API URL and Key
const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";
const apiKey = "CG-i1ZbW914wt1xBBMZorRUV4Z8"; // You may omit this as it's not necessary for public CoinGecko API access

// Pagination variables
const rowsPerPage = 20;
let currentPage = 1;
let totalCoins = [];
let filteredCoins = []; // To store filtered coin data

// Function to fetch coin data from CoinGecko API
function fetchCoinData(coins) {
  const coinIds = coins.join(",");
  const url = `${apiUrl}?vs_currency=usd&ids=${coinIds}`;

  // Use the Fetch API to get data
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Coin data:", data);
      totalCoins = data;
      filteredCoins = data; // Initialize filteredCoins with the full list of data
      displayPage(currentPage); // Display the first page of data
      setupPagination(); // Set up pagination buttons
    })
    .catch((error) => {
      console.error("Error fetching coin data:", error);
    });
}

// Function to format market cap in billions or millions
function formatMarketCap(value) {
  if (value >= 1e9) {
    return "$" + (value / 1e9).toFixed(2) + "B";
  }
  if (value >= 1e6) {
    return "$" + (value / 1e6).toFixed(2) + "M";
  }
  return "$" + value.toLocaleString();
}

// Function to populate the table with fetched coin data for a specific page
function displayPage(page) {
  const tableBody = document.getElementById("coins-table-body");
  tableBody.innerHTML = ""; // Clear existing table rows

  // Calculate the start and end indexes for the current page
  const start = (page - 1) * rowsPerPage;
  const end = page * rowsPerPage;

  // Slice the filtered data to show only the rows for the current page
  const coinsData = filteredCoins.slice(start, end);

  // Loop through the coin data to create table rows
  coinsData.forEach((coin) => {
    const row = document.createElement("tr");

    row.innerHTML = `
  <td>
    <div class="coin-row">
      <div class="coin-image">
        <img src="${
          coin.image ? coin.image : "https://via.placeholder.com/50"
        }" alt="${coin.name ? coin.name : "Unknown"} logo" />
      </div>
      <div class="coin-info">
        <div class="coin-name">${coin.name ? coin.name : "Unknown"}</div>
        <div class="coin-symbol">@${coin.symbol ? coin.symbol : "N/A"}</div>
      </div>
    </div>
  </td>
  <td>${coin.current_price ? "$" + coin.current_price.toFixed(2) : "N/A"}</td>
  <td>${coin.market_cap ? formatMarketCap(coin.market_cap) : "N/A"}</td>
  <td>${coin.market_cap_rank ? coin.market_cap_rank : "N/A"}</td>
  <td class="${
    coin.price_change_percentage_24h >= 0 ? "text-green" : "text-red"
  }">
    ${
      coin.price_change_percentage_24h !== null &&
      coin.price_change_percentage_24h !== undefined
        ? coin.price_change_percentage_24h.toFixed(2) + "%"
        : "N/A"
    }
  </td>
  <td class="${
    coin.market_cap_change_percentage_24h >= 0 ? "text-green" : "text-red"
  }">
    ${
      coin.market_cap_change_percentage_24h !== null &&
      coin.market_cap_change_percentage_24h !== undefined
        ? coin.market_cap_change_percentage_24h.toFixed(2) + "%"
        : "N/A"
    }
  </td>
  <td>${
    coin.circulating_supply ? formatMarketCap(coin.circulating_supply) : "N/A"
  }</td>
  <td>${coin.total_supply ? formatMarketCap(coin.total_supply) : "N/A"}</td>
  <td>${
    coin.last_updated ? new Date(coin.last_updated).toLocaleDateString() : "N/A"
  }</td>
`;

    tableBody.appendChild(row);
  });
}

// Function to set up pagination buttons
function setupPagination() {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = ""; // Clear existing pagination buttons

  const totalPages = Math.ceil(filteredCoins.length / rowsPerPage);

  // Create pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-btn");
    button.addEventListener("click", () => changePage(i));
    paginationContainer.appendChild(button);
  }
}

// Function to handle page changes
function changePage(page) {
  if (page < 1 || page > Math.ceil(filteredCoins.length / rowsPerPage)) return;
  currentPage = page;
  displayPage(currentPage); // Update the table for the current page
}

// Function to apply filter based on the search input
function applyFilter(event) {
  const query = event.target.value.toLowerCase();

  // Filter the coins based on the search query (name or symbol)
  filteredCoins = totalCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query),
  );

  // After filtering, reset to the first page and update the display
  currentPage = 1;
  displayPage(currentPage); // Update table with filtered data
  setupPagination(); // Rebuild pagination buttons
}
let sortState = {
  column: null, // The column currently being sorted
  order: "asc", // The current sorting order ('asc' or 'desc')
};

function sortTable(column) {
  // Toggle sort order for the clicked column
  if (sortState.column === column) {
    sortState.order = sortState.order === "asc" ? "desc" : "asc";
  } else {
    sortState.column = column;
    sortState.order = "asc"; // Default to ascending when sorting a new column
  }

  // Sort the data based on the column and order (ascending or descending)
  filteredCoins.sort((a, b) => {
    const aValue = a[column];
    const bValue = b[column];

    if (aValue === undefined || bValue === undefined) return 0;

    if (sortState.order === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  // Update the table and pagination
  currentPage = 1;
  displayPage(currentPage);
  setupPagination();

  // Update the sort icons
  updateSortIcons(column);
}

function updateSortIcons(column) {
  // Reset all sort icons
  const headers = document.querySelectorAll("th");
  headers.forEach((header) => {
    header.classList.remove("sort-asc", "sort-desc");
  });

  // Add the correct sort icon to the header based on the column and order
  const header = document.querySelector(`th[data-column="${column}"]`);
  if (header) {
    header.classList.add(sortState.order === "asc" ? "sort-asc" : "sort-desc");
  }
}

// Call the fetchCoinData function to load the data when the page loads
window.onload = function () {
  fetchCoinData(coins); // Fetch the data for the predefined coins
};
