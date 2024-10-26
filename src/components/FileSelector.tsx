import { createSignal } from "solid-js";
import type { Component } from 'solid-js';
import "./FileSelector.css";

type SelectFiles = {
    set_files: (value: File[]) => void;
};

export const FileSelector: Component<SelectFiles> = (props) => {
    const [isDragging, setIsDragging] = createSignal(false);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';         // Set input type to 'file'
    fileInput.multiple = true;       // Enable multiple file selection
    fileInput.addEventListener('change', handleFileSelected)

    function handleFileSelected(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        if (!element.files) return;
        props.set_files(Array.from(element.files));
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave() {
        setIsDragging(false);
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        if (!event.dataTransfer?.files) {return}
        const files = Array.from(event.dataTransfer.files);  // Ensure all files are captured
        props.set_files(files);
        setIsDragging(false);
    }

    return (
        <div
            class={`drop-zone ${isDragging() ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={()=> fileInput.click()}
        >
            <p>Drag & drop files here, or click to select files</p>
        </div>
    );
};