const isHrefLocal = (href?: string) => {
    if (!!href) {
        const result = /^(?:\/[\w-]+)+/is.test(href)
        return result
    }

    return false
}

export default isHrefLocal
