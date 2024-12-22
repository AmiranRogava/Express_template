const audioInput = document.getElementById("audioInput");
const uploadAudioButton = document.getElementById("uploadAudioButton");

// Audio Upload Handler
uploadAudioButton.addEventListener("click", async () => {
    const file = audioInput.files[0];
    if (!file) {
        return alert("Please select an audio file to upload.");
    }

    const reader = new FileReader();

    reader.onload = async () => {
        const base64Audio = reader.result.split(",")[1];  // Extract base64 string from Data URL

        const userId = "6755b6e4f2a7652319426414";  // Example user ID, replace with actual user ID

        try {
            const response = await fetch("http://localhost:3000/upload_audio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, audio: base64Audio }),  // Send the raw base64 audio string
            });

            const resultText = await response.text();

            try {
                const result = JSON.parse(resultText);  // Parse the response text as JSON
                console.log("Audio Response:", result);  // Check the response from the server
            } catch (error) {
                console.error("Error parsing JSON:", error, "Response:", resultText);  // Handle any JSON parsing error
            }

        } catch (error) {
            console.error("Error uploading audio:", error);  // Log any error that occurred during the fetch
        }
    };

    reader.readAsDataURL(file);  // Read the file as a Data URL (Base64)
});

// Fetch and display Audio based on dynamic ID
async function fetchAudio(audioId) {
    if (!audioId) {
        return console.error("Audio ID is required to fetch the audio.");
    }

    try {
        const response = await fetch(`http://localhost:3000/get_audio/${audioId}`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Since we are fetching binary data, use `response.blob()` instead of `response.json()`
        const audioBlob = await response.blob();  // Get the audio blob

        // Create a URL for the audio blob
        const audioUrl = URL.createObjectURL(audioBlob);

        // Pass the audio URL to the display function
        displayAudio(audioUrl);

    } catch (error) {
        console.error("Error fetching audio:", error);  // Handle fetch errors
    }
}
function displayAudio(audioUrl) {
    // Create an audio element
    const audio = document.createElement('audio');
    audio.controls = true; // Add playback controls like play/pause
    audio.src = audioUrl; // Set the Blob URL as the audio source

    // Append the audio element to the page
    const container = document.querySelector("#audioContainer");  // Make sure you have a container with this id
    if (container) {
        container.appendChild(audio); // Append audio to container
    } else {
        console.warn("Audio container not found.");
    }
}


// Example: Fetch an audio by its ID (Replace 'audioId' with the actual ID)
const audioId = "6755c218d4db7513bd83bd18";  // Example static ID (use dynamic IDs as needed)
fetchAudio(audioId);
