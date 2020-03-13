import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const BlogIndexPage: NextPage<Props> = props => {
    return <div>Blog Detail Page{JSON.stringify(props)}</div>
}

export default memo(BlogIndexPage)
