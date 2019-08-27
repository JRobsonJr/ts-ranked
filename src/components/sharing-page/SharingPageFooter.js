import React, { Component } from 'react';

import { getTrack } from '../../api/albums';
import { saveRankingAsPng, postRankingToImgur } from '../../api/images';
import { init, getCurrentUserProfile } from 'spotify-web-sdk';
import SpotifyConnectButton from '../spotify/SpotifyConnectButton';
import SpotifyGeneratePlaylistButton from '../spotify/SpotifyGeneratePlaylistButton';

class SharingPageFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            spotifyConnect: props.token,
            spotifyUserId: '',
        };
    }

    componentDidMount() {
        const { spotifyConnect } = this.state;

        if (spotifyConnect) {
            init({ token: localStorage.getItem('token') });
            getCurrentUserProfile().then(user => {
                this.setState({ spotifyUserId: user.id });
            });
        }
        postRankingToImgur(document.getElementById('share')).then(url =>
            this.setState({ url })
        );
    }

    render() {
        const { track } = getTrack(this.props.favoriteTrackId);
        const { spotifyConnect, spotifyUserId } = this.state;
        const tracks = localStorage.getItem('tracks').split(',');
        const ids = tracks.map(t => t.slice(1, 3)).join('');

        return (
            <div className="sharing-page-footer">
                <SaveAsPngButton />
                {!this.state.url ? (
                    <LoadingButton />
                ) : (
                    <ShareToTumblrButton
                        favoriteTrack={track.name}
                        imageUrl={this.state.url}
                    />
                )}
                <ShareToTwitterButton ids={ids} favoriteTrack={track.name} />
                {spotifyConnect ? (
                    <SpotifyGeneratePlaylistButton
                        userId={spotifyUserId}
                        ids={localStorage.getItem('tracks').split(',')}
                    />
                ) : (
                    <SpotifyConnectButton />
                )}
            </div>
        );
    }
}

const LoadingButton = () => (
    <button class="btn btn-primary" type="button" disabled>
        <span
            class="spinner-border spinner-border-sm"
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
