import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import TrackListTable from './TrackListTable';
import SharingPageFooter from './SharingPageFooter';

import { addTrackScore, incrementUses } from '../../api/requests';

import './SharingPage.css';

class SharingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    <SharingPageRanking
                        tracks={localStorage.getItem('tracks').split(',')}
                    />
                    <TrackListTable tracks={tracks} />
                    <SharingPageFooter
                        token={
                            this.props.location.state
                                ? this.props.location.state.token
                                : ''
                        }
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
