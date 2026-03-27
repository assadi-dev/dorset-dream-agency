import React from 'react'
import { DecoratorData } from '../type';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { AVATAR_MALE } from '@/config/image';
import { Mail, PhoneCall } from 'lucide-react';

type DecoratorProfilItemCardProps = {
    decorator: DecoratorData;
};
const DecoratorProfilItemCard = ({ decorator }: DecoratorProfilItemCardProps) => {

    const UNKNOWN_IMAGE = AVATAR_MALE;
    const photoUrl = /* decorator.photoUrl ?? */ UNKNOWN_IMAGE;
    //const CLEAN_DATE = datetimeFormatFr(client.createdAt);

    return (
        <Card className='p-0 bg-primary w-[18rem] mx-auto gap-2'>
            <figure>
                <div className='relative h-[18rem] w-[18rem] p-3 rounded-lg overflow-hidden mx-auto'>
                    <Image src={photoUrl} alt={decorator.name} width={300} height={300} className='w-full h-full object-cover object-center rounded-lg' />
                </div>
                <figcaption className='px-2 pb-2'>
                    <div className='py-3 px-3 text-white  flex flex-col gap-2'>
                        <p className="text-sm lg:text-lg font-bold max-w-[80%] text-nowrap text-ellipsis overflow-hidden mb-1 truncate max-w-3/4">
                            {decorator.name}
                        </p>
                        <p className='text-xs  font-semibold border border-white rounded-lg p-1 px-2 w-fit'>Specialité</p>
                    </div>
                    <div className='px-4 py-2 text-white p-2 rounded-lg bg-green-950 shadow-inner shadow-white/65 backdrop-blur-lg'>

                        <div>

                            <p className="flex items-center gap-2 text-xs text-muted max-w-[80%] text-nowrap text-ellipsis overflow-hidden mb-1 truncate max-w-3/4">
                                <Mail className="h-3 w-3" /> {decorator.email}
                            </p>
                            <p className="flex items-center gap-2 text-xs text-muted max-w-[80%] text-nowrap text-ellipsis overflow-hidden mb-1 truncate max-w-3/4">
                                <PhoneCall className="h-3 w-3" /> {decorator.phone}
                            </p>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </Card>
    )
}

export default DecoratorProfilItemCard