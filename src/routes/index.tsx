import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import {FileSelector} from "~/components/FileSelector";
import {createSignal, For} from "solid-js";

export default function Home() {
    const [get_files, set_files] = createSignal<File[]>([]);



  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
     <FileSelector set_files={(files) => {
         const uniFiles = new Set(get_files().concat(files))
         set_files([...uniFiles])}} />
    <li>
        <For each={get_files()}>
            {(file, i) => (<ol>{file.name}</ol>)}
        </For>
    </li>
    </main>
  );
}
