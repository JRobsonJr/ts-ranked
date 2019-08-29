import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from '../home/HomePage';
import SelectionPage from '../selection-page/SelectionPage';
import RankingPage from '../ranking-page/RankingPage';
import SharingPage from '../sharing-page/SharingPage';
import ResultsPage from '../results-page/ResultsPage';
import SpotifyAuth from '../spotify/SpotifyAuth';
import LoverPage from '../lover-page/LoverPage';
import LoverRankPage from '../lover-page/LoverRankPage';

const App = () => (
    <>
        <Navbar />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/select" component={SelectionPage} />
            <Route exact path="/ranking" component={RankingPage} />
            <Route exact path="/share" component={SharingPage} />
            <Route exact path="/results" component={ResultsPage} />
            <Route exact path="/spotify-auth" component={SpotifyAuth} />
            <Route exact path="/lover" component={LoverPage} />
            <Route exact path="/lover/rank" component={LoverRankPage} />
        </Switch>
    </>
);

export default App;
