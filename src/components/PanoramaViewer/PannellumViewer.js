import React, { useEffect, useState } from 'react';
import { Pannellum } from "pannellum-react";
import './PannellumViewer.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImagesSuccess, fetchImagesFailure, fetchImagesRequest } from '../../redux/actions/imageActions';

function PannellumViewer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();
    const { images } = useSelector((state) => state.image);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    const handleFullScreen = () => {
        const elem = document.getElementById('pannellum-viewer');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    };

    // useEffect(() => {
    //     dispatch(fetchImagesRequest());
    //     fetch('your-api-url')
    //         .then(response => response.json())
    //         .then(data => dispatch(fetchImagesSuccess(data)))
    //         .catch(error => dispatch(fetchImagesFailure(error)));
    // }, [dispatch]);

    return (
        <div id="pannellum-viewer" className="pannellum-viewer">
            {images?.length ? (
                <>
                    <Pannellum
                        width="100%"
                        height="100%"
                        image={images[currentIndex].Images.ImageBase64}
                        autoLoad
                        orientationOnByDeffault
                        compass={true}
                        showZoomCtrl={false}
                        showFullscreenCtrl={false}
                        onLoad={() => {
                            console.log("panorama loaded");
                        }}
                    >
                        <Pannellum.Hotspot
                            key={`hotspot-${currentIndex}`}
                            type="custom"
                            pitch={images[currentIndex].Images.coOrdinates[1]}
                            yaw={images[currentIndex].Images.coOrdinates[0]}
                            handleClick={() => nextImage()}
                            name={`hs-next`}
                        />
                    </Pannellum>
                    <div className="overlay">
                        <div className="scene-names">
                            {images.map((image, index) => (
                                <button
                                    key={`scene-${index}`}
                                    onClick={() => goToImage(index)}
                                    className={`scene-name ${currentIndex === index ? 'active' : ''}`}
                                >
                                    {image.SceneName}
                                </button>
                            ))}
                        </div>
                        {/* <button className="fullscreen-button" onClick={handleFullScreen}>Full Screen</button> */}
                        <div className="navigation-buttons">
                            <button onClick={prevImage}>Previous</button>
                            <button onClick={nextImage}>Next</button>
                        </div>
                    </div>
                </>
            ) : (
                <div>No images available.</div>
            )}
        </div>
    );
}

export default PannellumViewer;
