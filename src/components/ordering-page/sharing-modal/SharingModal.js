import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import { addTrackScore } from '../../../api/requests';

import TrackListTable from './TrackListTable';
import SharingModalFooter from './SharingModalFooter';

import './SharingModal.css';

class SharingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributed:
                sessionStorage.getItem('contributed') === 'true' ? true : false,
        };
    }

    saveAsPng = async () => {
        const node = document.getElementById('share');
        const blob = await domtoimage.toBlob(node, {
            style: { height: '100%' },
            bgcolor: '#f5676c',
        });
        saveAs(blob, 'tsranked-top13.png');
    };

    submitRanking = () => {
        const { contributed } = this.state;
        const { tracks } = this.props;

        if (!contributed) {
            this.setState({ contributed: true });
            sessionStorage.setItem('contributed', 'true');

            return tracks.reduce(async (previousPromise, current, index) => {
                await previousPromise;
                return addTrackScore(current, 13 - index);
            }, Promise.resolve());
        }
    };

    render(props) {
        const { contributed } = this.state;
        const { tracks } = this.props;

        return (
            <div
                className="modal fade"
                id="modal-share"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-scrollable modal-share-dialog"
                    role="document"
                >
                    <div className="modal-content">
                        <SharingModalHeader />
                        <SharingModalBody tracks={tracks} />
                        <SharingModalFooter
                            contributed={contributed}
                            favoriteTrackId={tracks[0]}
                            saveAsPng={this.saveAsPng}
                            submitRanking={this.submitRanking}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const SharingModalHeader = () => (
    <div className="modal-header">
        <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
        >
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

const SharingModalBody = ({ tracks }) => (
    <div className="modal-body modal-share-body" id="share">
        <h1 className="text-center">TOP 13 TS SONGS</h1>
        <TrackListTable tracks={tracks} />
    </div>
);

export default SharingModal;
