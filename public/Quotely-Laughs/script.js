document.getElementById("generate").addEventListener("click", generateContent);

document.addEventListener("DOMContentLoaded", async () => {
  await generateContent();
});

async function generateContent() {
  showLoading();
  const quote = await getRandomQuote();
  const joke = await getRandomJoke();
  hideLoading();

  document.getElementById("quote").innerText = quote;
  document.getElementById("joke").innerText = joke;

  updateShareLinks(quote, joke);
}

function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}

async function getRandomQuote() {
  const quoteApiUrl = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  try {
    const response = await fetch(quoteApiUrl);
    if (response.ok) {
      const quoteData = await response.json();
      const quoteText = quoteData.data.content;
      const quoteAuthor = quoteData.data.author;
      return `"${quoteText}" - ${quoteAuthor}`;
    }
  } catch (error) {
    console.warn("Failed to fetch a quote from the API:", error);
  }

  const fallbackQuotes = [
    "The only way to do great work is to love what you do. -Steve Jobs",
    "Believe you can and you're halfway there. -Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. -Winston Churchill",
    "In the middle of difficulty lies opportunity. -Albert Einstein",
    "Don't watch the clock; do what it does. Keep going. -Sam Levenson",
  ];
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
}

async function getRandomJoke() {
  const jokeApiUrl =
    "https://v2.jokeapi.dev/joke/Programming,Spooky?blacklistFlags=political,racist,sexist&format=txt";
  try {
    const response = await fetch(jokeApiUrl);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn("Failed to fetch a joke from the API:", error);
  }

  const fallbackJokes = [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "What do you call fake spaghetti? An impasta.",
  ];
  return fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
}

function updateShareLinks(quote, joke) {
  const siteURL =
    "https://50-days-50-web-project.vercel.app/Quotely-Laughs/index.html";

  document.getElementById(
    "share-quote-x"
  ).href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${quote} \n\nGenerated by Quotely Laughs.\nVisit site at ${siteURL}`
  )}`;

  document.getElementById(
    "share-joke-x"
  ).href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${joke} \n\nGenerated by Quotely Laughs.\nVisit site at ${siteURL}`
  )}`;
}
