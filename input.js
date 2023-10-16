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
                const zip = new JSZip();

                // Read the zip file
                zip.loadAsync(file)
                    .then(function (zip) {
                        // Get the names of all files in the zip archive
                        const fileNames = Object.keys(zip.files);

                        // Check if there's exactly one file in the archive
                        if (fileNames.length === 1) {
                            const firstFileName = fileNames[0];

                            // Get the contents of the first (and only) file in the archive
                            zip.files[firstFileName].async("blob")
                                .then(function (fileData) {
                                    // Create an object URL for the extracted file
                                    const url = URL.createObjectURL(fileData);

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
                        } else {
                            alert("The .zip file should contain exactly one file.");
                        }
                    });
            } else {
                alert("Please select a .zip file.");
            }
        }
    });
});
