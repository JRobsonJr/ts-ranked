import axios from 'axios';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const axiosInstance = axios.create({
    baseURL: 'https://api.imgur.com',
    headers: { Authorization: 'Client-ID 9ba26223a321650' },
});

export const postRankingToImgur = async node => {
    const blob = await getRankingBlob(node);
    const response = await axiosInstance.post('/3/upload/', blob);
    return response.data.data.link;
};

export const saveRankingAsPng = async node => {
    const blob = await getRankingBlob(node);
    saveAs(blob, 'tsranked-top13.png');
};

const getRankingBlob = async node => {
    const blob = await domtoimage.toBlob(node, {
        style: { height: '100%', top: '0', position: 'relative', left: '0' },
        bgcolor: '#ffffff',
    });
    return blob;
};
