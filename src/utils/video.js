export function customCheckVideoFn(src) {
    if (!src) {
        return
    }
    if (src.indexOf('http') !== 0) {
        return '视频地址必须以 http/https 开头'
    }
    return true
}

export function customParseVideoSrc(src) {
    if (src.includes('www.bilibili.com')) {
        src = src.split('/').pop()
        const vid = src.split('?')[0]
        return `<iframe style="width: 100%" src="//player.bilibili.com/player.html?bvid=${vid}" scrolling="no" border="10" frameBorder="no" framespacing="0" allowfullscreen> </iframe>`
    }
    else if (src.includes('youtu.be')){
        const vid = src.split('/').pop()
        return `<iframe width="1560" height="315" src="https://www.youtube.com/embed/${vid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
    else if(src.includes('v.qq.com')){
        src = src.split('/').pop()
        const vid = src.split('.')[0]
        return `<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=${vid}" allowFullScreen="true"></iframe>`
    }
    else if(src.includes('www.ixigua.com')){
        const vid = src.split('/').pop()
        return `<iframe width="720" height="405" frameborder="0" src="https://www.ixigua.com/iframe/${vid}?autoplay=0" referrerpolicy="unsafe-url" allowfullscreen></iframe>`
    }
    else if(src.includes('v.youku.com')){
        src = src.split('id_').pop()
        const vid = src.split('.')[0]
        return `<iframe height=498 width=510 src='https://player.youku.com/embed/${vid}' frameborder=0 allowfullscreen></iframe>`
    }
    return src
}