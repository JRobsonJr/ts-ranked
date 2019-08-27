import React, { Component } from 'react';

import { getTrack } from '../../api/albums';
import { saveRankingAsPng, postRankingToImgur } from '../../api/images';

class SharingPageFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        };
    }

    componentDidMount() {
        postRankingToImgur(document.getElementById('share')).then(url =>
            this.setState({ url })
        );
    }

    render() {
        const { track } = getTrack(this.props.favoriteTrackId);
        return (
            <div className="sharing-page-footer">
                <SaveAsPngButton />
                {!this.state.url ? (
                    <button class="btn btn-primary" type="button" disabled>
                        <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        />{' '}
                        Loading...
                    </button>
                ) : (
                    <ShareToTumblrButton
                        favoriteTrack={track.name}
                        imageUrl={this.state.url}
                    />
                )}
                <ShareToTwitterButton favoriteTrack={track.name} />
            </div>
        );
    }
}

const ShareToTwitterButton = ({ favoriteTrack }) => {
    const twitterBaseUrl = 'https://twitter.com/intent/tweet';
    const twitterParams = {
        text: `Taylor Swift has released over 100 songs throughout her career, but ${favoriteTrack} is my favorite! Share your own Top 13 Taylor songs using TS Ranked:`,
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

export default SharingPageFooter;
