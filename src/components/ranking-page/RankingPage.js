import React, { Component } from 'react';

import { getTrackStats } from '../../api/requests';

import RankingPageTrackList from './RankingPageTrackList';
import PageWrapper from '../common/PageWrapper';

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

    render() {
        const { tracks } = this.state;

        return (
            <PageWrapper>
                <h2>Overall Ranking</h2>
                <p>Based on all user rankings.</p>
                <RankingPageTrackList tracks={tracks} />
            </PageWrapper>
        );
    }
}

export default RankingPage;
