import { Button } from '@/components/ui/button'
import useModalState from '@/hooks/useModalState';
import { Plus } from 'lucide-react'
import React from 'react'
import AddDecorator from '../modal/AddDecorator';


const AddDecoratorButton = () => {
    const { openModal } = useModalState();

    const handleClickAddDecorator = () => {
        openModal({
            title: "Ajouter un decorateur",
            description: "Ajouter un nouveau decorateur",
            component: AddDecorator
        });
    }
    return (
        <Button type='button' onClick={handleClickAddDecorator}><Plus className='h-4 w-4 mr-1' /> Ajouter un decorateur</Button>
    )
}

export default AddDecoratorButton