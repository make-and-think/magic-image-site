import {fileToConvert} from "~/utils/forFiles";
import {ImageMagick, IMagickImage, MagickFormat, MagickReadSettings} from "@imagemagick/magick-wasm";


export function convertImage(fileObject: fileToConvert, settings: MagickReadSettings, format: MagickFormat): Promise<Blob> {
    return new Promise((resolve, reject) => {
        ImageMagick.read(fileObject.bytes, (image) => {
            image.write(format,(convertedImage) => {
                resolve(new Blob([convertedImage]))
            })
        })
    });
}

export function readImage(fileObject: fileToConvert, settings: MagickReadSettings): Promise<IMagickImage> {

    return new Promise((resolve, reject) => {
        let imageRead: IMagickImage | undefined = undefined
        ImageMagick.read(fileObject.bytes, settings, async (imageObj) => {
            imageRead = await imageObj
        }).then(() => {
            console.log("readImage", fileObject.bytes, imageObj)
            if (imageRead) {
                resolve(imageRead); // Resolves with the image object
            } else {
                reject(new Error("Failed to read the image")); // Rejects with an error
            }

        });
    });
}

export function writeImage(image: IMagickImage, format: MagickFormat): Promise<Blob> {
    return new Promise((resolve, reject) => {
        console.log("writeImage", image)
        image.write(format, async (imageBytes) => {
            if (imageBytes) {

                resolve(new Blob([imageBytes])); // Resolves with the image object
            } else {
                reject(new Error("Failed to read the image")); // Rejects with an error
            }
        });
    });
}