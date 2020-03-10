import { memo } from 'react'
import Icon from './Icon'

interface Props {
    showIcon?: boolean
    fixedWidth?: boolean
}

const PhoneNumber = ({ showIcon = false, fixedWidth = false }: Props) => {
    return (
        <a className="phone-number" href="tel:6782448911">
            {showIcon && <Icon icon="phone" className="text-info" fixedWidth={fixedWidth} />}
            (678) 244-8911
        </a>
    )
}

export default memo(PhoneNumber)
