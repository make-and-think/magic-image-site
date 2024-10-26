import { createSignal } from "solid-js";
import type { Component } from 'solid-js';
import "./FileSelector.css";

type SelectFiles = {
    set_Files: (value : File[]) => void;
}


export const FileSelector: Component<SelectFiles> = (props) => {


    function handleFileChange(event: Event) {
        const element = event.currentTarget as HTMLInputElement
        if (!element.files) return;
        props.set_Files(Array.from(element.files))
    }
    return <div>
        <input type="file" multiple onChange={handleFileChange}/>
    </div>
}