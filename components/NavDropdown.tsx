import React, { useState, ReactNode } from 'react'

import BSNavDropdown from 'react-bootstrap/NavDropdown'

import useDebounce from 'hooks/useDebounce'

interface Props {
    href?: string
    id: string
    title: string
    children: ReactNode
}

const NavDropdown = ({ children, id, title }: Props) => {
    const [show, setShow] = useState(false)
    const debouncedShow = useDebounce(show, 250)

    return (
        <BSNavDropdown
            id={id}
            title={title}
            show={show || debouncedShow}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
        </BSNavDropdown>
    )
}

NavDropdown.Item = BSNavDropdown.Item
NavDropdown.Divider = BSNavDropdown.Divider

export default NavDropdown
