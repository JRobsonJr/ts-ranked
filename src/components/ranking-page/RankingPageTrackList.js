import React from 'react';

import { getTrack } from '../../api/albums';

import './RankingPageTrackList.css';

const RankingPageTrackList = ({ tracks }) => {
    const filteredTracks = tracks
        .filter(track => track.total > 0)
        .sort((a, b) => b.total - a.total);
    const tableRows = filteredTracks.map((track, index) => (
        <TrackListTableRow trackId={track.id} index={index} />
    ));

    return (
        <table className="table table-bordered table-ranking">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">ALBUM</th>
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </table>
    );
};

const TrackListTableRow = ({ trackId, index }) => {
    const { track, album } = getTrack(trackId);
    const albumName = track.albumName ? track.albumName : album.name;
    const albumImage = album.imageUrl || track.imageUrl || '';
    return (
        <tr>
            <th scope="row" width="1%">
                {index + 1}
            </th>
            <td>
                <img
                    src={albumImage}
                    alt={albumName}
                    className="album-image mr-2"
                />
                {track.name}
            </td>
            <td>
                <i>{albumName}</i>
            </td>
        </tr>
    );
};

export default RankingPageTrackList;
