import React from 'react';

import AlbumAccordion, { AlbumCardTrackList } from './AlbumAccordion';

import { albums } from '../../api/albums';

const TrackSelectionSection = ({ tracks, handleClick, albumName }) =>
    albumName === 'lover' ? (
        <LoverTracksSelectionSection
            album={albums[6]}
            tracks={tracks}
            handleClick={handleClick}
        />
    ) : (
        <OverallTrackSelectionSection
            tracks={tracks}
            handleClick={handleClick}
        />
    );

const OverallTrackSelectionSection = ({ tracks, handleClick }) => (
    <div className="selection-page-section container shadow p-4 rounded-lg">
        <p>
            Click an album title to reveal its tracklist, and then click a song
            title to add it to your 13 favorite songs.
        </p>
        <AlbumAccordion
            albums={albums}
            handleClick={handleClick}
            selectedTracks={tracks}
        />
    </div>
);

const LoverTracksSelectionSection = ({ album, tracks, handleClick }) => (
    <div className="selection-page-section container shadow p-4 rounded-lg">
        <h3>Click a song title to add it to your 13 favorite Lover songs.</h3>
        <div className="card album-card">
            <div className="card-header collapse-btn p-0">
                <button className="btn btn-block text-left p-3" type="button">
                    <b>{album.name}</b> {album.year ? `(${album.year})` : ''}{' '}
                </button>
            </div>
            <AlbumCardTrackList
                collapse={false}
                album={album}
                handleClick={handleClick}
                selectedTracks={tracks}
            />
        </div>
    </div>
);

export default TrackSelectionSection;
