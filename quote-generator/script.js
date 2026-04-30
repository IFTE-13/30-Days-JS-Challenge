const apiUrl = 'https://api.quotable.io/random';
        
async function fetchQuote(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('quoteText').textContent = data.content;
        document.getElementById('quoteAuthor').textContent = `- ${data.author}`;
    } catch (error) {
        document.getElementById('quoteText').textContent = "Life is what happens when you're busy making other plans.";
        document.getElementById('quoteAuthor').textContent = "- John Lennon";
    }
}

function fetchNewQuote() {
    fetchQuote(apiUrl);
}

function copyQuote() {
    const quoteText = document.getElementById('quoteText').textContent;
    const quoteAuthor = document.getElementById('quoteAuthor').textContent;
    const fullQuote = `${quoteText} ${quoteAuthor}`;
    
    navigator.clipboard.writeText(fullQuote).then(() => {
        const copyBtn = event.currentTarget;
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="material-icons text-[18px]">check</span> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 1500);
    });
}

fetchQuote(apiUrl);