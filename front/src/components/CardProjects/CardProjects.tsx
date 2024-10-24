import Link from 'next/link'
import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import { FaPlay } from 'react-icons/fa'
import { CardProjectsType } from '@/app/type'
export default function CardProjects({ data }: { data: CardProjectsType }) {
    return (
        data.map((i, index) => (
            <div key={index}>
                <Link href={i.url} className="relative group">
                    <ImgTag
                        fiureClass="relative w-full overflow-hidden rounded-md"
                        alt={"نمونه پروژه"}
                        src={i.src}
                        width={500}
                        height={350}
                        classPlus="hover-project"
                    />
                    <i className="p-5 text-white group-hover:opacity-100 transition-all opacity-0 rounded-full backdrop-blur-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <FaPlay className='text-xl'/>
                    </i>
                </Link>
                <div className="flex flex-col gap-2 mt-3">
                    <div>
                        <Link href={i.url} className="inline-block">
                            <span className="hover:text-blue-400">{i.title}</span>
                        </Link>
                    </div>
                    <span className="text-sm text-gray-700">{i.address}</span>
                </div>
            </div>
        ))
    )
}