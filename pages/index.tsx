import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const Index: NextPage<Props> = props => {
    return <div>Hello World</div>
}

export default memo(Index)
