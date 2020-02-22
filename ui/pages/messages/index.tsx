import { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const MessagesPage: NextPage<Props> = props => {
    return <div>Messages Page</div>
}

export default memo(MessagesPage)
