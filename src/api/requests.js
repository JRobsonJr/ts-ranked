import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000/api'
            : 'https://ts-ranked-server.jrobsonjr.now.sh/api',
});

export const getTrackStats = () =>
    axiosInstance.get('/tracks').then(response => response.data);

export const addTrackScore = (trackId, score) =>
    axiosInstance
        .put('/tracks', { id: trackId, score })
        .then(response => response.data);

export const addTrack = trackId =>
    axiosInstance
        .post('/tracks', { id: trackId })
        .then(response => response.data);
