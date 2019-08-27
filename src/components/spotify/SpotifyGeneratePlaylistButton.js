import React from 'react';

import { init, createPlaylist, addTracksToPlaylist } from 'spotify-web-sdk';

const SpotifyGeneratePlaylistButton = ({ userId, ids }) => {
    init({ token: localStorage.getItem('token') });
    const generatePlaylist = async ids => {
        const newPlaylist = await createPlaylist(userId, 'TS Ranked', {
            description: 'My top 13 Taylor Swift tracks.',
        });
        return addTracksToPlaylist(
            newPlaylist.id,
            ids.map(i => `spotify:track:${i}`)
        );
    };

    return (
        <button
            className="btn btn-outline-primary"
            onClick={() => generatePlaylist(ids)}
        >
            <i className="fab fa-spotify" /> Save as Spotify playlist
        </button>
    );
};

export default SpotifyGeneratePlaylistButton;
