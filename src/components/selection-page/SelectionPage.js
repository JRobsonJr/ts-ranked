import React, { Component } from 'react';

import SelectedTracksSection from './SelectedTracksSection';
import SelectionPageFooter from './SelectionPageFooter';
import TrackSelectionSection from './TrackSelectionSection';

import { addTrackScore, incrementUses } from '../../api/requests';

import './SelectionPage.css';

class SelectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: localStorage.getItem('tracks')
                ? localStorage.getItem('tracks').split(',')
                : [],
        };
    }

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
    
    handleClick = id => {
        this.setState(prevState => {
            let tracks = prevState.tracks;
            if (tracks.includes(id)) {
                tracks = tracks.filter(value => value !== id);
            } else {
                tracks.push(id);
            }
            localStorage.setItem('tracks', tracks.join(','));
            return { tracks };
        });
    };

    moveTrack = (index, direction) => {
        const { tracks } = this.state;
        const auxIndex = direction === 'up' ? index - 1 : index + 1;
        const aux = tracks[auxIndex];
        tracks[auxIndex] = tracks[index];
        tracks[index] = aux;
        localStorage.setItem('tracks', tracks.join(','));
        this.setState({ tracks });
    };

    removeTrack = index => {
        this.setState(prevState => {
            let tracks = prevState.tracks;
            tracks.splice(index, 1);
            localStorage.setItem('tracks', tracks.join(','));
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
                    <TrackSelectionSection
                        tracks={tracks}
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
                <SelectionPageFooter tracksLength={tracks.length} />
            </div>
        );
    }
}

export default SelectionPage;
