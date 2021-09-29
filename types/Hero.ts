import { BackgroundImage } from './Image'
import { Button } from './Button'

export interface HeroSlide {
    button?: Button
    filter?: boolean
    header?: string
    img?: BackgroundImage
    position?: 'left' | 'center' | 'right'
    subHeader?: string
}
