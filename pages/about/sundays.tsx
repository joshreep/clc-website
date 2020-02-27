import { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const SundaysPage: NextPage<Props> = props => {
    return <div>Sundays Page</div>
}

export default memo(SundaysPage)
