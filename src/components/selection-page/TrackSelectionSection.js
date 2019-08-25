import React from 'react';

import AlbumAccordion from './AlbumAccordion';

import { albums } from '../../api/albums';

const TrackSelectionSection = ({ tracks, handleClick }) => (
    <div className="selection-page-section container shadow p-4 rounded-lg">
        <p className="mb-1">
            Click an album title to reveal its tracklist, and then click a song
            title to add it to your 13 favorite songs.
        </p>
        <p>
            Don't bother selecting in order; you'll be able to reorganize your
            ranking in the next step.
        </p>
        <AlbumAccordion
            albums={albums}
            handleClick={handleClick}
            selectedTracks={tracks}
        />
    </div>
);

export default TrackSelectionSection;
