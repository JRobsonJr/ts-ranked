import React, { Component } from 'react';

import { getTrackStats } from '../../api/requests';

import RankingPageTrackList from './RankingPageTrackList';

import './RankingPage.css';

class RankingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
        };
    }

    componentDidMount() {
        getTrackStats().then(response => {
            this.setState({ tracks: response.data });
        });
    }

    render(props) {
        const { tracks } = this.state;

        return (
            <div className="mx-1">
                <div className="container ranking-page shadow p-4 rounded-lg">
                    <h2>Overall Ranking</h2>
                    <p>Based on all user rankings.</p>
                    <RankingPageTrackList tracks={tracks} />
                </div>
            </div>
        );
    }
}

export default RankingPage;
