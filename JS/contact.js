document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            statusDiv.textContent = 'Sending message...';
            statusDiv.style.color = '#66fcf1';

            const payload = {
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            };

            try {
                const res = await fetch('/api/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();

                if (res.ok && result.success) {
                    statusDiv.textContent = 'Message sent successfully!';
                    statusDiv.style.color = '#45a29e';
                    form.reset();
                } else {
                    throw new Error(result.error || 'Failed to send message');
                }
            } catch (err) {
                statusDiv.textContent = err.message;
                statusDiv.style.color = '#ff6b6b';
            }
        });
    }
});