import React from 'react';
import PanoramaViewer from '../../components/PanoramaViewer/PanoramaViewer';
import FileUploader from '../../components/FileUploader/FileUploader';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>3D Tour</h1>
            <FileUploader />
            <PanoramaViewer />
        </div>
    );
};

export default Home;
