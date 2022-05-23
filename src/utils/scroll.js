export function scrollToTop() {
    window.scrollTo({
        top: 0
    })
}

export function scrollTo(location) {
    let e = document.getElementById(location)
    window.scrollTo({
        top: e.getBoundingClientRect().top + document.documentElement.scrollTop,
        behavior: "smooth"
    })
}
