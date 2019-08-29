import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import TrackListTable from '../common/TrackListTable';
import SharingPageFooter from './SharingPageFooter';

import { init, getCurrentUserProfile } from 'spotify-web-sdk';
import { postRankingToImgur } from '../../api/images';

import './SharingPage.css';

class SharingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: localStorage.getItem('tracks')
                ? localStorage.getItem('tracks').split(',')
                : [],
            spotifyToken: this.props.location.state
                ? this.props.location.state.token
                : '',
            imgurUrl: '',
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
        postRankingToImgur(document.getElementById('share')).then(imgurUrl =>
            this.setState({ imgurUrl })
        );
    }

    render() {
        const { tracks, spotifyToken, imgurUrl } = this.state;

        return tracks.length === 13 ? (
            <div className="mx-1">
                <div className="container ordering-page shadow p-4 rounded-lg">
                    <SharingPageRanking
                        tracks={localStorage.getItem('tracks').split(',')}
                    />
                    <TrackListTable tracks={tracks} />
                    <SharingPageFooter
                        spotifyToken={spotifyToken}
                        spotifyUserId={this.state.spotifyUserId}
                        imgurUrl={imgurUrl}
                        favoriteTrackId={tracks[0]}
                    />
                </div>
            </div>
        ) : (
            <Redirect to="/select" />
        );
    }
}

const SharingPageRanking = ({ tracks }) => (
    <div className="sharing-page-ranking" id="share">
        <h1 className="text-center">My Top 13 TS songs</h1>
        <TrackListTable tracks={tracks} />
    </div>
);

export default SharingPage;
