import React, { memo, useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import Carousel, { CarouselProps } from 'react-bootstrap/Carousel'

import Icon from './Icon'

import { HeroSlide } from 'types/Hero'

import 'styles/_hero.scss'
import isHrefLocal from 'utilities/isHrefLocal'
import Link from 'next/link'

const shouldShowControls = (singleHero: boolean, controlsProp: CarouselProps['controls']) => {
    if (singleHero) return false

    return controlsProp
}

const shouldShowIndicators = (singleHero: boolean, indicatorsProp: CarouselProps['indicators']) => {
    if (singleHero) return false

    return indicatorsProp
}

// const renderBackgroundImage = (img: HeroSlide['img']) => {
//     if (!img) return null

//     return <img src={img.src} alt={img.alt} className="d-block w-100" />
// }

const renderHeader = ({ header }: HeroSlide) => {
    if (!header) return null

    return <h2 className="display-4">{header}</h2>
}

const renderSubHeader = ({ subHeader }: HeroSlide) => {
    if (!subHeader) return null

    return <p>{subHeader}</p>
}

const renderButton = ({ button }: HeroSlide) => {
    if (!button) return null

    const { icon, label, ...props } = button

    const ButtonView = (
        <Button {...props}>
            {!!icon && <Icon icon={icon} fixedWidth />}
            {label}
        </Button>
    )

    if (!!props.href && isHrefLocal(props.href)) {
        return (
            <Link href={props.href} passHref>
                {ButtonView}
            </Link>
        )
    }

    return ButtonView
}

const getCaptionClassName = ({ position }: HeroSlide) => {
    const classNames = []

    if (position) {
        classNames.push(`text-${position}`)
    } else {
        classNames.push('text-center')
    }

    return classNames.join(' ')
}

interface Props extends CarouselProps {
    textAlign?: 'left' | 'center' | 'right'
    slides: HeroSlide[]
    height: string | number
}

const Hero = ({ controls = false, indicators = false, slides, textAlign = 'center', ...props }: Props) => {
    const singleHero = slides.length === 1

    const memoControls = useMemo(() => shouldShowControls(singleHero, controls), [singleHero, controls])

    const memoIndicators = useMemo(() => shouldShowIndicators(singleHero, indicators), [singleHero, indicators])

    if (!slides.length) return null

    return (
        <Carousel {...props} controls={memoControls} indicators={memoIndicators} style={{ height: props.height }}>
            {slides.map((slide, index) => (
                <Carousel.Item
                    key={`${slide.header}_${index}`}
                    style={{
                        backgroundImage: `url("${slide.img?.src}")`,
                        backgroundPositionX: slide.img?.xPosition + '%',
                        backgroundPositionY: slide.img?.yPosition + '%'
                    }}
                    className={slide.filter ? 'filter' : undefined}
                >
                    {/* {renderBackgroundImage(slide.img)} */}
                    <Carousel.Caption className={getCaptionClassName(slide)}>
                        {renderHeader(slide)}
                        {renderSubHeader(slide)}
                        {renderButton(slide)}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default memo(Hero)
