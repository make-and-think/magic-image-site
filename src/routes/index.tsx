import {Title} from "@solidjs/meta";
import Counter from "~/components/Counter";
import {ZoneFileSelector} from "~/components/ZoneFileSelector";
import {createSignal, For} from "solid-js";
import {BlobWriter, ZipWriter} from "@zip.js/zip.js";

import {fileToConvert} from "~/utils/forFiles";
import {cache} from "@solidjs/router";
import set = cache.set;
import {ImageStatus} from "~/components/ImageStatus";

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
        const notFiltered  = get_selectedFiles().concat(selectedFilesToAdd)
        const unique = notFiltered.filter(
            (elem, index) => notFiltered.findIndex(obj => obj.hash === elem.hash) === index);
        set_selectedFiles(unique)
    };

    const handleConvertClick = () => {
        const zipFileWriter = new BlobWriter();
        const zipWriter = new ZipWriter(zipFileWriter);
        set_currentArchiveFile(zipWriter)
        console.log(get_currentArchiveFile())
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
                        <tr><ImageStatus currentFile={fileObject.file} progressStatus={0} resultObjectURL={"test"}/></tr>}
                </For>
            </table>



        </main>
    );
}
