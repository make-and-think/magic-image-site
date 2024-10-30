import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import "./ZoneFileSelector.css";


enum ImageStatusProgress {
    Loaded,
    Converting,
    Converted
}

type ImageStatusType = {
    currentFile: File;
    imageStatus: ImageStatusProgress;
    resultObjectURL: string;
};

export const ImageStatus: Component<ImageStatusType> = (props) => {
    return (
        <div class="image-status">
            <p>{props.currentFile.name}</p>
            <p>{props.imageStatus}%</p>
            {props.imageStatus !== ImageStatusProgress.Converted && (
                <div class="completion-emoji">✅</div>
            )}
            {props.imageStatus === ImageStatusProgress.Converted && (
                <a href={props.resultObjectURL} download class="download-button">
                    Download 📥
                </a>
            )}
        </div>
    );
};
