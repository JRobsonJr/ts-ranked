import React from 'react';

import { getTrack } from '../../../api/albums';

import './TrackListTable.css';

const TrackListTable = ({ tracks }) => {
    const tableRows = tracks.map((track, index) => (
        <TrackListTableRow id={track} index={index} />
    ));

    return (
        <table className="table table-striped table-tracks shadow-lg">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">TITLE</th>
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </table>
    );
};

const TrackListTableRow = ({ id, index }) => {
    const { track, album } = getTrack(id);
    return (
        <tr>
            <th scope="row" width="1%">
                {index + 1}
            </th>
            <td>
                {track.name}, <i>{album.name}</i>
            </td>
        </tr>
    );
};

export default TrackListTable;
