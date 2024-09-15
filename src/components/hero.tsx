import { motion } from 'framer-motion'
import Link from 'next/link'
import { Link as Slug } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

function Hero() {
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className='flex flex-col mb-auto m-16 gap-5'>
                <motion.div initial={{ y: "20px" }} animate={{ y: 0 }} transition={{ ease: "linear", duration: 0.2 }} className="text-4xl font-bold lg:text-6xl text-center">
                    Organize and Optimize Your Links</motion.div>
                <motion.div className="text-xs lg:text-lg text-center">TinyRoute is a user-friendly, open-source platform for creating, managing,
                    and sharing compact links. It’s quick, secure, and optimized for seamless navigation.</motion.div>
                <div className='flex gap-2 lg:items-center lg:justify-center'>
                    <Link href="/dashboard">
                        <Button>
                            <Slug className="h-5 w-5 mr-3" />
                            <span>Get Started</span>
                        </Button>
                    </Link>
                    <Link href="https://github.com/IvanG2002/TinyRoute" target="_blank">
                        <Button variant={'outline'}>
                            <GitHubLogoIcon className="h-5 w-5 mr-3" />
                            <span>Star on Github</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Hero