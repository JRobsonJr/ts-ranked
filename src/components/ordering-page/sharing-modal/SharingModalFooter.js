import React from 'react';

import { getTrack } from '../../../api/albums';

const SharingModalFooter = ({ favoriteTrackId, saveAsPng }) => {
    const { track } = getTrack(favoriteTrackId);

    return (
        <div className="modal-footer">
            <SaveAsPngButton saveAsPng={saveAsPng} />
            <ShareToTwitterButton favoriteTrack={track.name} />
            <ShareToTumblrButton favoriteTrack={track.name} />
        </div>
    );
};

const ShareToTwitterButton = ({ favoriteTrack }) => {
    const twitterBaseUrl = 'https://twitter.com/intent/tweet';
    const twitterParams = {
        text: `Taylor Swift has released over 100 songs over the course of her career, but ${favoriteTrack} is my favorite! Share your own Top 13 Taylor songs using TS Ranked:`,
        hashtags: 'TaylorSwiftRanked',
        via: 'SoftCircuits',
        url: 'https://jrobsonjr.github.io/ts-ranked',
    };
    return (
        <ShareToSocialMediaButton
            baseUrl={twitterBaseUrl}
            params={twitterParams}
            name="Twitter"
        />
    );
};

const ShareToTumblrButton = ({ favoriteTrack }) => {
    const tumblrBaseUrl = 'https://www.tumblr.com/widgets/share/tool';
    const tumblrParams = {
        canonicalUrl: 'https://jrobsonjr.github.io/ts-ranked',
        posttype: 'link',
        tags: 'TaylorSwiftRanked',
        content: `https://jrobsonjr.github.io/ts-ranked`,
        caption: `Taylor Swift has released over 100 songs over the course of her career, but ${favoriteTrack} is my favorite! Share your own Top 13 Taylor songs using TS Ranked.`,
    };

    return (
        <ShareToSocialMediaButton
            baseUrl={tumblrBaseUrl}
            params={tumblrParams}
            name="Tumblr"
        />
    );
};

const SaveAsPngButton = ({ saveAsPng }) => (
    <button className="btn btn-outline-primary" onClick={() => saveAsPng()}>
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
        Share to {name}
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

export default SharingModalFooter;
