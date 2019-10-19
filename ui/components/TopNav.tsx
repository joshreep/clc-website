import { memo } from 'react'
import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'

interface Props {}

const TopNav = (props: Props) => {
    return (
        <Navbar bg="light">
            <Link href="/" passHref>
                <Navbar.Brand>
                    <Image src="/static/logo-full.png" height="30" alt="Covenant Life Church Logo" className="d-inline-block align-top" />
                </Navbar.Brand>
            </Link>
        </Navbar>
    )
}

export default memo(TopNav)
