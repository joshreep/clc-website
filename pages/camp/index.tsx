import React, { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const CampPage: NextPage<Props> = props => {
    return <div>Camp Page{JSON.stringify(props)}</div>
}

export default memo(CampPage)
