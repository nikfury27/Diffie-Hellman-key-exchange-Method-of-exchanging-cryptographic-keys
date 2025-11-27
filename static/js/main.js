let sharedSecret = null;
let currentEncryptedFromAlice = '';
let currentEncryptedFromBob = '';

async function startExchange() {
    const prime = parseInt(document.getElementById('prime').value);
    const generator = parseInt(document.getElementById('generator').value);

    if (prime < 2 || generator < 2) {
        alert('Prime and Generator must be at least 2');
        return;
    }

    if (generator >= prime) {
        alert('Generator must be less than Prime');
        return;
    }

    try {
        const response = await fetch('/generate_keys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prime: prime,
                generator: generator
            })
        });

        if (!response.ok) {
            const error = await response.json();
            alert('Error: ' + error.error);
            return;
        }

        const data = await response.json();

        // Update Alice's information
        document.getElementById('alice-private').textContent = data.alice.private;
        document.getElementById('alice-public').textContent = 
            `${data.alice.public} = ${generator}^${data.alice.private} mod ${prime}`;
        document.getElementById('alice-secret').textContent = 
            `${data.alice.shared} = ${data.bob.public}^${data.alice.private} mod ${prime}`;

        // Update Bob's information
        document.getElementById('bob-private').textContent = data.bob.private;
        document.getElementById('bob-public').textContent = 
            `${data.bob.public} = ${generator}^${data.bob.private} mod ${prime}`;
        document.getElementById('bob-secret').textContent = 
            `${data.bob.shared} = ${data.alice.public}^${data.bob.private} mod ${prime}`;

        // Check if secrets match
        if (data.alice.shared === data.bob.shared) {
            sharedSecret = data.alice.shared;
            document.getElementById('result').classList.add('show');
            document.getElementById('shared-value').textContent = sharedSecret;
            document.getElementById('messaging').classList.add('show');
        } else {
            alert('Error: Secrets do not match!');
        }

    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function encryptMessage(sender) {
    if (!sharedSecret) {
        alert('Please establish a shared secret first!');
        return;
    }

    const messageId = sender === 'alice' ? 'alice-message' : 'bob-message';
    const message = document.getElementById(messageId).value;

    if (!message) {
        alert('Please enter a message!');
        return;
    }

    try {
        const response = await fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                key: sharedSecret
            })
        });

        if (!response.ok) {
            const error = await response.json();
            alert('Error: ' + error.error);
            return;
        }

        const data = await response.json();
        const encrypted = data.encrypted;

        if (sender === 'alice') {
            currentEncryptedFromAlice = encrypted;
            document.getElementById('alice-encrypted').textContent = encrypted;
            document.getElementById('bob-received').textContent = encrypted;
            document.getElementById('bob-decrypted').textContent = 'No message decrypted yet';
        } else {
            currentEncryptedFromBob = encrypted;
            document.getElementById('bob-encrypted').textContent = encrypted;
            document.getElementById('alice-received').textContent = encrypted;
            document.getElementById('alice-decrypted').textContent = 'No message decrypted yet';
        }

    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function decryptMessage(receiver) {
    if (!sharedSecret) {
        alert('Please establish a shared secret first!');
        return;
    }

    const encrypted = receiver === 'bob' ? currentEncryptedFromAlice : currentEncryptedFromBob;

    if (!encrypted) {
        alert('No message to decrypt!');
        return;
    }

    try {
        const response = await fetch('/decrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                encrypted: encrypted,
                key: sharedSecret
            })
        });

        if (!response.ok) {
            const error = await response.json();
            alert('Error: ' + error.error);
            return;
        }

        const data = await response.json();
        const decrypted = data.decrypted;

        if (receiver === 'bob') {
            document.getElementById('bob-decrypted').textContent = decrypted;
        } else {
            document.getElementById('alice-decrypted').textContent = decrypted;
        }

    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function resetExchange() {
    sharedSecret = null;
    currentEncryptedFromAlice = '';
    currentEncryptedFromBob = '';
    
    document.getElementById('alice-private').textContent = '-';
    document.getElementById('alice-public').textContent = '-';
    document.getElementById('alice-secret').textContent = '-';
    
    document.getElementById('bob-private').textContent = '-';
    document.getElementById('bob-public').textContent = '-';
    document.getElementById('bob-secret').textContent = '-';
    
    document.getElementById('result').classList.remove('show');
    document.getElementById('shared-value').textContent = '-';
    document.getElementById('messaging').classList.remove('show');
    
    document.getElementById('alice-message').value = '';
    document.getElementById('bob-message').value = '';
    document.getElementById('alice-encrypted').textContent = 'No message encrypted yet';
    document.getElementById('bob-encrypted').textContent = 'No message encrypted yet';
    document.getElementById('alice-received').textContent = 'Waiting for message...';
    document.getElementById('bob-received').textContent = 'Waiting for message...';
    document.getElementById('alice-decrypted').textContent = 'No message decrypted yet';
    document.getElementById('bob-decrypted').textContent = 'No message decrypted yet';
}