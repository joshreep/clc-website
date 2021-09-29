import React, { memo } from 'react'
import { NextPage } from 'next'
import MainLayout from 'layout/MainLayout'

interface Props {}

const HomeGroupPage: NextPage<Props> = (props) => {
    return <MainLayout>Home Group Page{JSON.stringify(props)}</MainLayout>
}

export default memo(HomeGroupPage)
