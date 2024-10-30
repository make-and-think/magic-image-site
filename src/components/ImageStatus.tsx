import {createSignal} from "solid-js";
import type {Component} from 'solid-js';
import "./ZoneFileSelector.css";


type ImageStatusType = {
    currentFile: File;
    progressStatus : number;
    resultObjectURL : string;
};


export const ImageStatus: Component<ImageStatusType> = (props) => {

    return <div><p>
        {props.currentFile.name}
    </p>
    <p>{props.progressStatus}</p>
    </div>
}
