import React from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import PannellumViewer from '../../components/PanoramaViewer/PannellumViewer';

const Home = () => {
    const location = useLocation();

    // Function to parse query parameters
    const getQueryParams = (query) => {
        return new URLSearchParams(query);
    };

    const queryParams = getQueryParams(location.search);
    const id = queryParams.get('id');

    return (
        <div>
            {/* <h1>Welcome to the Home Page</h1> */}
            {id ? (
                <PannellumViewer id={id} />
            ) : (
                <p>No panorama ID provided.</p>
            )}
        </div>
    );
};

export default Home;
