import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AlbumAccordion from './AlbumAccordion';

import { albums } from '../../api/albums';

import './SelectionPage.css';

class SelectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: sessionStorage.getItem('tracks')
                ? sessionStorage.getItem('tracks').split(',')
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
            sessionStorage.setItem('tracks', tracks.join(','));
            return { tracks };
        });
    };

    render(props) {
        const { tracks } = this.state;

        return (
            <div className="container selection-page shadow p-4 rounded-lg">
                <h2 className="pb-4">
                    Select your 13 favorite Taylor Swift tracks.
                </h2>
                <AlbumAccordion
                    albums={albums}
                    handleClick={this.handleClick}
                    selectedTracks={tracks}
                />
                <Footer tracksLength={tracks.length} />
            </div>
        );
    }
}

const Footer = ({ tracksLength }) => (
    <div className="footer fixed-bottom shadow-lg">
        <div className="container">
            <div className="row p-3 justify-content-between">
                <div className="col-auto align-self-center">
                    <h6 className="mb-0">
                        Selected {tracksLength}/13 track(s)
                    </h6>
                </div>
                <div className="col-auto align-self-center">
                    <Link className="btn btn-footer" to="/order">
                        PROCEED!
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default SelectionPage;
