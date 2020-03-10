import App from 'next/app'
import Head from 'next/head'

import TopNav from 'components/TopNav'
import Footer from 'components/Footer'

import 'utilities/fontawesome'
import 'styles/app.scss'

class ClcApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <div className="app">
                <Head>
                    <link
                        rel="icon"
                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAOVBMVEVOmUdSmUxUmE9Wl1FMnERMnERMnER8hop8hotMnERMnERMnERMnERMnERMnERMnERMnERMnERMnUSsW4ZrAAAAE3RSTlMCABEGGylAM31WaH6PtqPF59T4FSYjJAAAAexJREFUGBkFwYcBgyAAADCCSGWP/49tEuB7ns/vB0+MPH6/8H0hIsD3PB+8bYyxzighPN/v+34Ifp/0fdFb59l77zP7mK/H9/OLgi/4UdYYPQZCzHWekfnx+wRfjF8cPa8WAIR+1it83y8F8fviyvW8APDMvmr8IcDMfUQAPIRRZ0MIqG32QD4JyBPPyqN4R+it7tGQ9q3gOR3SeVdeI8zTb8Oz7iwhod8M8sqjpRDTaNBuHbHe5L0D0OaIgjrgvSt3+SbjJp78EE8twrs7zJtHzDPIt5H3HkkZvQl9VLx3zvc5Qzj7ke9Jc+p59BDOyOh3ZPUW9RZx7/Terte1WjjnJe7zivuEcFbQbklnJ2XP1cM56Wn7Zuot6l3R2WPvHNK7zklh3bxq3cFzlnB2r8+dIQUtlzKT0MZ6tSXMW9W7ept3oo6Q+g5CXIV3l9FOb3fvtVvepcz+MDohr4VUkljybWkXUikRYUVCazcDlJvemwDUHQm99AHQj7YApL0fQu1xF8Doz64AYcyNEHcuOwKztP0AtDE6grzzHAGUdQsQ1VPvi0De83SgFECrp+wGAbHvUwBAPKveGfNLAKme03MAeM+ctwVvIgDyOWuPXvKbUl1rzxcQAPrYvbU+1zmjlwggALzpbWvfvVoCAH9ikBnTK8qB/gAAAABJRU5ErkJggg=="
                        sizes="32x32"
                    />
                    <link rel="icon" href="/icon.png" sizes="192x192" />
                    <title>Covenant Life Church</title>
                </Head>
                <TopNav />
                <main>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
        )
    }
}

export default ClcApp
