"use client"
import { Card } from '@/components/ui/card';
import { AVATAR_MALE } from '@/config/image';
import { Separator } from '@radix-ui/react-separator';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { DecoratorCollectionData } from '../type';
import { safeLoadAvatar } from '@/lib/client_side';
import { Button } from '@/components/ui/button';
import useModalState from '@/hooks/useModalState';

interface DecoratorCardProps {
    decorator: DecoratorCollectionData
}
const DecoratorCard = ({ decorator }: DecoratorCardProps) => {

    const photoUrl = decorator.photoUrl ? safeLoadAvatar({ path: decorator.photoUrl, gender: "Male" }) : AVATAR_MALE;
    const { openModal } = useModalState();

    const openDetailModal = () => {
        openModal({
            title: decorator.name,
            component: ShowMoreView,
            payload: decorator,



        })
    }

    return (
        <Card className='p-1 relative overflow-hidden w-full mx-auto group'>
            <figure className='relative w-full h-auto sm:h-[500px] rounded-lg overflow-hidden py-1'>
                <div className='h-[8rem] w-full sm:h-[20rem] sm:w-[95%] mx-auto rounded-lg overflow-hidden'>
                    <Image src={photoUrl} alt={decorator.name} width={500} height={500} className='object-cover object-center h-full w-full mx-auto rounded-lg  group-hover:scale-125 transition-all duration-1000 ease-in-out' />

                </div>
                <figcaption className='py-3 static sm:absolute bottom-0 left-0 right-0   w-full mx-auto px-4 flex flex-col gap-3 justify-between'>
                    <div>
                        <h3 className='text-xs sm:text-lg font-semibold truncate'>{decorator.name}</h3>

                    </div>


                </figcaption>

            </figure>

            <Button type="button" className='w-full text-xs' onClick={openDetailModal} >
                Détails
            </Button>
        </Card>
    )
}

export default DecoratorCard




export const ShowMoreView = () => {

    const { payload, closeModal } = useModalState();
    const decorator = payload as DecoratorCollectionData;


    return (
        <div className='text-xs flex flex-col gap-5'>
            <div className='text-center'>
                <p className='text-xs md:text-base text-muted-foreground'>{decorator.speciality}</p>
            </div>

            <div className='flex flex-col items-center justify-evenly bg-secondary p-2 rounded-lg'>
                <div className='flex flex-col items-center'>
                    <p className='text-xs md:text-base text-muted-foreground '>Experiences</p>
                    <p className='text-xs font-semibold'>{decorator.experience}</p>

                </div>
                <Separator orientation='vertical' className='h-4 w-0.5 bg-secondary' />
                <div className='flex flex-col items-center'>
                    <p className='text-xs md:text-base text-muted-foreground '>Temp de creation</p>
                    <p className='text-xs font-semibold'>{decorator.averageTime}</p>

                </div>
            </div>

            <div className='py-3 flex flex-col sm:flex-row items-center gap-2 justify-between'>

                <p className='text-sm text-muted-foreground flex gap-2 items-center'><Phone className='size-3' />{decorator.phone}</p>
                <p className='text-sm text-muted-foreground flex gap-2 items-center'><Mail className='size-3' />{decorator.email}</p>
            </div>
        </div>
    )
}