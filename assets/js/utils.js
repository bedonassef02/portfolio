let lastScrollY = 0;

export function openModal(modalElement) {
    lastScrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lastScrollY}px`;
    document.body.style.width = '100%';
    modalElement.classList.remove('hidden');
}

export function closeModal(modalElement) {
    modalElement.classList.add('hidden');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lastScrollY);
}
