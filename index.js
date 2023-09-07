const context = new AudioContext();
const source = context.createBufferSource();
source.connect(context.destination);

//const source = new AudioBufferSourceNode(context);

function readFile() {    
    for (const file of input.files) {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            const audioData = e.target.result;

            const promise = context.decodeAudioData(audioData, 
                function(buffer) {
                    source.buffer = buffer;
                    source.loop = true;
                });

            promise
                .then(() => {
                    //source.start();
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        reader.readAsArrayBuffer(file);
    }
}

function begin() {
    source.start();
}

const input = document.getElementById("input");
input.addEventListener("change", readFile);

const start = document.getElementById("start");
start.addEventListener('click', begin);

