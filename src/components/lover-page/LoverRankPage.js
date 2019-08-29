import React, { Component } from 'react';

import ReorderTracksTable from '../common/ReorderTracksTable';
import PageWrapper from '../common/PageWrapper';

import { albums } from '../../api/albums';

class LoverRankPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: albums[6].tracks.map(t => t.spotifyId),
        };
    }

    handleClick = (index, direction) => {
        const { tracks } = this.state;
        const auxIndex = direction === 'up' ? index - 1 : index + 1;
        const aux = tracks[auxIndex];
        tracks[auxIndex] = tracks[index];
        tracks[index] = aux;
        this.setState({ tracks });
    };

    render() {
        const { tracks } = this.state;

        return (
            <PageWrapper>
                <h2>Reorder the Lover tracks around to form your ranking.</h2>
                <p>Use the up and down arrows to move tracks around.</p>
                <ReorderTracksTable
                    tracks={tracks}
                    handleClick={this.handleClick}
                />
                <OrderingPageFooter />
            </PageWrapper>
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
