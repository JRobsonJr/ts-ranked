import React from 'react';

import ReorderTracksTable from '../common/ReorderTracksTable';

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

export default SelectedTracksSection;
