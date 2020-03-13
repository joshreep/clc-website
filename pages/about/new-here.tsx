import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const NewHerePage: NextPage<Props> = props => {
    return <div>New Here Page{JSON.stringify(props)}</div>
}

export default memo(NewHerePage)
