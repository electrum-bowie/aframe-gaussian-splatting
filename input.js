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
document.addEventListener("DOMContentLoaded", function () {
    const fileButton = document.getElementById("fileButton");
    const fileInput = document.getElementById("fileInput");
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
                document.querySelector("a-scene").appendChild(entity);
                fileButton.style.display = "none";
            } catch (error) {
                alert("Error: " + error);
            }
        }
    });
});
