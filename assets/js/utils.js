let lastScrollY = 0;

export function openModal(modalElement) {
    lastScrollY = window.scrollY;
    document.body.classList.add('modal-open');
    // Calculate scrollbar width to prevent content reflow
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    modalElement.classList.remove('hidden');
}

export function closeModal(modalElement) {
    modalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = ''; // Reset padding
    window.scrollTo(0, lastScrollY);
}
