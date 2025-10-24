// DOM elements
const form = document.getElementById('sentimentForm');
const textInput = document.getElementById('textInput');
const analyzeBtn = document.querySelector('.analyze-btn');
const resultDiv = document.getElementById('result');
const sentimentText = document.getElementById('sentimentText');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

// Load history from localStorage on page load
document.addEventListener('DOMContentLoaded', loadHistory);

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const text = textInput.value.trim();
    if (!text) return;
    
    // Disable button and show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('loading');
    analyzeBtn.textContent = 'Analyzing...';
    
    try {
        // Send request to Flask backend
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `text=${encodeURIComponent(text)}`
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Display result
            displayResult(data.sentiment, data.polarity);
            
            // Save to history
            saveToHistory(text, data.sentiment);
            
            // Update history display
            updateHistoryDisplay();
        } else {
            // Show error
            sentimentText.textContent = `Error: ${data.error}`;
            sentimentText.className = 'sentiment-text neutral';
            resultDiv.classList.remove('hidden');
            resultDiv.classList.add('show');
        }
    } catch (error) {
        sentimentText.textContent = 'Error: Could not connect to server';
        sentimentText.className = 'sentiment-text neutral';
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('show');
    } finally {
        // Reset button
        analyzeBtn.disabled = false;
        analyzeBtn.classList.remove('loading');
        analyzeBtn.textContent = 'Analyze Sentiment';
    }
});

// Clear history button
clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('sentimentHistory');
        updateHistoryDisplay();
    }
});

// Display sentiment result
function displayResult(sentiment, polarity) {
    sentimentText.textContent = sentiment;

    // Remove previous classes
    sentimentText.classList.remove('positive', 'negative', 'neutral');

    // Add appropriate class based on sentiment
    if (sentiment.toLowerCase().includes('positive')) {
        sentimentText.classList.add('positive');
    } else if (sentiment.toLowerCase().includes('negative')) {
        sentimentText.classList.add('negative');
    } else {
        sentimentText.classList.add('neutral');
    }

    // Show result with animation
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('show');

    // Smooth scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Save analysis to history
function saveToHistory(text, sentiment) {
    let history = getHistory();
    
    // Create new entry
    const entry = {
        text: text,
        sentiment: sentiment,
        timestamp: new Date().toISOString()
    };
    
    // Add to beginning of array (most recent first)
    history.unshift(entry);
    
    // Keep only last 50 entries
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    
    // Save to localStorage
    localStorage.setItem('sentimentHistory', JSON.stringify(history));
}

// Get history from localStorage
function getHistory() {
    const stored = localStorage.getItem('sentimentHistory');
    return stored ? JSON.parse(stored) : [];
}

// Load and display history
function loadHistory() {
    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    const history = getHistory();
    
    if (history.length === 0) {
        historyList.innerHTML = '<p class="no-history">No previous analyses yet. Try analyzing some text!</p>';
        return;
    }
    
    historyList.innerHTML = history.map((entry, index) => {
        const date = new Date(entry.timestamp).toLocaleDateString();
        const time = new Date(entry.timestamp).toLocaleTimeString();

        return `
            <div class="history-item">
                <div class="history-text">${entry.text}</div>
                <div class="history-sentiment ${entry.sentiment.toLowerCase().split(' ')[0]}">
                    ${entry.sentiment}
                </div>
                <div class="history-date">
                    ${date} ${time}
                </div>
            </div>
        `;
    }).join('');
}
