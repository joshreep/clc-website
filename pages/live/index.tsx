import React, { memo } from 'react'
import { NextPage } from 'next'
import Container from 'react-bootstrap/Container'

interface Props {}

const LiveStreamPage: NextPage<Props> = props => {
    return (
        <Container className="my-5" as="article">
            <h1>
                <span className="bordered">Live Stream</span>
            </h1>
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                <iframe
                    src="https://vimeo.com/event/15393/embed"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
            </div>
        </Container>
    )
}

export default memo(LiveStreamPage)
