import React from 'react';

import { getTrack } from '../../api/albums';

import './TrackListTable.css';

const TrackListTable = ({ tracks }) => {
    const tableRows = tracks.map((track, index) => (
        <TrackListTableRow id={track} index={index} />
    ));

    return (
        <table className="table table-striped table-borderless table-tracks">
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
                <b>{index + 1}</b>
            </th>
            <td className="" width="1%">
                <img
                    className="album-image"
                    src={album.imageUrl ? album.imageUrl : track.imageUrl}
                    alt={albumName}
                />
            </td>
            <td className="text-truncate">
                {track.name}
            </td>
        </tr>
    );
};

export default TrackListTable;
