import React, { ReactNode } from 'react'
import TopNav from 'components/TopNav'
import Footer from 'components/Footer'

interface MainLayoutProps {
    children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <TopNav />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default MainLayout
