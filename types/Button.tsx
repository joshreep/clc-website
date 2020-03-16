import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { ButtonProps } from 'react-bootstrap/Button'

export interface Button extends ButtonProps {
    label: string
    icon?: IconProp
}
