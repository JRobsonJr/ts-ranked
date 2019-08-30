import React, { Component } from 'react';

import SelectedTracksSection from '../selection-page/SelectedTracksSection';

import { albums } from '../../api/albums';
import { AlbumCardTrackList } from '../selection-page/AlbumAccordion';

class LoverRankPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
        };
    }

    handleClick = id => {
        this.setState(prevState => {
            let tracks = prevState.tracks;
            if (tracks.includes(id)) {
                tracks = tracks.filter(value => value !== id);
            } else {
                tracks.push(id);
            }
            return { tracks };
        });
    };

    moveTrack = (index, direction) => {
        const { tracks } = this.state;
        const auxIndex = direction === 'up' ? index - 1 : index + 1;
        const aux = tracks[auxIndex];
        tracks[auxIndex] = tracks[index];
        tracks[index] = aux;
        this.setState({ tracks });
    };

    removeTrack = index => {
        this.setState(prevState => {
            let tracks = prevState.tracks;
            tracks.splice(index, 1);
            return { tracks };
        });
    };

    render() {
        const { tracks } = this.state;

        return (
            <div className="selection-page row">
                <div className="col-12">
                    <h1 className="selection-page-title text-center px-2 py-4">
                        Select your 13 favorite songs
                    </h1>
                </div>
                <div className="col-lg-6">
                    <LoverRankPageSelectionSection
                        selectedTracks={tracks}
                        handleClick={this.handleClick}
                    />
                </div>
                <div className="col-lg-6">
                    <SelectedTracksSection
                        tracks={tracks}
                        removeTrack={this.removeTrack}
                        moveTrack={this.moveTrack}
                    />
                </div>
                <OrderingPageFooter tracksLength={tracks.length} />
            </div>
        );
    }
}

const LoverRankPageSelectionSection = ({ selectedTracks, handleClick }) => (
    <div className="selection-page-section container shadow p-4 rounded-lg">
        <div className="card album-card pb-0">
            <div className="card-header collapse-btn p-3">
                <b>
                    <i>Lover</i> tracklist
                </b>
            </div>
        </div>
        <AlbumCardTrackList
            collapse={false}
            album={albums[6]}
            selectedTracks={selectedTracks}
            handleClick={handleClick}
        />
    </div>
);

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
