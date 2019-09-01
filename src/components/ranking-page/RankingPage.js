import React, { Component } from 'react';

import { getOverallScores, getLoverScores } from '../../api/requests';

import RankingPageTrackList from './RankingPageTrackList';
import PageWrapper from '../common/PageWrapper';

import './RankingPage.css';

class RankingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loverTracks: [],
            overallTracks: [],
        };
    }

    componentDidMount() {
        getOverallScores().then(response => {
            this.setState({ overallTracks: response.data });
        });
        getLoverScores().then(response => {
            this.setState({ loverTracks: response.data });
        });
    }

    render() {
        const { overallTracks, loverTracks } = this.state;
        console.log(overallTracks, loverTracks);
        return (
            <PageWrapper>
                <h2>Overall Ranking</h2>
                <p>Based on all user rankings.</p>
                <RankingPageTrackList tracks={overallTracks} />
                <h2>Lover Ranking</h2>
                <p>Based on all user rankings.</p>
                <RankingPageTrackList tracks={loverTracks} isAlbumRanking />
            </PageWrapper>
        );
    }
}

export default RankingPage;
