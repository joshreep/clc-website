import { memo } from 'react'
import Link from 'next/link'

import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import NavDropdown from './NavDropdown'

const TopNav = () => {
    return (
        <Navbar bg="light">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand>
                        <Image
                            src="/logo-full.png"
                            height="50"
                            alt="Covenant Life Church Logo"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown id="nav-about-us" title="About Us" href="/about">
                        <Link href="/about" passHref>
                            <NavDropdown.Item>About Us</NavDropdown.Item>
                        </Link>
                        <NavDropdown.Divider />
                        <Link href="/about/sundays" passHref>
                            <NavDropdown.Item>Sunday Gatherings</NavDropdown.Item>
                        </Link>
                        <Link href="/about/what-we-believe" passHref>
                            <NavDropdown.Item>Statement Of Faith</NavDropdown.Item>
                        </Link>
                        <Link href="/about/home-group" passHref>
                            <NavDropdown.Item>Small Groups</NavDropdown.Item>
                        </Link>
                        <Link href="/about/new-here" passHref>
                            <NavDropdown.Item>New Here?</NavDropdown.Item>
                        </Link>
                    </NavDropdown>
                    <Link href="/messages" passHref>
                        <Nav.Link>Messages</Nav.Link>
                    </Link>
                    <Nav.Link href="https://tithe.ly/give_new/www/#/tithely/give-one-time/26957">Give</Nav.Link>
                    <Nav.Link href="https://covenantlifeonline.elvanto.net/login">Members</Nav.Link>
                    <Link href="/live" passHref>
                        <Nav.Link>Live</Nav.Link>
                    </Link>
                    <Link href="/camp" passHref>
                        <Nav.Link>Kids Camp</Nav.Link>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default memo(TopNav)
