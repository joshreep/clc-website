import React, { memo } from 'react'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

import Link from 'components/Link'
import Icon from 'components/Icon'

interface Props {
    color: 'yellow' | 'green' | 'cyan'
    href?: string
    icon: FontAwesomeIconProps['icon']
}

const BigIconLink = ({ color, href, icon }: Props) => {
    return (
        <Link href={href}>
            <a className={`text-${color} border-${color} icon-circle-link`}>
                <Icon icon={icon} size="3x" />
            </a>
        </Link>
    )
}

export default memo(BigIconLink)
