import React, { memo } from 'react'
import { NextPage } from 'next'

import Hero from 'components/Hero'
import { HeroSlide } from 'types/Hero'

interface Props {}

const slides: HeroSlide[] = [
    {
        header: 'Life Together',
        subHeader: 'is a whole lot better',
        img: { src: '/hero/james_and_girl.jpg', xPosition: 50, yPosition: 30 },
        position: 'center',
        button: { label: 'Learn More', variant: 'warning', href: '/about' },
        filter: true
    },
    {
        header: 'Life Together',
        subHeader: 'is a whole lot better',
        img: { src: '/hero/camp_overcomers.jpg', xPosition: 15, yPosition: 15 },
        position: 'center',
        button: { label: 'Learn More', variant: 'warning', href: '/about' },
        filter: true
    },
    {
        header: 'Life Together',
        subHeader: 'is a whole lot better',
        img: { src: '/hero/costa_rica.jpg', xPosition: 57, yPosition: 25 },
        position: 'center',
        button: { label: 'Learn More', variant: 'warning', href: '/about' },
        filter: true
    }
]

const Index: NextPage<Props> = props => {
    return (
        <>
            <Hero slides={slides} interval={5000} fade height="400px" textAlign={'center'} />
        </>
    )
}

export default memo(Index)
