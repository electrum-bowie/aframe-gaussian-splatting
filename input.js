document.addEventListener("DOMContentLoaded", function () {
    const fileButton = document.getElementById("fileButton");
    const fileInput = document.getElementById("fileInput");

    fileButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if the selected file is a .zip file
            if (file.name.endsWith('.zip')) {
                const reader = new FileReader();

                reader.onload = async function (event) {
                    const zip = new JSZip();
                    const zipData = event.target.result;

                    try {
                        const zipArchive = await zip.loadAsync(zipData);

                        // Iterate through the files in the ZIP archive
                        zipArchive.forEach((relativePath, zipEntry) => {
                            if (!zipEntry.dir) {
                                // Assuming you want to use the first non-directory file found
                                const fileData = zipEntry.async("blob");
                                fileData.then(function (content) {
                                    const url = URL.createObjectURL(content);

                                    // Create an A-Frame entity
                                    const entity = document.createElement("a-entity");
                                    entity.setAttribute("gaussian_splatting", `src: ${url};`);
                                    entity.setAttribute("rotation", `0 0 0`);
                                    entity.setAttribute("position", `0 1.5 -2`);

                                    // Append the entity to the scene
                                    document.querySelector("a-scene").appendChild(entity);

                                    // Hide the file input
                                    fileButton.style.display = "none";
                                });
                            }
                        });
                    } catch (error) {
                        console.error("Error loading ZIP file:", error);
                    }
                };

                reader.readAsArrayBuffer(file);
            } else {
                alert("Please select a .zip file.");
            }
        }
    });
});