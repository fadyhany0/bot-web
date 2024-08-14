document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const number = document.getElementById('number').value;
    const message = document.getElementById('message').value;

    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number, message })
    })
    .then(response => response.json())
    .then(data => {
        const responseMessage = document.getElementById('responseMessage');
        if (data.success) {
            responseMessage.textContent = 'Message sent successfully!';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.textContent = 'Failed to send message.';
            responseMessage.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').textContent = 'Error sending message.';
    });
});
