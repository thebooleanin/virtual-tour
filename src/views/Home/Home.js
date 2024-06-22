import React from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import PannellumViewer from '../../components/PanoramaViewer/PannellumViewer';

const Home = () => {
    const location = useLocation();
    const getQueryParams = (query) => {
        return new URLSearchParams(query);
    };

    const queryParams = getQueryParams(location.search);
    console.log(queryParams, 'queryParams')
    const id = queryParams.get('id');
    const sceneName = queryParams.get('sceneName');

    return (
        <div>
            {/* <h1>Welcome to the Home Page</h1> */}
            {id ? (
                <PannellumViewer id={id} qsceneName={sceneName} />
            ) : (
                <p>No panorama ID provided.</p>
            )}
        </div>
    );
};

export default Home;
