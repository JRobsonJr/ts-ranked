import React, { Component } from 'react';
import queryString from 'querystring';

import TrackListTable from '../common/TrackListTable';

import { getFullTrackId } from '../../api/albums';
import PageWrapper from '../common/PageWrapper';

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        const { location } = props;
        const queryParams = queryString.parse(location.search);
        const shortenedIds = queryParams['?tracks'].match(/.{1,2}/g);
        const fullIds = shortenedIds.map(id => getFullTrackId(id));
        this.state = {
            tracks: fullIds,
        };
    }

    render() {
        return (
            <PageWrapper>
                <h1 className="text-center py-2">
                    These are my Top 13 Taylor Swift tracks!
                </h1>
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <TrackListTable tracks={this.state.tracks} />
                        <a
                            className="btn btn-block btn-outline-primary"
                            href="/"
                        >
                            Generate your own Top 13 with TS Ranked
                        </a>
                    </div>
                </div>
            </PageWrapper>
        );
    }
}

export default ResultsPage;
