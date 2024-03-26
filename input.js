<<<<<<< HEAD
=======
async function readExportedPly(file) {
    const zipper = new JSZip();
    const unzippedFiles = await zipper.loadAsync(file);

    // Iterate through the unzipped files
    for (const fileName in unzippedFiles.files) {
        const unzippedFile = unzippedFiles.files[fileName];
        console.warn("Please Wait. (Estimated 60s)");

        // Generate a Blob for the .ply file
        const blob = await unzippedFile.async("blob");

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        return url;
    }
    return Promise.reject('No .ply file was found');
}
>>>>>>> parent of 72b6cf0 (Update input.js)
document.addEventListener("DOMContentLoaded", function () {
    const fileButton = document.getElementById("fileButton");
    const fileInput = document.getElementById("fileInput");

    fileButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create an A-Frame entity
            const entity = document.createElement("a-entity");
            entity.setAttribute("gaussian_splatting", `src: ${file};`);
            entity.setAttribute("rotation", `0 0 0`);
            entity.setAttribute("position", `0 1.5 -2`);

            // Append the entity to the scene
            document.querySelector("a-scene").appendChild(entity);

            // Hide the file input
            fileButton.style.display = "none";
        }
    });
});