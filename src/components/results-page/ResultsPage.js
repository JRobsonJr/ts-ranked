import React, { Component } from 'react';
import queryString from 'querystring';

import PageWrapper from '../common/PageWrapper';
import TrackListTable from '../common/TrackListTable';

import { getFullTrackId } from '../../api/albums';

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        const queryParams = queryString.parse(props.location.search);
        const albumName = queryParams['album'];
        const itemName = albumName ? albumName : '';
        const shortenedIds = queryParams['?tracks'].match(/.{1,2}/g);
        const fullIds = shortenedIds.map(id => getFullTrackId(id));
        this.state = {
            itemName,
            tracks: fullIds,
        };
    }

    render() {
        const { tracks, itemName } = this.state;

        return (
            <PageWrapper>
                <h1 className="text-center text-uppercase py-2">
                    {`These are my top 13 ${
                        itemName ? itemName : 'Taylor Swift'
                    } songs!`}
                </h1>
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <TrackListTable tracks={tracks} />
                        <a
                            className="btn btn-block btn-outline-primary"
                            href={`/${itemName}`}
                        >
                            Generate your own Top 13 with TS Ranked!
                        </a>
                    </div>
                </div>
            </PageWrapper>
        );
    }
}

export default ResultsPage;
