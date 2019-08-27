import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SpotifyAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.history.location.hash.match(
                '[#&]access_token=([^&]*)'
            )[1],
        };
    }

    componentDidMount() {
        localStorage.setItem('token', this.state.token);
    }

    render() {
        const redirectParams = {
            pathname: '/share',
            state: { token: this.state.token },
        };
        if (this.state.token) {
            return <Redirect to={redirectParams} />;
        } else {
            return <Redirect to="/" />;
        }
    }
}

export default SpotifyAuth;
