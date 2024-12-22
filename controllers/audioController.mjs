import AudioDB from "../models/audioModel.mjs";
import stream from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import express from 'express';

ffmpeg.setFfmpegPath(ffmpegPath);

// Upload audio handler
async function uploadAudio(req, res) {
    try {
        const { userId, audio } = req.body;

        if (!audio) {
            return res.status(400).send("Audio data is required.");
        }

        // Decode the base64 string into a Buffer
        const audioBuffer = Buffer.from(audio, 'base64');

        // Save the audio in MongoDB
        const newAudio = new AudioDB({
            userId,
            audio: audioBuffer,  // Save the audio buffer
        });

        await newAudio.save();
        res.status(200).send({ message: "Audio uploaded successfully." });
    } catch (err) {
        console.error("Error uploading audio:", err);
        res.status(500).send("Error uploading the audio.");
    }
}

// Get audio handler by audioId
async function audioSend(req, res) {
    try {
        const audioId = req.params.audioId;
        const audio = await AudioDB.findById(audioId);

        if (!audio) {
            return res.status(404).send("Audio not found.");
        }

        // Send the audio back to the client as base64
        const base64Audio = audio.audio.toString('base64');  // Convert buffer to base64 string
        res.json({ audio: base64Audio });
    } catch (err) {
        console.error("Error retrieving audio:", err);
        res.status(500).send("Error retrieving the audio.");
    }
}

export default {
    uploadAudio,
    audioSend,
};
