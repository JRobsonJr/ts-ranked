import React from 'react';

import ReorderTracksTable from '../common/ReorderTracksTable';
import { getTrack } from '../../api/albums';

const SelectedTracksSection = ({ tracks, removeTrack, moveTrack }) => (
    <div className="selection-page-section container shadow p-4 rounded-lg table-ranking">
        <h3>Currently selected tracks</h3>
        {tracks.length > 0 ? (
            <p>
                Use the <i className="fas fa-chevron-up" /> and{' '}
                <i className="fas fa-chevron-down" /> buttons to reorder your
                selected tracks and click the <i className="fas fa-times" />{' '}
                icon to remove a track from your selection.
            </p>
        ) : (
            <p>
                Your selected tracks will appear here once you start selecting.
                Go, go, go!
            </p>
        )}
        <ReorderTracksTable
            tracks={tracks}
            removeTrack={removeTrack}
            moveTrack={moveTrack}
        />
    </div>
);

const TrackList = ({ tracks, handleClick }) => {
    const tableRows = tracks.map((track, index) => (
        <TrackListTableRow
            handleClick={handleClick}
            trackId={track}
            index={index}
        />
    ));

    return (
        <table className="table table-borderless table-alternate-colors">
            <tbody>{tableRows}</tbody>
        </table>
    );
};

const TrackListTableRow = ({ trackId, index, handleClick }) => {
    const { track, album } = getTrack(trackId);
    return (
        <tr>
            <td width="1%">
                <img
                    src={album.imageUrl || track.imageUrl || ''}
                    alt={album.name}
                    className="album-image"
                />
            </td>
            <td>{track.name}</td>
            <td width="1%">
                <button
                    onClick={() => handleClick(track.spotifyId)}
                    className="btn btn-block"
                    type="button"
                >
                    <i className="fas fa-times" />
                </button>
            </td>
        </tr>
    );
};

export default SelectedTracksSection;
