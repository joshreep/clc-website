import App from 'next/app'
import TopNav from 'components/TopNav'

import 'styles/app.scss'

class ClcApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <TopNav />
                <Component {...pageProps} />
            </>
        )
    }
}

export default ClcApp
