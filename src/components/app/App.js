import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import SelectionPage from '../selection-page/SelectionPage';
import OrderingPage from '../ordering-page/OrderingPage';
import RankingPage from '../ranking-page/RankingPage';

const App = () => (
    <>
        <Navbar />
        <Switch>
            <Route exact path="/" component={SelectionPage} />
            <Route exact path="/order" component={OrderingPage} />
            <Route exact path="/ranking" component={RankingPage} />
        </Switch>
    </>
);

export default App;
