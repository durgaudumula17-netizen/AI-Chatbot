# AI-Chatbot

🤖 Personal AI Assistant
A sleek, responsive web-based chat interface powered by Flask and the Google Gemini API. This project allows users to interact with a sophisticated LLM (Large Language Model) in real-time through a modern, dark-themed UI.

🚀 Features
Real-time Interaction: Fast responses using Google's gemini-1.5-flash model.

Persistent Context: Uses start_chat to maintain conversation history during a session.

Responsive Design: Modern UI with message bubbles and a clean, dark-mode aesthetic.

Error Handling: Robust error reporting for API issues or connectivity problems.

🛠️ Tech Stack
Backend: Python 3.x, Flask

AI Engine: Google Generative AI (Gemini API)

Frontend: HTML5, CSS3, JavaScript (Fetch API)

Environment Management: python-dotenv

📋 Prerequisites
Before you begin, ensure you have the following:

Python 3.8+ installed.

A Google API Key. You can get one for free at Google AI Studio.

⚙️ Installation & Setup
1. Clone the Repository
Bash

git clone https://github.com/yourusername/personal-ai-assistant.git
cd personal-ai-assistant
2. Install Dependencies
It is recommended to use a virtual environment:

Bash

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Mac/Linux)
source venv/bin/activate

# Install required packages
pip install flask google-generativeai python-dotenv
3. Configure Environment Variables
Create a file named .env in the root directory to store your credentials securely:

Plaintext

GOOGLE_API_KEY=your_actual_api_key_here
4. Run the Application
Bash

python app.py
Open your browser and navigate to http://127.0.0.1:5000.

📂 Project Structure
Plaintext

├── app.py              # Flask backend logic & API integration
├── .env                # API Keys (Keep this private!)
├── templates/
│   └── index.html      # Frontend chat interface
└── static/
    ├── css/            # UI Styling
    └── js/             # Frontend chat logic
🛡️ Security Note
Never commit your .env file to GitHub. The project includes a .gitignore (or should) to prevent your GOOGLE_API_KEY from being leaked publicly. If your key is leaked, revoke it immediately in the Google AI Studio console.

🤝 Contributing
Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
