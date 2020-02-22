import { memo } from 'react'
import { NextPage } from 'next'

interface Props {}

const NewHerePage: NextPage<Props> = props => {
    return <div>New Here Page</div>
}

export default memo(NewHerePage)
