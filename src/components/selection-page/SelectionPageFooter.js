import React from 'react';
import { Link } from 'react-router-dom';

const SelectionPageFooter = ({ albumName, tracksLength, submitRanking }) => {
    const redirectParams = {
        pathname: 'share',
        search: albumName ? `?album=${albumName}` : '',
    };

    return (
        <div className="footer fixed-bottom shadow-lg">
            <div className="container">
                <div className="row p-3 justify-content-between text-center">
                    <div className="col-lg-auto align-self-center">
                        <h6 className="mb-0 selected-tracks">
                            Selected {tracksLength}/13 track(s)
                        </h6>
                    </div>
                    {tracksLength === 13 ? (
                        <div className="col-lg-auto align-self-center">
                            <Link
                                onClick={() => submitRanking()}
                                className="btn btn-footer"
                                to={redirectParams}
                            >
                                PROCEED!
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SelectionPageFooter;
