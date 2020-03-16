const isHrefLocal = (href?: string) => !!href && /^(\/[\w-]*)*/.test(href)

export default isHrefLocal
