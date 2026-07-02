import { ToastErrorSonner } from '@/components/notify/Sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleAlert, Image, ImagePlus, Upload, X } from 'lucide-react';
import React from 'react'
import { useDropzone } from 'react-dropzone';
import { Control, useController } from 'react-hook-form';
import { DecoratorFormType } from '../schema';


const MAX_FILE_SIZE = 500 * 1024; // 500 KB

type UploadState = {
    preview?: string | null;
    file?: File | null;

};
type UploadPhotoProps = {
    control: Control<DecoratorFormType>;
    name: keyof DecoratorFormType;
}
const UploadPhoto = ({ control, name }: UploadPhotoProps) => {

    const [state, setState] = React.useReducer((prev: UploadState, next: any) => ({ ...prev, ...next }), {
        preview: null,
        file: null,
    });

    const { field } = useController({
        control,
        name,

    });

    const sizeValidator = (file: File) => {
        if (file.size > MAX_FILE_SIZE) {
            return {
                code: "file-size-too-large",
                message: `La taille du fichier doit être inférieure à 500 KB `,
            };
        }
        return null;
    };

    //Récupération des fichier par copier collé
    const handlePast = async (event: React.ClipboardEvent) => {
        event.preventDefault();
        try {
            if (!event.clipboardData.files.length) {
                return;
            }

            const file = event.clipboardData.files[0];
            const error = sizeValidator(file);
            if (error?.message) throw new Error(error?.message);
            setState({ file: file });
            field.onChange(file);
        } catch (error: any) {
            if (error instanceof Error) {
                ToastErrorSonner(error.message);
            }
        }
    };

    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[acceptedFiles.length - 1] as File;
            setState({ file: file });
            field.onChange(file);
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive, open, fileRejections } = useDropzone({
        onDrop,
        validator: sizeValidator,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
        },
        noClick: true,
    });
    const CLASS_DRAG_ACTIVE = isDragActive ? "border-cyan-600 bg-cyan-200 transition text-cyan-600" : "";
    const DROPZONE_TEXT = isDragActive ? "Vous pouvez lâcher" : "Cliquez ou glissez vos photos ici";


    return (
        <div className="flex flex-col justify-between gap-3 w-full" onPaste={handlePast}>
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 rounded",
                    "rounded relative  w-full grid place-items-center  p-3 text-sm",
                    {
                        "border-dashed": fileRejections.length == 0,
                        "text-[rgba(0,0,0,0.6)] ": fileRejections.length == 0,
                        "border-red-800": fileRejections.length > 0,
                        "text-red-800": fileRejections.length > 0,
                        "bg-red-200": fileRejections.length > 0,
                    },

                    CLASS_DRAG_ACTIVE,
                )}
            >
                <div className="grid place-items-center gap-1 p-3">
                    {fileRejections.length > 0 ? (
                        <div className="grid place-items-center gap-1 ">
                            <CircleAlert className="justify-self-center text-red-900 h-10 w-10" />
                            <p className="text-red-900 text-sm font-semibold my-3 transition-all  ">
                                Format ou taille de fichier invalide
                            </p>
                        </div>
                    ) : (
                        <div className="grid place-items-center gap-1">
                            <ImagePlus className="justify-self-center" />
                            <p className="text-xs">{DROPZONE_TEXT}</p>
                            {!isDragActive && (
                                <small className="text-xs">Vous pouvez copier collé vos photos dans la zone</small>
                            )}
                        </div>
                    )}
                    <input {...getInputProps()} />
                    <Button size="sm" type="button" className="mt-3 text-xs" onClick={open}>
                        <Upload className="w-4 h-4" />
                        Ouvrir
                    </Button>
                </div>
            </div>

            <div className="flex justify-between">
                <p className='text-xs text-gray-500'>
                    Formats acceptés: .jpeg, .jpg, .png, .webp
                </p>
                <p className='text-xs text-gray-500'>
                    Poids maximum: {Math.round(MAX_FILE_SIZE / 1024)} KB
                </p>
            </div>

            {state.file && <UploadFileItem file={state.file} />}
        </div>
    )
}

export default UploadPhoto


export const UploadFileItem = ({ file }: { file: File }) => {
    const [preview, setPreview] = React.useState<string | null>(null);
    React.useEffect(() => {
        if (!file) return;
        const prevLink = URL.createObjectURL(file);
        setPreview(prevLink);
        return () => {
            URL.revokeObjectURL(prevLink);
        };
    }, [file]);
    return (
        <div className="flex items-center gap-2 px-5 py-3 border rounded-md bg-gray-50 motion-preset-slide-right-sm">
            <div className='p-2 bg-white rounded-md border'>
                <Image className='w-4 h-4' />
            </div>
            <div className='flex flex-col'>
                <p className='text-xs font-semibold truncate'>{file?.name}</p>
                <p className='text-xs text-gray-500'>{Math.round(file?.size / 1024)} KB</p>
            </div>
            <div className='w-full flex items-center justify-end'>
                <Button size="icon" variant="outline" type="button" className="text-xs rounded-full bg-destructive/0 border-none hover:bg-destructive/25 text-destructive hover:text-destructive p-0 w-6 h-6" >
                    <X className='w-3 h-3' />
                </Button>
            </div>
        </div>
    )
}