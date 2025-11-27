from flask import Flask, render_template, request, jsonify
import random
import json

app = Flask(__name__)

# Diffie-Hellman helper functions
def mod_pow(base, exp, mod):
    """Efficient modular exponentiation"""
    if mod == 1:
        return 0
    result = 1
    base = base % mod
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod
        exp = exp >> 1
        base = (base * base) % mod
    return result

def generate_private_key(p):
    """Generate a random private key"""
    return random.randint(2, p - 2)

def compute_public_key(g, private_key, p):
    """Compute public key: g^private_key mod p"""
    return mod_pow(g, private_key, p)

def compute_shared_secret(public_key, private_key, p):
    """Compute shared secret: public_key^private_key mod p"""
    return mod_pow(public_key, private_key, p)

# Encryption/Decryption functions
def encrypt_message(message, key):
    """Encrypt message using XOR cipher with the key"""
    encrypted = []
    key_str = str(key)
    for i, char in enumerate(message):
        char_code = ord(char)
        key_char = ord(key_str[i % len(key_str)])
        encrypted_char = char_code ^ key_char
        encrypted.append(format(encrypted_char, '04x'))
    return ''.join(encrypted)

def decrypt_message(encrypted, key):
    """Decrypt message using XOR cipher with the key"""
    try:
        decrypted = []
        key_str = str(key)
        for i in range(0, len(encrypted), 4):
            hex_char = encrypted[i:i+4]
            encrypted_char = int(hex_char, 16)
            key_char = ord(key_str[(i // 4) % len(key_str)])
            decrypted_char = encrypted_char ^ key_char
            decrypted.append(chr(decrypted_char))
        return ''.join(decrypted)
    except Exception as e:
        return f"Error decrypting: {str(e)}"

@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')

@app.route('/generate_keys', methods=['POST'])
def generate_keys():
    """Generate Diffie-Hellman keys"""
    try:
        data = request.get_json()
        p = int(data.get('prime', 23))
        g = int(data.get('generator', 5))
        
        # Validation
        if p < 2 or g < 2:
            return jsonify({'error': 'Prime and Generator must be at least 2'}), 400
        
        if g >= p:
            return jsonify({'error': 'Generator must be less than Prime'}), 400
        
        # Generate keys for Alice
        alice_private = generate_private_key(p)
        alice_public = compute_public_key(g, alice_private, p)
        
        # Generate keys for Bob
        bob_private = generate_private_key(p)
        bob_public = compute_public_key(g, bob_private, p)
        
        # Compute shared secrets
        alice_shared = compute_shared_secret(bob_public, alice_private, p)
        bob_shared = compute_shared_secret(alice_public, bob_private, p)
        
        # Return all the keys
        return jsonify({
            'alice': {
                'private': alice_private,
                'public': alice_public,
                'shared': alice_shared
            },
            'bob': {
                'private': bob_private,
                'public': bob_public,
                'shared': bob_shared
            },
            'prime': p,
            'generator': g
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/encrypt', methods=['POST'])
def encrypt():
    """Encrypt a message"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        key = int(data.get('key', 0))
        
        if not message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        encrypted = encrypt_message(message, key)
        return jsonify({'encrypted': encrypted})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/decrypt', methods=['POST'])
def decrypt():
    """Decrypt a message"""
    try:
        data = request.get_json()
        encrypted = data.get('encrypted', '')
        key = int(data.get('key', 0))
        
        if not encrypted:
            return jsonify({'error': 'Encrypted message cannot be empty'}), 400
        
        decrypted = decrypt_message(encrypted, key)
        return jsonify({'decrypted': decrypted})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)