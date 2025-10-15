document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    const displayMessage = (message, isSuccess) => {
        formMessage.textContent = message;
        formMessage.className = 'mt-4 text-center text-lg font-semibold ';
        if (isSuccess) {
            formMessage.classList.add('text-green-500');
        } else {
            formMessage.classList.add('text-red-500');
        }
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'mt-4 text-center text-lg font-semibold';
        }, 5000); // Message disappears after 5 seconds
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => (data[key] = value));

            try {
                const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:CfCVZiDW/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    displayMessage('Message sent successfully!', true);
                    contactForm.reset();
                } else {
                    displayMessage('Failed to send message. Please try again later.', false);
                }
            } catch (error) {
                console.error('Error:', error);
                displayMessage('An error occurred. Please try again later.', false);
            }
        });
    }
});