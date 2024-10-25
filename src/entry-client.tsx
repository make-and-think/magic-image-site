// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
const wasmLocation = new URL('@imagemagick/magick-wasm/magick.wasm', import.meta.url);
import { initializeImageMagick } from '@imagemagick/magick-wasm'


initializeImageMagick(wasmLocation).then(()=>{
    mount(() => <StartClient />, document.getElementById("app")!);
})
