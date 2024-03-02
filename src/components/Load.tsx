import React from 'react';
import '../Styles/Load.css';

const Load: React.FC = () => {
    return (
        <div className="mt-16">
            <div className="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
    )
}
export default Load;