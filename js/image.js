
const imageInput = document.getElementById("imageInput");
const uploadImageButton = document.getElementById("uploadImageButton");


// Image Upload Handler
uploadImageButton.addEventListener("click", async () => {
    const file = imageInput.files[0];
    if (!file) {
        return alert("Please select an image to upload.");
    }

    const reader = new FileReader();

    reader.onload = async () => {
        const base64Image = reader.result.split(",")[1];

        const userId = "64a6b3f2e8d1234abcd56789";

        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, image: base64Image }),
            });

            const resultText = await response.text();

            try {
                const result = JSON.parse(resultText);
                console.log("Image Response:", result);
            } catch (error) {
                console.error("Error parsing JSON:", error, "Response:", resultText);
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    reader.readAsDataURL(file);
});


// Fetch and display Image
async function fetchImage() {
    try {
        const response = await fetch("http://localhost:3000/get_image");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data && data.image) {
            displayImage(data.image);
        } else {
            console.error("Image data is missing in the response");
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}

function displayImage(base64) {
    const imageElement = document.createElement("img");
    imageElement.src = "data:image/png;base64," + base64;
    imageElement.alt = "Fetched Image";
    document.getElementById("imageContainer").appendChild(imageElement);
}


fetchImage();