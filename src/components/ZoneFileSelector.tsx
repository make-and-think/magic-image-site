import {createSignal} from "solid-js";
import type {Component} from 'solid-js';
import "./ZoneFileSelector.css";
import {fileToConvert, imagePrepare} from "~/utils/forFiles";


type SelectFiles = {
    addSelectedFiles: (value: fileToConvert[]) => void;
};

export const ZoneFileSelector: Component<SelectFiles> = (props) => {
    const [isDragging, setIsDragging] = createSignal(false);

    const fileInput = document.createElement('input');
    fileInput.type = 'file';         // Set input type to 'file'
    fileInput.multiple = true;       // Enable multiple file selection
    fileInput.addEventListener('change', handleFileSelected)

    async function fileProcess(files: FileList) {
        /* prepared files to usage and filter*/
        let imagesList: fileToConvert[] = [];

        for (let file of files) {
            const tempData = await imagePrepare(file)
            if (tempData === null) {continue}
            imagesList.push(tempData)
        }

        props.addSelectedFiles(imagesList)
        setIsDragging(false)
    }

    async function handleFileSelected(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        if (!element.files) return;
        await fileProcess(element.files)

    }

    async function handleDrop(event: DragEvent) {
        event.preventDefault();
        if (!event.dataTransfer?.files) {
            return
        }
        await fileProcess(event.dataTransfer.files)
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        setIsDragging(true)
    }

    function handleDragLeave() {
        setIsDragging(false)
    }


    return (
        <div
            class={`drop-zone ${isDragging() ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInput.click()}
        >
            <p>Drag & drop files here, or click to select files</p>
        </div>
    );
};