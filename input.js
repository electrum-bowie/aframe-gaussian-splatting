document.addEventListener("DOMContentLoaded", function () {
    const fileButton = document.getElementById("fileButton");
    const fileInput = document.getElementById("fileInput");
    const scene = document.querySelector("a-scene");

    fileButton.addEventListener("click", () => {
        fileInput.click();
    });

    // Check if a URL is stored in local storage
    const storedURL = localStorage.getItem("plyFileURL");
    if (storedURL) {
        createAndAppendEntity(storedURL);
    }

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);

            // Store the URL in local storage
            localStorage.setItem("plyFileURL", url);

            // Create and append the entity
            createAndAppendEntity(url);

            // Hide the file input
            fileButton.style.display = "none";
            // Reload the page after a short delay
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    });

    // Function to create and append the entity
    function createAndAppendEntity(url) {
        const entity = document.createElement("a-entity");
        entity.setAttribute("gaussian_splatting", `src: ${url};`);
        entity.setAttribute("rotation", "0 0 0");
        entity.setAttribute("position", "0 1.5 -2");
        scene.appendChild(entity);
    }
});
