import { memo } from 'react'
import Container from 'react-bootstrap/Container'

import 'styles/_footer.scss'

interface Props {}

const Footer = (props: Props) => {
    return (
        <footer>
            <Container className="my-5">Footer</Container>
        </footer>
    )
}

export default memo(Footer)
