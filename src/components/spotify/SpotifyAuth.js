import React from 'react';
import { Redirect } from 'react-router-dom';

const SpotifyAuth = ({ history }) => {
    const token = history.location.hash.match('[#&]access_token=([^&]*)')[1];
    const redirectParams = {
        pathname: '/share',
        state: { token },
    };

    return <Redirect to={redirectParams} />;
};

export default SpotifyAuth;
