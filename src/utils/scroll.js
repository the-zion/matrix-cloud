export function scrollTo(location) {
    window.scrollTo({
        top: location || 0,
        behavior: "smooth"
    })
}

export function scrollToTop() {
    window.scrollTo({
        top: 0
    })
}