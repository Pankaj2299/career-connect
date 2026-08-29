import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Minus, Plus } from "lucide-react";

const ProfilePhotoCropper = ({ image, open, setOpen, onCropComplete }) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createCroppedImage = async () => {

        try {

            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels
            );

            onCropComplete(croppedImage);

            setOpen(false);

        } catch (error) {
            console.log("Crop failed:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="sm:max-w-[600px]">

                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Adjust Profile Photo
                    </DialogTitle>
                </DialogHeader>

                <div className="relative h-[350px] w-full bg-black rounded-lg overflow-hidden">

                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleCropComplete}
                    />

                </div>

                <div className="flex items-center gap-3 px-2 pt-4">

                    <Minus size={18} className="text-gray-500" />

                    <Slider
                        value={[zoom]}
                        min={1}
                        max={3}
                        step={0.1}
                        onValueChange={(value) => setZoom(value[0])}
                    />

                    <Plus size={18} className="text-gray-500" />

                </div>

                <DialogFooter className="mt-4">

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={createCroppedImage}
                        className="bg-[#2563EB] hover:bg-[#1D4ED8]"
                    >
                        Crop & Continue
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
};

export default ProfilePhotoCropper;


// Create cropped image
const getCroppedImg = async (imageSrc, crop) => {

    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    );

    return new Promise((resolve, reject) => {

        canvas.toBlob(
            (blob) => {

                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }

                const file = new File(
                    [blob],
                    "profile-photo.jpg",
                    {
                        type: "image/jpeg"
                    }
                );

                resolve(file);

            },
            "image/jpeg",
            0.9
        );

    });
};


// Load image
const createImage = (url) =>
    new Promise((resolve, reject) => {

        const image = new Image();

        image.addEventListener("load", () => resolve(image));

        image.addEventListener("error", (error) => reject(error));

        image.setAttribute("crossOrigin", "anonymous");

        image.src = url;
    });