import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const WhatWeBelievePage: NextPage<Props> = props => {
    return <div>What We Believe Page{JSON.stringify(props)}</div>
}

export default memo(WhatWeBelievePage)
