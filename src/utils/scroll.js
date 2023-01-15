let delayMethod = null

function handleScroll(fn) {
    return function () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        let sum = Math.floor(scrollTop + clientHeight)
        if (sum === scrollHeight) {
            fn()
        }
    }
}

export function throttle(callback, delay) {
    let pre = 0
    return function () {
        const current = Date.now()
        if (current - pre > delay) {
            callback.call(this)
            pre = current
        }
    }
}

export function scrollToTop() {
    window.scrollTo({
        top: 0
    })
}

export function scrollTo(location) {
    let e = document.getElementById(location)
    if (!e) {
        return
    }
    window.scrollTo({
        top: e.getBoundingClientRect().top + document.documentElement.scrollTop,
        behavior: "smooth"
    })
}

export function scrollToContainer(container, location) {
    let c = document.getElementById(container)
    let e = document.getElementById(location)
    if (!c || !e) {
        return
    }
    c.scrollTo({
        top: e.getBoundingClientRect().top  - c.getBoundingClientRect().top + c.scrollTop,
        behavior: "smooth"
    })
}

export function scrollToBottomListen(fn) {
    delayMethod = throttle(handleScroll(fn), 10)
    window.addEventListener('scroll', delayMethod);
}

export function removeScrollToBottomListen() {
    window.removeEventListener('scroll', delayMethod);
}
