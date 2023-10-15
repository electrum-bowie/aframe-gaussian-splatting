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
            entity.setAttribute("gaussian_splatting", `src: ${url};`);
            entity.setAttribute("rotation", "0 0 0");
            entity.setAttribute("position", "0 1.5 -2");

            // Append the entity to the scene
            document.querySelector("a-scene").appendChild(entity);

            // Hide the file input
            fileButton.style.display = "none";
        }
    });
});
