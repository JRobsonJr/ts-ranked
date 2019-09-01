import React from 'react';

import { getTrack } from '../../api/albums';

import './RankingPageTrackList.css';

const RankingPageTrackList = ({ tracks, isAlbumRanking }) => {
    const sortedTracks = tracks.sort((a, b) => b.score - a.score);
    const tableRows = sortedTracks.map((track, index) => (
        <TrackListTableRow
            trackId={track.trackId}
            index={index}
            isAlbumRanking={isAlbumRanking}
        />
    ));

    return (
        <table className="table table-bordered table-ranking">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">TITLE</th>
                    {!isAlbumRanking && <th scope="col">ALBUM</th>}
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </table>
    );
};

const TrackListTableRow = ({ trackId, index, isAlbumRanking }) => {
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
            {!isAlbumRanking && (
                <td>
                    <i>{albumName}</i>
                </td>
            )}
        </tr>
    );
};

export default RankingPageTrackList;
