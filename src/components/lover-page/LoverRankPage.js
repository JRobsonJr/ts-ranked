import React, { Component } from 'react';

import TrackList from '../ordering-page/TrackList';
import { albums } from '../../api/albums';

class LoverRankPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: albums[6].tracks.map(t => t.spotifyId),
        };
    };

    render() {
        const { tracks } = this.state;

        return (
            <div className="mx-1">
                <div className="container ordering-page shadow p-4 rounded-lg">
                    <h2>Order your 13 favorite Taylor Swift songs.</h2>
                    <p>Use the up and down arrows to move tracks around.</p>
                    <TrackList tracks={tracks} handleClick={this.handleClick} />
                    <OrderingPageFooter />
                </div>
            </div>
        );
    }
}

const OrderingPageFooter = ({ submitRanking }) => (
    <div className="footer fixed-bottom shadow-lg">
        <div className="container">
            <div className="p-3 text-center">
                <a
                    href="/lover/share"
                    className="btn btn-footer"
                    onClick={() => submitRanking()}
                >
                    CONFIRM ORDER
                </a>
            </div>
        </div>
    </div>
);

export default LoverRankPage;
