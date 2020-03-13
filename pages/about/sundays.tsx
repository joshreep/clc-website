import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const SundaysPage: NextPage<Props> = props => {
    return <div>Sundays Page{JSON.stringify(props)}</div>
}

export default memo(SundaysPage)
