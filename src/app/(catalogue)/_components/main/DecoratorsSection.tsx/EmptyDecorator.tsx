import { Card, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'
import React from 'react'

const EmptyDecorator = () => {
    return (
        <div className='col-span-full  py-12 px-6'>
            <Card >
                <CardContent>
                    <div className="my-6 flex justify-center">
                        <div className="p-3 border border-slate-400 bg-slate-200 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                        <p className="text-xl font-semibold text-slate-800 mb-2">Aucun Decorateur Disponible</p>

                        <p className="text-slate-600 mb-6">
                            Il n'y a actuellement aucun decorateur disponible. Revenez bientôt pour de
                            nouvelles annonces !
                        </p>
                    </div>
                </CardContent>            </Card>
        </div>
    )
}

export default EmptyDecorator