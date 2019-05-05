import React from 'react';

import { getTrack } from '../../../api/albums';

const SharingModalFooter = ({
    contributed,
    favoriteTrackId,
    saveAsPng,
    submitRanking,
}) => (
    <div className="modal-footer">
        <SaveAsPngButton saveAsPng={saveAsPng} />
        <ShareToTwitterButton favoriteTrackId={favoriteTrackId} />
        <SubmitRankingButton
            contributed={contributed}
            submitRanking={submitRanking}
        />
    </div>
);

const SaveAsPngButton = ({ saveAsPng }) => (
    <button className="btn btn-outline-primary" onClick={() => saveAsPng()}>
        Save as PNG
    </button>
);

const ShareToTwitterButton = ({ favoriteTrackId }) => (
    <a
        className="btn btn-outline-primary"
        href={buildTwitterUrl(getTrack(favoriteTrackId).track)}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
    >
        Share to Twitter
    </a>
);

const SubmitRankingButton = ({ contributed, submitRanking }) => (
    <button
        className="btn btn-outline-primary"
        onClick={() => submitRanking()}
        disabled={contributed}
    >
        {contributed ? 'Thank you!' : 'Submit your ranking'}
    </button>
);

const buildTwitterUrl = favoriteTrack => {
    const params = {
        text: `Taylor Swift has released over 100 songs over the course of her career, but ${
            favoriteTrack.name
        } is my favorite! Share your own Top 13 TS songs using TS Ranked:`,
        hashtags: 'TaylorSwiftRanked',
        via: 'SoftCircuits',
        url: 'https://jrobsonjr.github.io/taylorswiftranked',
    };
    return `https://twitter.com/intent/tweet?${encodeQueryParams(params)}`;
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
