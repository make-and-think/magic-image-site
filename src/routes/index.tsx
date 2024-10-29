import {Title} from "@solidjs/meta";
import Counter from "~/components/Counter";
import {FileSelector} from "~/components/FileSelector";
import {createSignal, For} from "solid-js";

export default function Home() {
    const [get_selectedFiles, set_selectedFiles] = createSignal<File[]>([]);
    const add_selectedFiles = (selectedFilesToAdd: File[]) => {
        set_selectedFiles(get_selectedFiles().concat(selectedFilesToAdd))
    };




    return (
        <main>
            <Title>Hello World</Title>
            <h1>Hello world!</h1>
            <FileSelector set_files={add_selectedFiles}/>
            <li>
                <For each={get_selectedFiles()}>
                    {(file, i) => (<ol>{file.name}</ol>)}
                </For>
            </li>
        </main>
    );
}
