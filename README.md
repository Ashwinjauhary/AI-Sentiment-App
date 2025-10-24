# AI Sentiment Analyzer

A web application that analyzes text sentiment using AI and stores analysis history in browser local storage.

## Features

- **Real-time Sentiment Analysis**: Uses TextBlob to determine if text is positive, negative, or neutral
- **Persistent History**: Analysis history is stored locally in the browser using localStorage
- **Clean UI**: Modern, responsive design with color-coded sentiment results
- **Custom Favicon**: AJ-themed icon in browser tab
- **No Database Required**: Everything runs locally with no external dependencies

## Tech Stack

- **Backend**: Python + Flask
- **AI Model**: TextBlob for sentiment analysis
- **Frontend**: HTML + CSS + JavaScript
- **Storage**: Browser localStorage

## Project Structure

```
AI-Sentiment-App/
├── app.py              # Flask backend with sentiment analysis API
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html      # Frontend HTML template
├── static/
│   ├── style.css       # CSS styling
│   ├── script.js       # Frontend JavaScript logic
│   └── favicon.svg     # Custom AJ-themed favicon
└── venv/               # Python virtual environment
```

## Setup Instructions

1. **Install Python** (if not already installed)

2. **Create and activate virtual environment**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Download TextBlob corpora**:
   ```bash
   python -m textblob.download_corpora
   ```

5. **Run the application**:
   ```bash
   python app.py
   ```

6. **Open in browser**:
   Navigate to `http://127.0.0.1:5000/`

## Usage

1. Enter any text in the input field
2. Click "Analyze Sentiment" 
3. View the AI-generated sentiment result
4. Check the history section to see previous analyses
5. History persists even after page refresh

## API Endpoints

- `GET /` - Main application page
- `POST /analyze` - Analyze sentiment of provided text
  - **Request**: `text` (form data)
  - **Response**: JSON with `sentiment` and `polarity` fields

## Example Usage

```javascript
// Example API call
fetch('/analyze', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'text=I love this application!'
})
.then(response => response.json())
.then(data => {
    console.log(data.sentiment); // "Positive"
    console.log(data.polarity);  // 0.5
});
```

## Development

The application runs in debug mode by default. Any changes to the code will automatically restart the server.

## License

This project is open source and available under the MIT License.
