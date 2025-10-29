import { GenderType } from "@/app/types";
import { EmployeeBasic, SecteurType } from "@/app/types/employee";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import { avatarByGender } from "@/lib/utils";
import { BriefcaseBusiness, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
import SecteurLogo from "./SecteurLogo";
import { safeLoadAvatar, safeLoadFile } from "@/lib/client_side";

type EmployeeCardProps = {
    employee: EmployeeBasic;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    const photo = safeLoadAvatar({ path: employee.photoUrl, gender: employee.gender });

    return (
        <figure className="grid grid-rows-[1fr,auto] gap-3 p-2 w-full h-full bg-gradient-to-br from-green-900 to-green-950 text-white rounded-lg shadow-inner shadow-white">
            <div className="  bg-green-950 backdrop-blur-lg rounded-lg shadow-inner shadow-white/50 relative overflow-hidden  h-[285px]">
                <Image
                    src={photo}
                    height={400}
                    width={400}
                    alt="photo employee"
                    className="object-cover object-center h-full "
                />
            </div>
            <figcaption className="flex-1 bg-green-950 shadow-inner shadow-white/65 backdrop-blur-lg py-2 px-3 rounded-lg h-fit self-end overflow-hidden">
                <p className="text-sm lg:text-[1rem] font-bold max-w-[80%] text-nowrap text-ellipsis overflow-hidden">
                    {employee.name}
                </p>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="flex items-center flex-nowrap gap-2 text-xs text-primary-accent">
                            <BriefcaseBusiness className="h-3 w-3" /> {employee.grade}
                        </p>
                        <p className="flex items-center flex-nowrap gap-2 text-xs text-primary-accent">
                            <PhoneCall className="h-3 w-3" /> {employee.phone}
                        </p>
                    </div>
                    {employee.secteur && <SecteurLogo secteurs={employee.secteur?.split(",") as SecteurType[]} />}
                </div>
            </figcaption>
        </figure>
    );
};

export default EmployeeCard;
