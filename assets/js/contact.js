export function initializeContactForm() {
    const form = document.getElementById('telegram-contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Replace 'YOUR_TELEGRAM_USERNAME' with the actual Telegram username
            // If the user has a bot, this would be more complex and require a backend.
            // For a direct message, a username is sufficient.
            const telegramUsername = 'YOUR_TELEGRAM_USERNAME'; 

            const fullMessage = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(fullMessage)}`;

            window.open(telegramUrl, '_blank');

            // Optionally, clear the form or show a success message
            form.reset();
            alert('Opening Telegram to send your message!');
        });
    }
}

