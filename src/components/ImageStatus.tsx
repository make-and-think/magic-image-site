import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import "./ZoneFileSelector.css";
import { fileToConvert, ImageStatusProgress } from "~/utils/forFiles";


export type ImageStatusType = {
    fileToConvert : fileToConvert
}

export const ImageStatus: Component<ImageStatusType> = (props) => {
    const fileToConvert = props.fileToConvert

    return (
        <div class="image-status">
            <p>{fileToConvert.file.name}</p>
            <div class="status-container">
                <p class="status-text">
                    {fileToConvert.imageStatus === ImageStatusProgress.Loaded && "Loaded"}
                    {fileToConvert.imageStatus === ImageStatusProgress.Converting && "Converting"}
                    {fileToConvert.imageStatus === ImageStatusProgress.Converted && "Converted"}
                </p>
                {fileToConvert.imageStatus === ImageStatusProgress.Converted && (
                    <a href={fileToConvert.file.name} download class="download-button">
                        Download 📥
                    </a>
                )}
            </div>
        </div>
    );
};
