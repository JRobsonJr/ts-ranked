import React from 'react';

import { getTrack } from '../../api/albums';
import { saveRankingAsPng } from '../../api/images';
import SpotifyConnectButton from '../spotify/SpotifyConnectButton';
import SpotifyGeneratePlaylistButton from '../spotify/SpotifyGeneratePlaylistButton';

const SharingPageFooter = ({
    favoriteTrackId,
    spotifyToken,
    spotifyUserId,
    imgurUrl,
}) => {
    const { track } = getTrack(favoriteTrackId);
    const tracks = localStorage.getItem('tracks').split(',');
    const ids = tracks.map(t => t.slice(1, 3)).join('');

    return (
        <div className="sharing-page-footer">
            <div className="btn-group">
                <SaveAsPngButton />
                <ShareToTumblrButton
                    imageUrl={imgurUrl}
                    favoriteTrack={track.name}
                />
                <ShareToTwitterButton ids={ids} favoriteTrack={track.name} />
                {spotifyToken ? (
                    <SpotifyGeneratePlaylistButton
                        userId={spotifyUserId}
                        ids={localStorage.getItem('tracks').split(',')}
                    />
                ) : (
                    <SpotifyConnectButton />
                )}
            </div>
        </div>
    );
};

const LoadingButton = () => (
    <button className="btn btn-primary" type="button" disabled>
        <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        />{' '}
        Loading...
    </button>
);

const ShareToTwitterButton = ({ ids, favoriteTrack }) => {
    const twitterBaseUrl = 'https://twitter.com/intent/tweet';
    const twitterParams = {
        text: `Taylor Swift has released over 100 songs throughout her career, but ${favoriteTrack} is my favorite! Share your own Top 13 Taylor songs using TS Ranked:`,
        hashtags: 'TaylorSwiftRanked',
        via: 'SoftCircuits',
        url: `https://jrobsonjr.github.io/ts-ranked/results?tracks=${ids}`,
    };
    return (
        <ShareToSocialMediaButton
            baseUrl={twitterBaseUrl}
            params={twitterParams}
            name="Twitter"
        />
    );
};

const ShareToTumblrButton = ({ favoriteTrack, imageUrl }) => {
    const tumblrBaseUrl = 'https://www.tumblr.com/widgets/share/tool';
    const tumblrParams = {
        canonicalUrl: 'https://jrobsonjr.github.io/ts-ranked',
        posttype: 'photo',
        tags: `TaylorSwiftRanked, ${favoriteTrack}`,
        content: imageUrl,
        caption: `Taylor Swift has released over 100 songs over the course of her career, but ${favoriteTrack} is my favorite! Share your own Top 13 Taylor songs using TS Ranked.`,
    };

    if (imageUrl) {
        return (
            <ShareToSocialMediaButton
                baseUrl={tumblrBaseUrl}
                params={tumblrParams}
                name="Tumblr"
            />
        );
    } else {
        return <LoadingButton />;
    }
};

const SaveAsPngButton = () => (
    <button
        className="btn btn-outline-primary"
        onClick={() => saveRankingAsPng(document.getElementById('share'))}
    >
        Save as PNG
    </button>
);

const ShareToSocialMediaButton = ({ baseUrl, params, name }) => (
    <a
        className="btn btn-outline-primary"
        href={buildUrl(baseUrl, params)}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
    >
        <i className={`fab fa-${name.toLowerCase()}`} /> Share to {name}
    </a>
);

const buildUrl = (baseUrl, params) => {
    return `${baseUrl}?${encodeQueryParams(params)}`;
};

const encodeQueryParams = params =>
    Object.keys(params)
        .map(
            param =>
                `${encodeURIComponent(param)}=${encodeURIComponent(
                    params[param]
                )}`
        )
        .join('&');

export default SharingPageFooter;
