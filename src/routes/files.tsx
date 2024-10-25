import {Title} from "@solidjs/meta";
import {createStore} from "solid-js/store";

import {
    ImageMagick,
    MagickFormat,
    MagickReadSettings
} from '@imagemagick/magick-wasm';

export default function Files() {
    const [store, setStore] = createStore({
        files: null
    })

    async function handleFileChange(event: Event) {
        const element = event.currentTarget as HTMLInputElement
        let fileList: FileList | null = element.files;
        if (fileList === null) return;
        for (const file of fileList) {
            console.log(file);
            const arrayBuffer = await file.arrayBuffer()
            const array = new Uint8Array(arrayBuffer)
            ImageMagick.read(array, (image) => {
                console.log(image.toString())
                image.write(MagickFormat.Jpeg, data => {

                    let file_link = document.createElement("a")
                    let fileBlob = new Blob([data], {
                        type: "image/jpeg"
                    });
                    file_link.href = URL.createObjectURL(fileBlob)
                    file_link.download = "test.jpg"
                    file_link.click()
                    console.log(data.length);
                });
            })

        }

    }


    return (
        <main>
            <Title>Files</Title>
            <h1>Files</h1>
            <input type="file" multiple onChange={handleFileChange}/>
        </main>
    );
}