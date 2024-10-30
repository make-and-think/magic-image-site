import {ByteArray, MagickFormat, MagickImageInfo} from "@imagemagick/magick-wasm";
import XXHashAPI from "xxhash-wasm";

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */


export type fileToConvert = {
    file: File
    imageInfo: MagickImageInfo
    hash: number
    bytes: Uint8Array

};

export function humanFileSize(bytes: number, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

export async function imagePrepare(file: File): Promise<null | fileToConvert> {
    let fileBytes: Uint8Array | undefined = new Uint8Array(await file.arrayBuffer());
    let magickImageInfo: MagickImageInfo | undefined = new MagickImageInfo();

    try {
        magickImageInfo.read(fileBytes)
    } catch (e) {
        console.log(`file ${file.name} not supported`)
        fileBytes = undefined;
        magickImageInfo = undefined;
        return null
    }

    if (magickImageInfo.format != MagickFormat.Unknown) {
        const {create32} = await XXHashAPI()
        const hash = create32().update(fileBytes).digest()

        return {
            file: file,
            imageInfo: magickImageInfo,
            hash: hash,
            bytes: fileBytes
        }
    }

    fileBytes = undefined;
    magickImageInfo = undefined;
    return null
}
