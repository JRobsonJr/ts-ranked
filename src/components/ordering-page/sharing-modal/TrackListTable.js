import React from 'react';

import { getTrack } from '../../../api/albums';

import './TrackListTable.css';

const TrackListTable = ({ tracks }) => {
    const tableRows = tracks.map((track, index) => (
        <TrackListTableRow id={track} index={index} />
    ));

    return (
        <table className="table table-striped table-borderless table-tracks shadow-lg">
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
    const albumName = track.albumName ? track.albumName : album.name;
    return (
        <tr>
            <th scope="row" width="1%">
                {index + 1}
            </th>
            <td className="text-truncate">
                {track.name}, <i>{albumName}</i>
            </td>
        </tr>
    );
};

export default TrackListTable;
