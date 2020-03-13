import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const MessagesPage: NextPage<Props> = props => {
    return <div>Messages Page{JSON.stringify(props)}</div>
}

export default memo(MessagesPage)
