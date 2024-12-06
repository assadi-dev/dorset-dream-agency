import React from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

const Toolbar = () => {
    return (
        <Menubar className=" py-5 mx-auto flex justify-center">
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Button variant="ghost">Form</Button>
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Rectangle</MenubarItem>
                    <MenubarItem>Cercle</MenubarItem>
                    <MenubarItem>Ellipse</MenubarItem>
                    <MenubarItem>Triangle</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Button variant="ghost">Text</Button>
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <Button variant="ghost">Image</Button>
            </MenubarMenu>
        </Menubar>
    );
};

export default Toolbar;
