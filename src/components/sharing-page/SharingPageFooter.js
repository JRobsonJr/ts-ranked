import React from 'react';

import { getTrack } from '../../api/albums';
import { saveRankingAsPng } from '../../api/images';
import SpotifyConnectButton from '../spotify/SpotifyConnectButton';
import SpotifyGeneratePlaylistButton from '../spotify/SpotifyGeneratePlaylistButton';

const SharingPageFooter = ({
    albumName,
    tracks,
    spotifyToken,
    spotifyUserId,
    isOverallRanking,
}) => {
    const { track } = getTrack(tracks[0]);
    const ids = tracks.map(t => t.slice(1, 3)).join('');
    const spotifyButton = spotifyToken ? (
        <SpotifyGeneratePlaylistButton userId={spotifyUserId} ids={tracks} />
    ) : (
        <SpotifyConnectButton />
    );
    const resultsUrl = buildUrl(
        'https://jrobsonjr.github.io/ts-ranked/results',
        { tracks: ids, album: albumName !== 'tracks' ? albumName : '' }
    );

    return (
        <div className="sharing-page-footer">
            <div className="row">
                <div className="col-auto mb-1">
                    <SaveAsPngButton />
                </div>
                <div className="col-auto mb-1">
                    <ShareToTumblrButton
                        resultsUrl={resultsUrl}
                        albumName={albumName}
                        ids={ids}
                        favoriteTrack={track.name}
                    />
                </div>
                <div className="col-auto mb-1">
                    <ShareToTwitterButton
                        resultsUrl={resultsUrl}
                        ids={ids}
                        favoriteTrack={track.name}
                    />
                </div>
                <div className="col-auto mb-1">
                    {isOverallRanking && spotifyButton}
                </div>
            </div>
        </div>
    );
};

const ShareToTwitterButton = ({ ids, favoriteTrack, resultsUrl }) => {
    const twitterBaseUrl = 'https://twitter.com/intent/tweet';
    const twitterParams = {
        text: `@taylorswift13 has released over 100 songs throughout her career, but "${favoriteTrack}" is my favorite! Check out my Top 13 Taylor songs and create your own with TS Ranked:`,
        hashtags: 'TSRanked, TaylorSwiftRanked',
        url: resultsUrl,
    };
    return (
        <ShareToSocialMediaButton
            baseUrl={twitterBaseUrl}
            params={twitterParams}
            name="Twitter"
        />
    );
};

const ShareToTumblrButton = ({ ids, favoriteTrack, resultsUrl }) => {
    const tumblrBaseUrl = 'https://www.tumblr.com/widgets/share/tool';
    const tumblrParams = {
        canonicalUrl: resultsUrl,
        posttype: 'link',
        tags: `TSRanked, TaylorSwiftRanked, ${favoriteTrack}`,
        content: resultsUrl,
        caption: `<a href="https://taylorswift.tumblr.com">@taylorswift</a> has released over 100 songs throughout her career, but <b>${favoriteTrack}</b> is my favorite! Share your own Top 13 Taylor songs with <a href="${resultsUrl}">TS Ranked</a>.`,
    };

    return (
        <ShareToSocialMediaButton
            baseUrl={tumblrBaseUrl}
            params={tumblrParams}
            name="Tumblr"
        />
    );
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

const encodeQueryParams = params => {
    const encodeParam = param => {
        if (params[param]) {
            return `${encodeURIComponent(param)}=${encodeURIComponent(
                params[param]
            )}`;
        } else {
            return '';
        }
    };
    return Object.keys(params)
        .map(param => encodeParam(param))
        .filter(param => param !== '')
        .join('&');
};

export default SharingPageFooter;
