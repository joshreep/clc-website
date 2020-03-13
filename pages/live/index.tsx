import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const LiveStreamPage: NextPage<Props> = props => {
    return <div>Live Stream Page{JSON.stringify(props)}</div>
}

export default memo(LiveStreamPage)
