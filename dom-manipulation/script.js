

// Top of script.js
localStorage.setItem("quotesInit", JSON.stringify([]));
localStorage.removeItem("quotesInit");

document.addEventListener("DOMContentLoaded", function () {
  // Load quote from local storage or use default ones
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Consistency is the key to success", category: "Motivation" },
    { text: "Love conquers all", category: "Love" },
    { text: "Time waits for no man", category: "Wisdom" }
  ];

  // DOM elements
  const displayedQuote = document.getElementById("quoteDisplay");
  const quoteButton = document.getElementById("newQuote");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");

  // Show a random quote using createElement and appendChild
  function showRandomQuote() {
    displayedQuote.innerHTML = "";

    if (quotes.length === 0) {
      const noQuote = document.createElement("p");
      noQuote.textContent = "No quote available";
      displayedQuote.appendChild(noQuote);
      return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteText = document.createElement("p");
    quoteText.textContent = `"${randomQuote.text}"`;

    const quoteCategory = document.createElement("small");
    quoteCategory.textContent = `- ${randomQuote.category}`;

    displayedQuote.appendChild(quoteText);
    displayedQuote.appendChild(quoteCategory);

    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
  }

  // Add a new quote dynamically
  function createAddQuoteForm() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text && category) {
      const newQuote = { text, category };
      quotes.push(newQuote);

      // update quote to localstorage
      localStorage.setItem("quotes", JSON.stringify(quotes));

      // Clear previous display
      displayedQuote.innerHTML = "";

      // Display last added quote using createElement and appendChild
      const quoteText = document.createElement("p");
      quoteText.textContent = `"${newQuote.text}"`;

      const quoteCategory = document.createElement("small");
      quoteCategory.textContent = `- ${newQuote.category}`;

      displayedQuote.appendChild(quoteText);
      displayedQuote.appendChild(quoteCategory);

      // Clear inputs
      newQuoteText.value = "";
      newQuoteCategory.value = "";

      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields");
    }
  }

  // Event listener for quote button
  quoteButton.addEventListener("click", showRandomQuote);

  window.addQuote = createAddQuoteForm;

  // Display last viewed quotes
  const lastQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastQuote) {
    displayedQuote.innerHTML = `<p>"${lastQuote.text}"</p>
    <small>- ${lastQuote.category}</small>`;
  }
  else {
    showRandomQuote();
  }

  // function to download quote to a JSON file
  function exportToJsonFile() {
    const quoteArray = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quoteArray], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";

    // Append link to document so click works in all browsers
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Quotes exported successfully!");
  }

  // function to upload json file containing quotes
  function importFromJsonFile(event) {
    const fileReader = new FileReader();

    // read content
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);

      // function to save quotes
      localStorage.setItem("quotes", JSON.stringify(quotes));
      alert("Quotes imported successfully!");
    };

    // read file as text
    fileReader.readAsText(event.target.files[0]);
  }

  // function to group quotes by categories
  function populateCategories() {
    const categorySelect = document.getElementById("categoryFilter");

    // loop through every quote item in the quote array
    const mapped = quotes.map(function (q) {
      return q.category;
    });



    // convert the quote array into a set and remove duplicate
    const uniqueSet = new Set(mapped);

    // convert the unique array back to a javascript object for display
    const categories = Array.from(uniqueSet);

    // clear existing options leaving "All Categories" avoiding duplicates
    categorySelect.innerHTML = "<option value = 'all'> All Categories</option>";

    // add each quote category to an option.
    categories.forEach(quoteCategory => {
      const categoryOption = document.createElement("option");
      categoryOption.value = quoteCategory;
      categoryOption.textContent = quoteCategory;
      categorySelect.appendChild(categoryOption);
    })

    // Restore the last selected category from local storage
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      categorySelect.value = savedCategory;
      filterQuotes(); // Apply filter automatically
    }
  }

  populateCategories();

  // function to filter quotes
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;

    localStorage.setItem("selectedCategory", selectedCategory);

    let filteredQuotes;

    if (selectedCategory === "all") {
      filteredQuotes = quotes;
    } else {
      filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    displayQuotes(filteredQuotes);
  }

  function displayQuotes(quoteList) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear old quotes

    quoteList.forEach(q => {
      const div = document.createElement("div");
      div.textContent = `"${q.text}" — ${q.category}`;
      quoteDisplay.appendChild(div);
    });
  }

  // Make functions available globally for HTML
  window.filterQuotes = filterQuotes;
  window.exportToJsonFile = exportToJsonFile;
  window.importFromJsonFile = importFromJsonFile;

  function createAddQuoteForm() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text && category) {
      const newQuote = { text, category };
      quotes.push(newQuote);

      // Save updated quotes to local storage
      localStorage.setItem("quotes", JSON.stringify(quotes));

      // Update categories in the dropdown dynamically
      populateCategories(); // Refresh the dropdown immediately

      // Clear previous display
      displayedQuote.innerHTML = "";

      // Display last added quote
      const quoteText = document.createElement("p");
      quoteText.textContent = `"${newQuote.text}"`;

      const quoteCategory = document.createElement("small");
      quoteCategory.textContent = `- ${newQuote.category}`;

      displayedQuote.appendChild(quoteText);
      displayedQuote.appendChild(quoteCategory);

      // Clear inputs
      newQuoteText.value = "";
      newQuoteCategory.value = "";

      alert("Quote added successfully!");
    }
    else {
      alert("Please fill in both fields");
    }
  }

  const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch(SERVER_URL);
      const data = await response.json();

      // Simulate quotes from server by mapping post titles
      const serverQuotes = data.slice(0, 5).map(post => ({
        text: post.title,
        category: "Server Sync"
      }));

      console.log("Fetched quotes from server:", serverQuotes);

      // Merge server quotes with local quotes (simulate sync)
      quotes.push(...serverQuotes);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      populateCategories();
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  }

  async function syncQuotesToServer() {
    try {
      const unsyncedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

      for (const quote of unsyncedQuotes) {
        await fetch(SERVER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quote)
        });
      }

      console.log("All local quotes synced to server!");
    } catch (error) {
      console.error("Error syncing quotes:", error);
    }
  }

  setInterval(() => {
    console.log("Syncing with server...");
    fetchQuotesFromServer();
    syncQuotesToServer();
  }, 30000); // every 30 seconds

  async function syncWithServer() {
    try {
      const response = await fetch(SERVER_URL);
      const data = await response.json();

      // Simulate server quotes
      const serverQuotes = data.slice(0, 5).map(post => ({
        text: post.title,
        category: "Server Sync"
      }));

      const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

      // Resolve conflicts: server takes precedence
      const mergedQuotes = resolveConflicts(localQuotes, serverQuotes);

      // Update local storage
      localStorage.setItem("quotes", JSON.stringify(mergedQuotes));

      // Notify user of update
      showNotification("Quotes synced with server!");


      populateCategories();
    }
    catch (error) {
      console.error("Error syncing with server:", error);
    }
  }

  function resolveConflicts(localQuotes, serverQuotes) {
    const merged = [...localQuotes];
    let conflictResolved = false;

    serverQuotes.forEach(serverQuote => {
      const existingIndex = merged.findIndex(
        localQuote => localQuote.text === serverQuote.text
      );

      if (existingIndex !== -1) {
        // Conflict detected — server takes precedence
        merged[existingIndex] = serverQuote;
        conflictResolved = true;
      } else {
        merged.push(serverQuote);
      }
    });

    if (conflictResolved) {
      showNotification("Conflict resolved: Server data applied.");
    }

    return merged;
  }


  function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.background = "#222";
    notification.style.color = "#fff";
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "8px";
    notification.style.zIndex = "1000";
    notification.style.opacity = "0.9";
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }


});