// // Step 2: Manage an array of quote objects
// const quotes = [
//   { text: "The best way to predict the future is to create it.", category: "Motivation" },
//   { text: "Life is what happens when you're busy making other plans.", category: "Life" },
//   { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
// ];

// // Get references to DOM elements
// const quoteDisplay = document.getElementById("quoteDisplay");
// const newQuoteBtn = document.getElementById("newQuote");

// // Function to display a random quote
// function showRandomQuote() {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[randomIndex];

//   // Clear previous content
//   quoteDisplay.innerHTML = "";

//   // Create DOM elements dynamically
//   const quoteText = document.createElement("p");
//   quoteText.textContent = `"${quote.text}"`;

//   const quoteCategory = document.createElement("span");
//   quoteCategory.textContent = `— ${quote.category}`;
//   quoteCategory.style.display = "block";
//   quoteCategory.style.fontStyle = "italic";
//   quoteCategory.style.marginTop = "8px";

//   // Append elements to container
//   quoteDisplay.appendChild(quoteText);
//   quoteDisplay.appendChild(quoteCategory);
// }

// // Attach event listener for showing random quote
// newQuoteBtn.addEventListener("click", showRandomQuote);

// // Display an initial quote on page load
// showRandomQuote();

// // Step 3: Dynamic Quote Addition (using HTML form)
// function addQuote() {
//   const textInput = document.getElementById("newQuoteText");
//   const categoryInput = document.getElementById("newQuoteCategory");

//   const text = textInput.value.trim();
//   const category = categoryInput.value.trim();

//   if (text && category) {
//     quotes.push({ text, category });

//     // Clear input fields
//     textInput.value = "";
//     categoryInput.value = "";

//     alert("✅ Quote added successfully!");
//     showRandomQuote(); // Optionally show a new random quote
//   } else {
//     alert("⚠️ Please fill in both fields before adding.");
//   }
// }



// Step 2: Manage an array of quote objects
const quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
];

// Get references to DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Clear previous content
  quoteDisplay.innerHTML = "";

  // Create DOM elements dynamically
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${quote.text}"`;

  const quoteCategory = document.createElement("span");
  quoteCategory.textContent = `— ${quote.category}`;
  quoteCategory.style.display = "block";
  quoteCategory.style.fontStyle = "italic";
  quoteCategory.style.marginTop = "8px";

  // Append elements to container
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Attach event listener for showing random quote
newQuoteBtn.addEventListener("click", showRandomQuote);

// Display an initial quote on page load
showRandomQuote();


// Step 3: Dynamic Quote Addition — Create form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.style.marginTop = "20px";

  // Create input for quote text
  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";
  textInput.style.marginRight = "8px";

  // Create input for quote category
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.style.marginRight = "8px";

  // Create button
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  // Add event listener to the button
  addButton.addEventListener("click", addQuote);

  // Append inputs and button to form container
  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Append form container to the document body (or below your main content)
  document.body.appendChild(formContainer);
}

// Function to handle adding a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });

    // Clear inputs
    textInput.value = "";
    categoryInput.value = "";

    // Show the newly added quote
    quoteDisplay.innerHTML = "";
    const addedQuote = document.createElement("p");
    addedQuote.textContent = `"${text}"`;
    const addedCategory = document.createElement("span");
    addedCategory.textContent = `— ${category}`;
    addedCategory.style.display = "block";
    addedCategory.style.fontStyle = "italic";
    addedCategory.style.marginTop = "8px";

    quoteDisplay.appendChild(addedQuote);
    quoteDisplay.appendChild(addedCategory);

    alert("✅ Quote added successfully!");
  } else {
    alert("⚠️ Please fill in both fields before adding.");
  }
}

// Initialize the add-quote form dynamically
createAddQuoteForm();
