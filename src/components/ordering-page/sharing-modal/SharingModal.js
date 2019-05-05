import React, { Component } from 'react';

import TrackListTable from './TrackListTable';

import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import './SharingModal.css';

class SharingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: sessionStorage.getItem('tracks').split(','),
        };
    }

    saveAsPng = async () => {
        const node = document.getElementById('share');
        const blob = await domtoimage.toBlob(node, {
            style: { height: '100%' },
        });
        saveAs(blob, 'ts-top13.png');
    };

    render(props) {
        const { tracks } = this.state;

        return (
            <div
                className="modal fade noah"
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
                        <SharingModalFooter saveAsPng={this.saveAsPng} />
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

const SharingModalFooter = ({ saveAsPng }) => (
    <div className="modal-footer">
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => saveAsPng()}
        >
            Save as PNG
        </button>
    </div>
);

export default SharingModal;
