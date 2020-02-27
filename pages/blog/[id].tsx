import { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const BlogIndexPage: NextPage<Props> = props => {
    return <div>Blog Detail Page</div>
}

export default memo(BlogIndexPage)
