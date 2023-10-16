async function readExportedPly(file) {
    const zipper = new JSZip();
    console.warn("Please Wait. (Estimating 60s)");

    const unzippedFiles = await zipper.loadAsync(file, { createFolders: false });

    // Create an array of promises to track progress
    const promises = [];
    let totalSize = 0;
    let bytesRead = 0;
    let percent = 0; // Initialize percent

    // Calculate the total size of the unzipped data
    for (const fileName in unzippedFiles.files) {
        const unzippedFile = unzippedFiles.files[fileName];
        totalSize += unzippedFile._data.uncompressedSize;
    }

    // Function to process a single file and update progress
    async function processFile(unzippedFile) {
        const arrayBuffer = await unzippedFile.async("arraybuffer");
        bytesRead += arrayBuffer.byteLength;
        percent = (bytesRead / totalSize) * 100;
        console.log(`Unzipping: ${percent.toFixed(2)}%`);
        promises.push(arrayBuffer);
    }

    // Start processing files concurrently
    const fileProcessingPromises = Object.values(unzippedFiles.files).map(processFile);
    await Promise.all(fileProcessingPromises);

    if (promises.length === 0) {
        return Promise.reject('No .ply file was found');
    }

    console.warn("Unzipping completed.");

    // Provide the URL for the last .ply file (assuming only one .ply file in the zip)
    const blob = new Blob([promises[promises.length - 1]], { type: "application/octet-stream" });
    return URL.createObjectURL(blob);
}

document.addEventListener("DOMContentLoaded", function () {
    const fileButton = document.getElementById("fileButton");
    const fileInput = document.getElementById("fileInput");
<<<<<<< HEAD
    fileButton.addEventListener("click", () => {
        fileInput.click();
    });
    fileInput.addEventListener("change", async (event) => {
        try {
            const url = await readExportedPly();
            // Create an A-Frame entity
            const entity = document.createElement("a-entity");
            entity.setAttribute("gaussian_splatting", `src: ${url};`);
            entity.setAttribute("rotation", `0 0 0`);
            entity.setAttribute("position", `0 1.5 -2`);
            document.querySelector("a-scene").appendChild(entity);
            fileButton.style.display = "none";
        } catch (error) {
            alert("Error: " + error);
=======

    fileButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const url = await readExportedPly(file);

                // Create an A-Frame entity
                const entity = document.createElement("a-entity");
                entity.setAttribute("gaussian_splatting", `src: ${url};`);
                entity.setAttribute("rotation", `0 0 0`);
                entity.setAttribute("position", `0 1.5 -2`);

                // Append the entity to the scene
                document.querySelector("a-scene").appendChild(entity);

                // Hide the file input
                fileButton.style.display = "none";
            } catch (error) {
                alert("Error: " + error);
            }
>>>>>>> parent of 1558e92 (Update input.js)
        }
    });
});
