import React from 'react';

const SpotifyConnectButton = () => (
    <a className="btn btn-outline-primary" href={buildAuthUrl()}>
        <i className="fab fa-spotify" /> Connect to Spotify
    </a>
);

const buildAuthUrl = () => {
    const params = {
        client_id: 'be0cee1062cc483999346bff5bcb7f2b',
        response_type: 'token',
        redirect_uri:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000/spotify-auth'
                : 'https://jrobsonjr.github.io/ts-ranked/spotify-auth',
        scope: `playlist-modify-public playlist-modify-private`,
    };
    return `https://accounts.spotify.com/authorize?${encodeQueryParams(
        params
    )}`;
};

const encodeQueryParams = params => {
    const encodedParams = Object.keys(params).map(
        param =>
            `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`
    );
    return encodedParams.join('&');
};

export default SpotifyConnectButton;
