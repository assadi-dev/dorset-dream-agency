import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const EditorContent = () => {
    return (
        <div className="flex flex-col gap-2  p-3 h-full w-full text-sm">
            <div className="mb-5">
                <CardTitle className="mb-1">Dimensions</CardTitle>
            </div>
            <div className="mb-5">
                <CardTitle className="mb-1">Taille</CardTitle>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <Label className=" text-xs">Hauteur</Label>
                        <Input type="number" placeholder="Hauteur" />
                    </div>
                    <div>
                        <Label className=" text-xs">Largeur</Label>
                        <Input type="number" placeholder="Largeur" />
                    </div>
                </div>
                <div className=" mb-5">
                    <CardTitle className="mb-1">Position</CardTitle>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <Label className=" text-xs">X</Label>
                            <Input type="number" />
                        </div>
                        <div>
                            <Label className=" text-xs">Y</Label>
                            <Input type="number" />
                        </div>
                        <div>
                            <Label className=" text-xs">Pivoter</Label>
                            <Input type="number" />
                        </div>
                    </div>
                </div>
                <div className=" mb-3">
                    <CardTitle className="mb-1">Apparence</CardTitle>

                    <div className="">
                        <div>
                            <Label className=" text-xs">Typographie</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <Input defaultValue="sans-serif" />
                                <Input type="number" defaultValue="18" />
                            </div>
                            <div className="">
                                <Label className="text-xs">Alignement</Label>
                                <div className="grid grid-cols-2"></div>
                            </div>
                            <div className="">
                                <Label className="text-xs">Décoration</Label>
                                <div className="grid grid-cols-2"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <Label className=" text-xs">opacité</Label>
                                <Input type="number" />
                            </div>
                            <div>
                                <Label className=" text-xs">arrondie</Label>
                                <Input type="number" />
                            </div>
                        </div>
                        <div>
                            <Label className=" text-xs">Bordure</Label>
                            {/*  <Input type="number" /> */}
                        </div>

                        <div>
                            <Label className=" text-xs">Effet</Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorContent;
