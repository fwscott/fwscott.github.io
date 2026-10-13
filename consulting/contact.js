document.querySelectorAll('.contact-form').forEach((form) => {
    const status = form.querySelector('.form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonLabel = submitButton.textContent;

    function showStatus(state, message) {
        status.dataset.state = state;
        status.textContent = message;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (submitButton.disabled) return;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
        showStatus('', '');
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(form)
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showStatus('sent', 'Sent. I’ll reply by email within one business day.');
                form.reset();
                if (typeof gtag === 'function') {
                    gtag('event', 'generate_lead', { form_id: form.id });
                }
            } else {
                showStatus('error', 'Your message didn’t send. Wait a moment and try again.');
            }
        } catch (err) {
            showStatus('error', 'Your message didn’t send. Check your connection and try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = buttonLabel;
        }
    });
});
