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
    <div className="card">
        <div className="card-header collapse-btn" id={`heading-${album.id}`}>
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
        className="btn btn-block text-left"
        type="button"
        data-toggle="collapse"
        data-target={`#collapse-${album.id}`}
        aria-expanded="true"
        aria-controls={`collapse-${album.id}`}
    >
        <b>{album.name}</b> {album.year ? `(${album.year})` : ''}{' '}
        <span className="float-right">
            <i className="fas fa-chevron-down" />
        </span>
    </button>
);

const AlbumCardTrackList = ({ album, handleClick, selectedTracks }) => {
    const trackListItems = album.tracks.map(track => (
        <AlbumCardTrackListItem
            track={track}
            selected={selectedTracks.includes(track.id)}
            handleClick={handleClick}
        />
    ));

    return (
        <div
            id={`collapse-${album.id}`}
            className="collapse"
            aria-labelledby={`heading-${album.id}`}
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
        onClick={() => handleClick(track.id)}
    >
        {track.name}
        <span className="float-right">
            <i className={`far fa${selected ? '-check' : ''}-square`} />
        </span>
    </button>
);

export default AlbumAccordion;
