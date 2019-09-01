import React from 'react';

import './PageWrapper.css';

const PageWrapper = ({ children }) => (
    <div className="mx-1">
        <div className="container page-wrapper shadow p-4 rounded-lg">
            {children}
        </div>
    </div>
);

export default PageWrapper;
