import React from 'react';

const PageWrapper = ({ children }) => (
    <div className="mx-1">
        <div className="container ranking-page shadow p-4 rounded-lg">
            {children}
        </div>
    </div>
);

export default PageWrapper;
