import React from 'react';

import { getTrack } from '../../api/albums';

const ReorderTracksTable = ({ tracks, removeTrack, moveTrack }) => {
    const tableRows = tracks.map((track, index) => (
        <TrackListTableRow
            removeTrack={removeTrack}
            moveTrack={moveTrack}
            trackId={track}
            index={index}
            tracksLength={tracks.length}
        />
    ));

    return (
        <table className="table table-borderless table-alternate-colors table-responsive">
            <tbody>{tableRows}</tbody>
        </table>
    );
};

const TrackListTableRow = ({
    trackId,
    index,
    removeTrack,
    moveTrack,
    tracksLength,
}) => {
    const { track, album } = getTrack(trackId);
    return (
        <tr>
            <th scope="row" width="1%">
                <h4 className="mb-0">{index + 1}</h4>
            </th>
            <td width="1%">
                <img
                    src={album.imageUrl || track.imageUrl || ''}
                    alt={album.name}
                    className="album-image"
                />
            </td>
            <td>{track.name}</td>
            <td width="1%">
                <OrderControlButtonGroup
                    trackIndex={index}
                    moveTrack={moveTrack}
                    removeTrack={removeTrack}
                    tracksLength={tracksLength}
                />
            </td>
        </tr>
    );
};

const OrderControlButtonGroup = ({
    trackIndex,
    removeTrack,
    moveTrack,
    tracksLength,
}) => (
    <div className="btn-group" role="group">
        <OrderControlButton
            trackIndex={trackIndex}
            moveTrack={moveTrack}
            direction="up"
            disabled={trackIndex === 0}
        />
        <OrderControlButton
            trackIndex={trackIndex}
            moveTrack={moveTrack}
            direction="down"
            disabled={trackIndex === tracksLength - 1}
        />
        <button
            onClick={() => removeTrack(trackIndex)}
            className="btn btn-block"
            type="button"
        >
            <i className="fas fa-times" />
        </button>
    </div>
);

const OrderControlButton = ({ trackIndex, moveTrack, direction, disabled }) => (
    <button
        className="btn text-left"
        type="button"
        disabled={disabled}
        onClick={() => moveTrack(trackIndex, direction)}
    >
        <i className={`fas fa-chevron-${direction}`} />
    </button>
);

export default ReorderTracksTable;
