import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import TrackListTable from './TrackListTable';
import SharingModalFooter from './SharingModalFooter';

import './SharingModal.css';

class SharingModal extends Component {
    saveAsPng = async () => {
        const node = document.getElementById('share');
        const blob = await domtoimage.toBlob(node, {
            style: { height: '100%', position: 'relative', left: '0' },
            bgcolor: '#f5676c',
        });
        saveAs(blob, 'tsranked-top13.png');
    };

    render(props) {
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
                        <TrackListTable tracks={tracks} />
                        <SharingModalFooter
                            favoriteTrackId={tracks[0]}
                            saveAsPng={this.saveAsPng}
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
