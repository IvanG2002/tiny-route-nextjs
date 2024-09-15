import { BugPlayIcon } from 'lucide-react'
import React from 'react'

function SubHeader() {
    return (
        <div className='sub__header'>
            <div className='flex items-center justify-center gap-3'>
                <BugPlayIcon></BugPlayIcon>
                <p className="text-sm">
                    Welcome to the TinyRoute beta. If you detect any problem or bug, feel free to <span className='issue'>create an issue</span> on Github.
                </p>
            </div>
        </div>
    )
}

export default SubHeader