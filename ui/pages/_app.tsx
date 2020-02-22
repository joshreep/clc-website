import App from 'next/app'
import Head from 'next/head'

import TopNav from 'components/TopNav'

import 'styles/app.scss'

class ClcApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <Head>
                    <title>Covenant Life Church</title>
                </Head>
                <TopNav />
                <Component {...pageProps} />
            </>
        )
    }
}

export default ClcApp
