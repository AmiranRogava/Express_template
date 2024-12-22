import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
    audio: { type: Buffer, required: true },  // Store the audio file as a Buffer
    createdAt: { type: Date, default: Date.now }
});

const AudioDB = mongoose.model("Audios", audioSchema);

export default AudioDB;
