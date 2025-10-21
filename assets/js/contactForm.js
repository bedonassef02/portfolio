export function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

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

    const showError = (input, errorElement, message) => {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        input.classList.add('border-red-500'); // Highlight input with red border
        input.classList.remove('focus:border-[#007bff]', 'focus:ring-[#007bff]');
    };

    const clearError = (input, errorElement) => {
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
        input.classList.remove('border-red-500');
        input.classList.add('focus:border-[#007bff]', 'focus:ring-[#007bff]');
    };

    // Add input event listeners to clear errors as user types
    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    messageInput.addEventListener('input', () => clearError(messageInput, messageError));

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default HTML form submission

            // Clear all previous errors
            clearError(nameInput, nameError);
            clearError(emailInput, emailError);
            clearError(messageInput, messageError);
            formMessage.textContent = ''; // Clear general form message

            let isValid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Name is required.');
                isValid = false;
            }
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email is required.');
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
                showError(emailInput, emailError, 'Please enter a valid email address.');
                isValid = false;
            }
            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Message is required.');
                isValid = false;
            }

            if (!isValid) {
                displayMessage('Please fill in all required fields correctly.', false);
                return; // Stop submission if validation fails
            }

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
}