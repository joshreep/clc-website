import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const HomeGroupPage: NextPage<Props> = props => {
    return <div>Home Group Page{JSON.stringify(props)}</div>
}

export default memo(HomeGroupPage)
