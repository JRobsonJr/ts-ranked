import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from '../home/HomePage';
import SelectionPage from '../selection-page/SelectionPage';
import OrderingPage from '../ordering-page/OrderingPage';
import RankingPage from '../ranking-page/RankingPage';
import SharingPage from '../sharing-page/SharingPage';

const App = () => (
    <>
        <Navbar />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/select" component={SelectionPage} />
            <Route exact path="/order" component={OrderingPage} />
            <Route exact path="/ranking" component={RankingPage} />
            <Route exact path="/share" component={SharingPage} />
        </Switch>
    </>
);

export default App;
