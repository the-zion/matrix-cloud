import xss from 'xss'

export function xssFilter(string) {
    return xss(string);
}