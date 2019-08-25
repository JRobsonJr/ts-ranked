import React, { Component } from 'react';

import SelectedTracksSection from './SelectedTracksSection';
import SelectionPageFooter from './SelectionPageFooter';
import TrackSelectionSection from './TrackSelectionSection';

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

    render(props) {
        const { tracks } = this.state;

        return (
            <div className="selection-page row">
                <div className="col-12">
                    <h1 className="selection-page-title text-center px-2 py-4">
                        Select your 13 favorite songs
                    </h1>
                </div>
                <div className="col-lg-7">
                    <TrackSelectionSection
                        tracks={tracks}
                        handleClick={this.handleClick}
                    />
                </div>
                <div className="col-lg-5">
                    <SelectedTracksSection
                        tracks={tracks}
                        handleClick={this.handleClick}
                    />
                </div>
                <SelectionPageFooter tracksLength={tracks.length} />
            </div>
        );
    }
}

export default SelectionPage;
