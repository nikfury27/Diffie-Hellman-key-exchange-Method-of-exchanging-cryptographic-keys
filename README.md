# 🔐 Diffie–Hellman Key Exchange Web Application

*A Flask-powered interactive demonstration of secure key exchange & message encryption.*

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.7+-blue" />
  <img src="https://img.shields.io/badge/Framework-Flask-green" />
  <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-yellow" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey" />
  <img src="https://img.shields.io/badge/Cryptography-Diffie--Hellman-red" />
</p>

---

## 📌 Overview

This project is a **fully interactive web application** that demonstrates how the **Diffie–Hellman Key Exchange (DHKE)** works. It visually walks users through generating public/private keys for Alice and Bob, computing a shared secret, and encrypting/decrypting messages using that secret.

Designed for **students, educators, and cybersecurity beginners**, the app breaks down the entire DH workflow in a clean and intuitive way.

---

## ✨ Features

* 🔑 **Complete Diffie–Hellman workflow**: private keys, public keys, shared secret
* 🎭 **Two-party simulation** (Alice & Bob)
* 🔏 **Message encryption & decryption** using XOR cipher
* 🔄 **Bidirectional communication**
* 💡 **Live visualization of key exchange process**
* 🌐 **Modern, responsive UI** (HTML5, CSS3, JS)
* 🧮 **Server-side cryptographic logic** implemented in Python
* 🧼 **Reset system** to start the demo fresh

---

## 🏗️ Tech Stack

### **Backend**

* Python 3.7+
* Flask

### **Frontend**

* HTML5
* CSS3
* Vanilla JavaScript

### **Cryptography**

* Custom Diffie–Hellman implementation
* XOR cipher for educational message encryption

---

## 📂 Project Structure

```
diffie-hellman-webapp/
│
├── app.py                     # Main Flask backend
├── requirements.txt           # Dependencies
├── README.md                  # Documentation
│
├── static/
│   ├── css/
│   │   └── style.css          # Stylesheet
│   └── js/
│       └── main.js            # Frontend logic
│
└── templates/
    └── index.html             # Main interface
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/diffie-hellman-webapp.git
cd diffie-hellman-webapp
```

---

### 2️⃣ Install Dependencies

#### Create & Activate Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Install Required Packages

```bash
pip install -r requirements.txt
```

---

### 3️⃣ Run the Application

```bash
python app.py
```

Once running, open the browser and go to:

👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🧪 How It Works

### **1. Public Parameters**

Users choose or use default values for:

* Prime modulus **p**
* Generator **g**

### **2. Private & Public Key Generation**

For each party:

```
private_key = random()
public_key  = g^private_key mod p
```

### **3. Shared Secret Derivation**

Alice computes:

```
shared = Bob_public^Alice_private mod p
```

Bob computes:

```
shared = Alice_public^Bob_private mod p
```

Both arrive at the **same secret**, independently.

### **4. Message Encryption**

A simple educational XOR cipher uses the shared secret to:

* Encrypt outgoing messages
* Decrypt incoming messages

---

## 🌐 API Endpoints

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/`              | Load main UI     |
| POST   | `/generate_keys` | Generate DH keys |
| POST   | `/encrypt`       | Encrypt message  |
| POST   | `/decrypt`       | Decrypt message  |

---

## ⚠️ Security Notice

This project is **for educational purposes only**.

* XOR cipher is **NOT secure**
* Diffie–Hellman parameters are simplified
* No padding, no integrity, no authentication

For real secure systems, use:

✔ `cryptography`
✔ `PyCryptodome`
✔ TLS/SSL-based key exchange

---

## 📸 Optional: Add Screenshots

(Place screenshots in `/static/images/` and embed here)

```
![App Screenshot](static/images/screenshot.png)
```

---

## 🧑‍🏫 Ideal For

* Students learning cryptography
* Teachers demonstrating DHKE
* Cybersecurity workshops
* Mini projects / semester projects
* Flask beginners

---

## 📝 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it for educational use.

---

## ⭐ Contribute

Pull requests are welcome! Feel free to open:

* Issues
* Feature suggestions
* UI improvements

---
