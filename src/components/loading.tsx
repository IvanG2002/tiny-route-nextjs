import { LoaderIcon } from "lucide-react"

function Loading() {
    return (
        <div className='flex gap-1 flex-col items-center justify-center w-full'>
            <LoaderIcon className="h-4 w-4 animate-spin"></LoaderIcon>
            <span>Loading...</span>
        </div>
    )
}

export default Loading