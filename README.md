# Diffie-Hellman Key Exchange Web Application

A Python Flask web application demonstrating the Diffie-Hellman key exchange protocol with message encryption and decryption.

## Features

- ✅ Complete Diffie-Hellman key exchange implementation
- ✅ Visual demonstration of public/private keys
- ✅ Secure message encryption and decryption
- ✅ Bidirectional communication between Alice and Bob
- ✅ Modern, responsive UI
- ✅ Server-side cryptographic operations using Python

## Installation

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Setup Steps

1. **Clone or download the project**

```bash
mkdir diffie-hellman-webapp
cd diffie-hellman-webapp
```

2. **Create a virtual environment (recommended)**

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Run the application**

```bash
python app.py
```

5. **Open your browser**
   Navigate to: `http://localhost:5000`

## Usage

1. **Set Public Parameters**: Adjust the prime (p) and generator (g) values if desired
2. **Start Key Exchange**: Click the "Start Key Exchange" button
3. **Observe Key Generation**: See how Alice and Bob generate their keys
4. **Send Encrypted Messages**: Type messages and encrypt them
5. **Decrypt Messages**: Receive and decrypt messages from the other party
6. **Reset**: Clear all data and start over

## Project Structure

# Diffie-Hellman Key Exchange Web Application

# Python Flask Implementation

"""
PROJECT DIRECTORY STRUCTURE:
============================

diffie-hellman-webapp/
│
├── app.py # Main Flask application
├── requirements.txt # Python dependencies
├── README.md # Project documentation
│
├── static/
│ ├── css/
│ │ └── style.css # Stylesheet
│ └── js/
│ └── main.js # JavaScript for interactivity
│
└── templates/
└── index.html # Main HTML template

"""

# INSTALLATION & SETUP STEPS:

# ===========================

#

# 1. Create project directory:

# mkdir diffie-hellman-webapp

# cd diffie-hellman-webapp

#

# 2. Create virtual environment (recommended):

# python -m venv venv

#

# # On Windows:

# venv\Scripts\activate

#

# # On macOS/Linux:

# source venv/bin/activate

#

# 3. Install dependencies:

# pip install -r requirements.txt

#

# 4. Run the application:

# python app.py

#

# 5. Open browser and navigate to:

# http://localhost:5000

#

# 6. To stop the server:

# Press Ctrl+C in terminal

#

# 7. To deactivate virtual environment:

# deactivate
