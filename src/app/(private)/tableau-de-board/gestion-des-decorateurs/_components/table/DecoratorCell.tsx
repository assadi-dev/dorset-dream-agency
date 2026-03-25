import React from 'react'
import { DecoratorData } from '../../type';
import { AVATAR_MALE } from '@/config/image';
import Image from 'next/image';

type DecoratorCellProps = {
    decorator: DecoratorData;
}

const DecoratorCell = ({ decorator }: DecoratorCellProps) => {

    const UNKNOWN_IMAGE = AVATAR_MALE;
    const photoUrl = /* decorator.photoUrl ?? */ UNKNOWN_IMAGE;
    //const CLEAN_DATE = datetimeFormatFr(client.createdAt);
    return (
        <div className='flex items-center gap-3 py-3'>
            <div className='relative h-10 w-10 rounded-full overflow-hidden border'>
                <Image src={photoUrl} alt={decorator.name ?? "Decorateur photo"} width={40} height={40} className='w-full h-full object-cover object-center rounded-full' />
            </div>
            <p className='text-sm font-semibold'>{decorator.name}</p>
        </div>
    )
}

export default DecoratorCell