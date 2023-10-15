document.addEventListener("DOMContentLoaded", function () {
    const fileButton = document.getElementById("fileButton");
    const fileInput = document.getElementById("fileInput");

    fileButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);

            // Create an A-Frame entity
            const entity = document.createElement("a-entity");
            entity.setAttribute("gaussian_splatting", `src: #model;`);
            entity.setAttribute("rotation", "0 0 0");
            entity.setAttribute("position", "0 1.5 -2");

            // Create an A-Frame assets item with the URL of the uploaded file
            const assets = document.querySelector("a-assets");
            const assetItem = document.createElement("a-asset-item");
            assetItem.setAttribute("id", "model");
            assetItem.setAttribute("src", url);
            assets.appendChild(assetItem);

            // Append the entity to the scene
            document.getElementById("entityContainer").appendChild(entity);

            // Hide the file input
            fileButton.style.display = "none";
        }
    });
});
