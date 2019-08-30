import React, { Component } from 'react';
import queryString from 'querystring';

import SelectedTracksSection from './SelectedTracksSection';
import SelectionPageFooter from './SelectionPageFooter';
import TrackSelectionSection from './TrackSelectionSection';

import { addTrackScore, incrementUses } from '../../api/requests';

import './SelectionPage.css';

class SelectionPage extends Component {
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
            localStorage.setItem(prevState.itemName, tracks.join(','));
            return { tracks };
        });
    };

    moveTrack = (index, direction) => {
        const { tracks, itemName } = this.state;
        const auxIndex = direction === 'up' ? index - 1 : index + 1;
        const aux = tracks[auxIndex];
        tracks[auxIndex] = tracks[index];
        tracks[index] = aux;
        localStorage.setItem(itemName, tracks.join(','));
        this.setState({ tracks });
    };

    removeTrack = index => {
        this.setState(prevState => {
            let tracks = prevState.tracks;
            tracks.splice(index, 1);
            localStorage.setItem(prevState.itemName, tracks.join(','));
            return { tracks };
        });
    };

    render() {
        const { tracks, itemName } = this.state;

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
                <SelectionPageFooter
                    tracksLength={tracks.length}
                    albumName={itemName === 'tracks' ? '' : itemName}
                />
            </div>
        );
    }
}

export default SelectionPage;
