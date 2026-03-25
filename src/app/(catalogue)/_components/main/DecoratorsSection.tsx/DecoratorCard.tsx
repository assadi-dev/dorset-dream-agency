"use client"
import { Card } from '@/components/ui/card';
import { AVATAR_MALE } from '@/config/image';
import { Separator } from '@radix-ui/react-separator';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { DecoratorCollectionData } from './type';
import { safeLoadAvatar } from '@/lib/client_side';

interface DecoratorCardProps {
    decorator: DecoratorCollectionData
}
const DecoratorCard = ({ decorator }: DecoratorCardProps) => {

    const photoUrl = decorator.photoUrl ? safeLoadAvatar({ path: decorator.photoUrl, gender: "Male" }) : AVATAR_MALE;

    return (
        <Card className='p-1 relative overflow-hidden w-full mx-auto group'>
            <figure className='relative w-full h-[522px] rounded-lg overflow-hidden py-1'>
                <div className='h-[20rem] w-[95%] mx-auto rounded-lg overflow-hidden'>
                    <Image src={photoUrl} alt={decorator.name} width={500} height={500} className='object-cover object-center h-full w-full mx-auto rounded-lg  group-hover:scale-125 transition-all duration-1000 ease-in-out' />

                </div>
                <figcaption className='absolute bottom-0 left-0 right-0   w-full mx-auto px-4 flex flex-col gap-3 justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold'>{decorator.name}</h3>
                        <p className='text-xs text-muted-foreground '>{decorator.speciality}</p>
                    </div>
                    <div className='flex items-center justify-evenly bg-secondary p-2 rounded-lg shadow my-3'>
                        <div className='flex flex-col items-center'>
                            <strong>{decorator.experience}</strong>
                            <p className='text-xs text-muted-foreground '>Experiences</p>
                        </div>
                        <Separator orientation='vertical' className='h-8 w-0.5 rounded-full bg-slate-300' />
                        <div className='flex flex-col items-center'>
                            <strong>{decorator.averageTime}</strong>
                            <p className='text-xs text-muted-foreground '>Temp de creation</p>
                        </div>
                    </div>

                    <div className='py-3 flex items-center gap-2 justify-between'>

                        <p className='text-sm text-muted-foreground flex gap-2 items-center'><Phone className='w-3 h-3' />{decorator.phone}</p>
                        <p className='text-sm text-muted-foreground flex gap-2 items-center'><Mail className='w-3 h-3' />{decorator.email}</p>
                    </div>

                </figcaption>

            </figure>

        </Card>
    )
}

export default DecoratorCard