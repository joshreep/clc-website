import React, { memo } from 'react'
import { NextPage } from 'next'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import BigIconLink from 'components/BigIconLink'
import Hero from 'components/Hero'

import { HeroSlide } from 'types/Hero'

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

interface Props {}

const Index: NextPage<Props> = ({}) => {
    return (
        <>
            <Hero slides={slides} interval={5000} fade height="400px" textAlign={'center'} />
            <Container className="my-5 text-center">
                <Row>
                    <Col sm="4" className="my-4">
                        <div className="d-flex justify-content-center">
                            <BigIconLink color="yellow" href="/about/new-here" icon="home" />
                        </div>
                        <h4>NEW?</h4>
                        <p>Welcome! And we look forward to meeting you soon.</p>
                    </Col>
                    <Col sm="4" className="my-4">
                        <div className="d-flex justify-content-center">
                            <BigIconLink color="green" href="/about/home-group" icon="users" />
                        </div>
                        <h4>Small Groups</h4>
                        <p>We would love for you to join our small groups. Find more info here!</p>
                    </Col>
                    <Col sm="4" className="my-4">
                        <div className="d-flex justify-content-center">
                            <BigIconLink color="cyan" href="/messages" icon="book" />
                        </div>
                        <h4>Sunday Message</h4>
                        <p>Missed a week? Or maybe you just want a refresher. Either way, you can find them here!</p>
                    </Col>
                </Row>
            </Container>
            <div className="bg-yellow text-white">
                <Container className="py-5">
                    <Row>
                        <Col sm="12">
                            <h2 className="h1 text-center text-uppercase font-weight-bold mb-4">God&apos;s Pursuit</h2>
                        </Col>
                        <Col md="6" className="d-flex align-items-center">
                            <h3 className="display-4 text-md-right">
                                Sometimes God can seem so far from everyday life, almost untouchable
                            </h3>
                        </Col>
                        <Col md="6" className="d-flex align-items-center">
                            <p>
                                That is where Jesus comes in. He is God with skin on, who walked among us and showed us
                                what God is like. One of the first followers of Jesus, a young man named John, confirmed
                                this when he wrote that Jesus &ldquo;became flesh and blood, and moved into the
                                neighborhood. We saw the glory with our own eyes, the one-of-a-kind glory, like Father,
                                like Son, generous inside and out, true from start to finish.&rdquo; (Jn 1:14, The
                                Message). God who seemed just too far away, bridged the gap between us and Him, became a
                                man so that we could become His children. His mission towards us broke down all the
                                barriers and now it’s possible to pursue Him, because He first pursued us. We are a
                                community of people pursuing the &ldquo;now approachable&rdquo; God in heaven, by
                                following Jesus here on earth. We are far from perfect, but we’re giving ourselves to
                                all that Jesus said and did and learning to live life on His terms, committed to His
                                ways.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default memo(Index)
