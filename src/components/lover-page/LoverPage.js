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
            <div className="col-lg-6">
                <h1 className="display-2">
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
                <div
                    className="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                >
                    <a
                        className="btn btn-lg btn-outline-dark badge-pill"
                        href="/lover/rank"
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
            <div className="col-lg-6 align-self-center">
                <img
                    src="https://i.scdn.co/image/e30b81b756002dffe808888a4b67461e15e67681"
                    className="ranking-example p-4"
                    alt="Lover"
                />
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
