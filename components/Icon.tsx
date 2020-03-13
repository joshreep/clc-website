import React, { memo } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface Props extends FontAwesomeIconProps {}

const Icon = (props: Props) => {
    return <FontAwesomeIcon {...props} />
}

export default memo(Icon)
