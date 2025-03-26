function loadTatwaImage(imageName) {
    const imgElement = document.getElementById("tatwa-image");
    let imagePath = `img/${imageName}.webp`;

    imgElement.onerror = function () {
        console.warn(`No se encontró ${imagePath}, probando con .png`);
        imgElement.src = `img/${imageName}.png`;
        imgElement.onerror = function () {
            console.error(`No se encontró la imagen en .webp ni en .png. Usando imagen de respaldo.`);
            imgElement.src = "img/default.png";
        };
    };
    imgElement.src = imagePath;
}
