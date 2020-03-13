import React, { memo } from 'react'
import Container from 'react-bootstrap/Container'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Icon from 'components/Icon'

import 'styles/_footer.scss'
import PhoneNumber from './PhoneNumber'

type SocialAccount = {
    icon: IconName
    url: string
}

const socialAccounts: SocialAccount[] = [
    { icon: 'facebook', url: 'https://www.facebook.com/CovenantLifeChurchGwinnett/' },
    { icon: 'twitter', url: 'https://twitter.com/CLCgwinnett' },
    { icon: 'instagram', url: 'https://www.instagram.com/covenant.life.church/' }
]

const Footer = () => {
    return (
        <footer>
            <div className="contact">
                <Container className="mt-5 mb-4">
                    <Row>
                        <Col md="9" sm="8" as="address">
                            <h4>Contact</h4>
                            <ul>
                                <li>
                                    <Icon fixedWidth icon="map-marker-alt" className="text-danger" />{' '}
                                    Lawrenceville-Suwanee Rd. Lawrenceville, GA 30043
                                </li>
                                <li>
                                    <a href="mailto:info@covenant.life">
                                        <Icon fixedWidth icon="envelope" className="text-success" /> info@covenant.life
                                    </a>
                                </li>
                                <li>
                                    <PhoneNumber showIcon fixedWidth />
                                </li>
                            </ul>
                        </Col>
                        <Col md="3" sm="4" as="nav">
                            <h4>Connect</h4>
                            <ul className="social">
                                {socialAccounts.map((account, index) => (
                                    <li key={`${account.icon}_${index}`}>
                                        <a href={account.url} target="_blank" rel="noopener noreferrer">
                                            <Icon
                                                icon={{ iconName: account.icon, prefix: 'fab' }}
                                                size="2x"
                                                className={`text-${account.icon}`}
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        </footer>
    )
}

export default memo(Footer)
