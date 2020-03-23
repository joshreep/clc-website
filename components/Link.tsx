import React, { ReactChildren, DetailedHTMLProps, AnchorHTMLAttributes } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import isHrefLocal from 'utilities/isHrefLocal'

interface NLinkProps extends NextLinkProps {
    children: ReactChildren
}

interface AnchorProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export type LinkProps = NLinkProps | AnchorProps

const propsAreLinkProps = (props: LinkProps): props is NLinkProps => {
    return (
        ['string', 'object'].includes(typeof props.href) ||
        (typeof props.href === 'string' && isHrefLocal(props.href)) ||
        'as' in props ||
        'replace' in props ||
        'scroll' in props ||
        'shallow' in props ||
        'passHref' in props ||
        'prefetch' in props
    )
}

const Link = (props: LinkProps) => {
    if (propsAreLinkProps(props)) {
        const { children, ...linkProps } = props

        return <NextLink {...linkProps}>{children}</NextLink>
    }

    return <a {...props}>{props.children}</a>
}

export default Link
