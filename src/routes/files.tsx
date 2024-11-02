import {Title} from "@solidjs/meta";
import {createStore} from "solid-js/store";

import {ImageMagick, MagickFormat} from '@imagemagick/magick-wasm';

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
                console.log(image)
                for (const format in MagickFormat) {
                    console.log(format)
                    try {
                        image.write(format, data => {

                            let file_link = document.createElement("a")
                            let fileBlob = new Blob([data]);
                            file_link.href = URL.createObjectURL(fileBlob)
                            file_link.download = `all_test_output.${format.toLowerCase()}`
                            file_link.click()
                            console.log(data.length);
                            console.log(image)
                        });
                    } catch (e) {
                        console.log(e)
                    }
                }


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