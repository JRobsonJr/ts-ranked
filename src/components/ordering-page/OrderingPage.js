import React, { Component } from 'react';

import TrackList from './TrackList';

import './OrderingPage.css';

class OrderingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: sessionStorage.getItem('tracks').split(','),
        };
    }

    handleClick = (index, direction) => {
        const { tracks } = this.state;
        const auxIndex = direction === 'up' ? index - 1 : index + 1;
        const aux = tracks[auxIndex];
        tracks[auxIndex] = tracks[index];
        tracks[index] = aux;
        sessionStorage.setItem('tracks', tracks.join(','));
        this.setState({ tracks });
    };

    render(props) {
        const { tracks } = this.state;

        return (
            <div className="mx-1">
                <div className="container ordering-page shadow p-4 rounded-lg">
                    <h2>Order your 13 favorite Taylor Swift songs.</h2>
                    <p>Use the up and down arrows to move tracks around.</p>
                    <TrackList tracks={tracks} handleClick={this.handleClick} />
                </div>
            </div>
        );
    }
}

export default OrderingPage;
