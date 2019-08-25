import React from 'react';

import { getTrack } from '../../api/albums';

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
                    handleClick={handleClick}
                />
            </td>
        </tr>
    );
};

const OrderControlButtonGroup = ({ trackIndex, handleClick }) => (
    <div className="btn-group" role="group">
        <OrderControlButton
            trackIndex={trackIndex}
            handleClick={handleClick}
            direction="up"
            disabled={trackIndex === 0}
        />
        <OrderControlButton
            trackIndex={trackIndex}
            handleClick={handleClick}
            direction="down"
            disabled={trackIndex === 12}
        />
    </div>
);

const OrderControlButton = ({
    trackIndex,
    handleClick,
    direction,
    disabled,
}) => (
    <button
        className="btn text-left"
        type="button"
        disabled={disabled}
        onClick={() => handleClick(trackIndex, direction)}
    >
        <i className={`fas fa-chevron-${direction}`} />
    </button>
);

export default TrackList;
