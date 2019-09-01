import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { init, getCurrentUserProfile } from 'spotify-web-sdk';
import queryString from 'querystring';

import TrackListTable from '../common/TrackListTable';
import PageWrapper from '../common/PageWrapper';
import SharingPageFooter from './SharingPageFooter';

import './SharingPage.css';

class SharingPage extends Component {
    constructor(props) {
        super(props);
        const albumName = queryString.parse(props.location.search)['?album'];
        const itemName = albumName ? albumName : 'tracks';
        const tracks = localStorage.getItem(itemName)
            ? localStorage.getItem(itemName).split(',')
            : [];
        this.state = {
            itemName,
            tracks,
            spotifyToken: this.props.location.state
                ? this.props.location.state.token
                : '',
        };
    }

    componentDidMount() {
        const { spotifyToken } = this.state;

        if (spotifyToken) {
            init({ token: spotifyToken });
            getCurrentUserProfile().then(user => {
                this.setState({ spotifyUserId: user.id });
            });
        }
    }

    render() {
        const { itemName, tracks, spotifyToken, spotifyUserId } = this.state;

        return tracks.length === 13 ? (
            <PageWrapper>
                <h1 className="text-center">
                    Here are your top 13 Taylor Swift tracks!
                </h1>
                <SharingPageRanking tracks={tracks} albumName={itemName} />
                <TrackListTable tracks={tracks} />
                <h3 className="text-center">
                    Now it's time to share them with the world!
                </h3>
                <SharingPageFooter
                    albumName={itemName}
                    tracks={tracks}
                    isOverallRanking={itemName === 'tracks'}
                    spotifyToken={spotifyToken}
                    spotifyUserId={spotifyUserId}
                />
            </PageWrapper>
        ) : (
            <Redirect to="/select" />
        );
    }
}

const SharingPageRanking = ({ tracks, albumName }) => (
    <div className="sharing-page-ranking" id="share">
        <h4 className="text-center text-uppercase pb-2">
            {`My top 13 ${
                albumName === 'tracks' ? 'Taylor Swift' : albumName
            } songs`}
        </h4>
        <TrackListTable
            isAlbumRanking={albumName !== 'tracks'}
            tracks={tracks}
        />
        <p className="text-right">
            <b>#TSRANKED</b>
        </p>
    </div>
);

export default SharingPage;
