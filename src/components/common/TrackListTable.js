import React from 'react';

import { getTrack } from '../../api/albums';

import './TrackListTable.css';

const TrackListTable = ({ tracks, isAlbumRanking }) => {
    const tableRows = tracks.map((track, index) => (
        <TrackListTableRow
            id={track}
            index={index}
            isAlbumRanking={isAlbumRanking}
        />
    ));

    return (
        <table className="table table-striped table-borderless table-tracks table-responsive">
            <tbody>{tableRows}</tbody>
        </table>
    );
};

const TrackListTableRow = ({ id, index, isAlbumRanking }) => {
    const { track, album } = getTrack(id);
    const albumName = track.albumName ? track.albumName : album.name;
    const albumImage = (
        <td width="1%">
            <img
                className="album-image"
                src={album.imageUrl ? album.imageUrl : track.imageUrl}
                alt={albumName}
            />
        </td>
    );
    return (
        <tr>
            <th scope="row" width="1%">
                <b>{index + 1}</b>
            </th>
            {isAlbumRanking ? null : albumImage}
            <td className="text-truncate">{track.name}</td>
        </tr>
    );
};

export default TrackListTable;
