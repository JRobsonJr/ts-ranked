import React from 'react';

import { getTrack } from '../../api/albums';

const TrackList = ({ tracks, handleClick }) => {
    const trackListItems = tracks.map((track, index) => (
        <TrackListItem
            handleClick={handleClick}
            trackId={track}
            index={index}
        />
    ));

    return <ul className="list-group">{trackListItems}</ul>;
};

const TrackListItem = ({ trackId, index, handleClick }) => {
    const { track, album } = getTrack(trackId);
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <img
                    src={album.imageUrl || track.imageUrl || ''}
                    alt="album"
                    className="album mr-2"
                />
                {track.name}
            </div>
            <OrderControlButtonGroup
                trackIndex={index}
                handleClick={handleClick}
            />
        </li>
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
        <i className={`fas fa-long-arrow-alt-${direction}`} />
    </button>
);

export default TrackList;
