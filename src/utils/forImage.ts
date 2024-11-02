import {fileToConvert} from "~/utils/forFiles";
import {ImageMagick, IMagickImage, MagickFormat, MagickReadSettings} from "@imagemagick/magick-wasm";


export function convertImage(fileObject: fileToConvert, settings: MagickReadSettings, format: MagickFormat): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const task = ImageMagick.read(fileObject.bytes, async (image) => {
            image.write(format,(convertedImage) => {
                resolve(new Blob([convertedImage]))
            })
        })
    });
}
