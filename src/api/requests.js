import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000/api'
            : 'https://ts-ranked-server.jrobsonjr.now.sh/api',
});

export const getOverallScores = () =>
    axiosInstance.get('/scores').then(response => response.data);

export const getLoverScores = () =>
    axiosInstance.get('/scores-lover').then(response => response.data);

export const postRanking = (tracks, albumName) =>
    axiosInstance
        .post('/rankings', { scope: albumName, tracks })
        .then(response => response.data);
