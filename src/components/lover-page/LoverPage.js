import React from 'react';

import './LoverPage.css';

const LoverPage = () => (
    <div className="mx-1">
        <MainSection />
        <CriticsSection />
    </div>
);

const MainSection = () => (
    <div className="container container-home text-center">
        <div className="row">
            <div className="col-md-6 align-self-center">
                <img
                    src="https://i.scdn.co/image/e30b81b756002dffe808888a4b67461e15e67681"
                    className="ranking-example pl-3 py-3"
                    alt="Lover"
                />
            </div>
            <div className="col-md-6 align-self-center">
                <h1 className="display-3">
                    <i>Lover</i> is out now!
                </h1>
                <h3>
                    Taylor's seventh studio album is also her most critically
                    acclaimed body of work up to date.
                </h3>
                <h5>
                    Can you choose your favorite <b>13</b> songs?
                </h5>
                <h5>The good ones never wait, so...</h5>
                <div className="btn-group mr-2" role="group">
                    <a
                        className="btn btn-lg btn-outline-dark badge-pill"
                        href="/select?album=lover"
                    >
                        Start now
                    </a>
                    <a
                        className="btn btn-lg btn-outline-dark badge-pill"
                        href="https://taylorswift.lnk.to/loverWe"
                    >
                        Stream Lover
                    </a>
                </div>
            </div>
        </div>
    </div>
);

const CriticsSection = () => (
    <div className="container container-home">
        <h1>Here's how the critics have been ranking the album:</h1>
        <h2>Billboard</h2>
        <h1>LA Times</h1>
    </div>
);

export default LoverPage;
