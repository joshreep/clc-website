import { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const LiveStreamPage: NextPage<Props> = props => {
    return <div>Live Stream Page</div>
}

export default memo(LiveStreamPage)
