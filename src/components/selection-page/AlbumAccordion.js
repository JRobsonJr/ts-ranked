import React from 'react';

import './AlbumAccordion.css';

const AlbumAccordion = ({ albums, handleClick, selectedTracks }) => {
    const albumCards = albums.map(album => (
        <AlbumCard
            handleClick={handleClick}
            album={album}
            selectedTracks={selectedTracks}
        />
    ));

    return (
        <div className="accordion" id="album-accordion">
            {albumCards}
        </div>
    );
};

const AlbumCard = ({ album, handleClick, selectedTracks }) => (
    <div className="card album-card">
        <div
            className="card-header collapse-btn p-0"
            id={`heading-${album.spotifyId}`}
        >
            <AlbumCardCollapseButton album={album} />
        </div>
        <AlbumCardTrackList
            album={album}
            handleClick={handleClick}
            selectedTracks={selectedTracks}
        />
    </div>
);

const AlbumCardCollapseButton = ({ album }) => (
    <button
        className="btn btn-block text-left p-3"
        type="button"
        data-toggle="collapse"
        data-target={`#collapse-${album.spotifyId}`}
        aria-expanded="true"
        aria-controls={`collapse-${album.spotifyId}`}
    >
        <b>{album.name}</b> {album.year ? `(${album.year})` : ''}{' '}
        <span className="float-right">
            <i className="fas fa-chevron-down" />
        </span>
    </button>
);

export const AlbumCardTrackList = ({
    album,
    handleClick,
    selectedTracks,
    collapse = true,
}) => {
    const trackListItems = album.tracks.map(track => (
        <AlbumCardTrackListItem
            track={track}
            selected={selectedTracks.includes(track.spotifyId)}
            handleClick={handleClick}
        />
    ));

    return (
        <div
            id={`collapse-${album.spotifyId}`}
            className={collapse ? 'collapse' : ''}
            aria-labelledby={`heading-${album.spotifyId}`}
            data-parent="#album-accordion"
        >
            <div className="list-group list-group-flush">{trackListItems}</div>
        </div>
    );
};

const AlbumCardTrackListItem = ({ track, selected, handleClick }) => (
    <button
        type="button"
        className={`list-group-item list-group-item-action ${
            selected ? 'selected-track' : ''
        }`}
        onClick={() => handleClick(track.spotifyId)}
    >
        {track.name}
        <span className="float-right">
            <i className={`far fa${selected ? '-check' : ''}-square`} />
        </span>
    </button>
);

export default AlbumAccordion;
