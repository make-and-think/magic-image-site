import {Title} from "@solidjs/meta";
import {ZoneFileSelector} from "~/components/ZoneFileSelector";
import {createSignal, For} from "solid-js";
import {BlobReader, BlobWriter, ZipWriter} from "@zip.js/zip.js";

import {fileToConvert, ImageStatusProgress} from "~/utils/forFiles";
import {ImageStatus} from "~/components/ImageStatus";
import {MagickFormat, MagickReadSettings} from "@imagemagick/magick-wasm";
import {convertImage} from "~/utils/forImage";
import {createStore} from "solid-js/store";

export default function Home() {
    const [
        get_selectedFiles,
        set_selectedFiles
    ] = createSignal<fileToConvert[]>([]);
    const [
        get_currentArchiveFile,
        set_currentArchiveFile
    ] = createSignal<ZipWriter<any>>()

    const add_selectedFiles = (selectedFilesToAdd: fileToConvert[]) => {
        const notFiltered = get_selectedFiles().concat(selectedFilesToAdd)
        const unique = notFiltered.filter(
            (elem, index) => notFiltered.findIndex(obj => obj.hash === elem.hash) === index);
        set_selectedFiles(unique)
    };



    const handleConvertClick = async () => {
        const zipFileWriter = new BlobWriter();
        const zipWriter = new ZipWriter(zipFileWriter);
        set_currentArchiveFile(zipWriter);

        const settings = new MagickReadSettings()
        settings.debug = true

        for await (const fileObject of get_selectedFiles()) {
            fileObject.imageStatus = ImageStatusProgress.Converting
            console.log("start convert", fileObject.file.name)
            const blobConverted = await convertImage(fileObject, settings, MagickFormat.WebP)
            const imageBytesReader = new BlobReader(blobConverted)
            console.log(imageBytesReader)
            const newFilename = `${fileObject.file.name.split('.').slice(0, -1).join('.')}.${MagickFormat.WebM.toLowerCase()}`
            await zipWriter.add(newFilename, imageBytesReader)
        }

        await zipWriter.close();
        const zipBlob = await zipFileWriter.getData();
        const file_link = document.createElement("a");
        file_link.href = URL.createObjectURL(zipBlob);
        file_link.download = "converted_images.zip";
        file_link.click();
        console.log("Conversion and download complete.");
    }

    const convertFiles = () => {

    }


    return (
        <main>
            <Title>Hello World</Title>
            <h1>Hello world!</h1>
            <button disabled={false} onClick={handleConvertClick}>Convert!</button>
            <ZoneFileSelector addSelectedFiles={add_selectedFiles}/>
            <table>
                <For each={get_selectedFiles()}>
                    {(fileObject, i) =>
                        <tr><ImageStatus fileToConvert={fileObject}/></tr>}
                </For>
            </table>


        </main>
    );
}
