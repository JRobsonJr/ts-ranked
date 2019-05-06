import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import TrackList from './TrackList';
import SharingModal from './sharing-modal/SharingModal';

import { addTrackScore, incrementUses } from '../../api/requests';

import './OrderingPage.css';

class OrderingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributed:
                localStorage.getItem('contributed') === 'true' ? true : false,
            tracks: localStorage.getItem('tracks')
                ? localStorage.getItem('tracks').split(',')
                : [],
        };
    }

    handleClick = (index, direction) => {
        const { tracks } = this.state;
        const auxIndex = direction === 'up' ? index - 1 : index + 1;
        const aux = tracks[auxIndex];
        tracks[auxIndex] = tracks[index];
        tracks[index] = aux;
        localStorage.setItem('tracks', tracks.join(','));
        this.setState({ tracks });
    };

    submitRanking = async () => {
        const { contributed, tracks } = this.state;

        if (!contributed) {
            this.setState({ contributed: true });
            localStorage.setItem('contributed', 'true');
            await incrementUses();
            return tracks.reduce(async (previousPromise, current, index) => {
                await previousPromise;
                return addTrackScore(current, 13 - index);
            }, Promise.resolve());
        }
    };

    render(props) {
        const { tracks } = this.state;

        return tracks.length === 13 ? (
            <div className="mx-1">
                <div className="container ordering-page shadow p-4 rounded-lg">
                    <h2>Order your 13 favorite Taylor Swift songs.</h2>
                    <p>Use the up and down arrows to move tracks around.</p>
                    <TrackList tracks={tracks} handleClick={this.handleClick} />
                    <SharingModal tracks={tracks} />
                    <OrderingPageFooter submitRanking={this.submitRanking} />
                </div>
            </div>
        ) : (
            <Redirect to="/select" />
        );
    }
}

const OrderingPageFooter = ({ submitRanking }) => (
    <div className="footer fixed-bottom shadow-lg">
        <div className="container">
            <div className="p-3 text-center">
                <button
                    className="btn btn-footer"
                    data-toggle="modal"
                    data-target="#modal-share"
                    onClick={() => submitRanking()}
                >
                    CONFIRM ORDER
                </button>
            </div>
        </div>
    </div>
);

export default OrderingPage;
