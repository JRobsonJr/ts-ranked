import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import SelectionPage from '../selection-page/SelectionPage';
import OrderingPage from '../ordering-page/OrderingPage';

const App = () => (
    <>
        <Navbar />
        <Switch>
            <Route exact path="/" component={SelectionPage} />
            <Route exact path="/order" component={OrderingPage} />
        </Switch>
    </>
);

export default App;
