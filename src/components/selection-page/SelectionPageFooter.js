import React from 'react';
import { Link } from 'react-router-dom';

const SelectionPageFooter = ({ tracksLength }) => (
    <div className="footer fixed-bottom shadow-lg">
        <div className="container">
            <div className="row p-3 justify-content-between text-center">
                <div className="col-lg-auto align-self-center">
                    <h6 className="mb-0 selected-tracks">
                        Selected {tracksLength}/13 track(s)
                    </h6>
                </div>
                <div className="col-lg-auto align-self-center">
                    {tracksLength === 13 ? (
                        <Link className="btn btn-footer" to="/order">
                            PROCEED!
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    </div>
);

export default SelectionPageFooter;
