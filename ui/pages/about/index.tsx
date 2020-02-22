import { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const AboutPage: NextPage<Props> = props => {
    return <div>About Page</div>
}

export default memo(AboutPage)
