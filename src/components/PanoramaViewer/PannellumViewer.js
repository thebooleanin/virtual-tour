import React, { useEffect, useState } from 'react';
import { Pannellum } from "pannellum-react";
import './PannellumViewer.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImagesRequest, fetchImagesFailure, fetchImagesSuccess } from '../../redux/actions/imageActions'
import axios from 'axios';

function PannellumViewer({ id }) {
    const dispatch = useDispatch()
    const [currentScene, setCurrentScene] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const { scenes } = useSelector((state) => state.image);
    const [items, setItems] = useState(null)
    const goToScene = (sceneName) => {
        const sceneIndex = items.findIndex(scene => scene.name === sceneName);
        if (sceneIndex !== -1) {
            setCurrentScene(sceneIndex);
            setMenuOpen(false); // Close menu on scene change
        }
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
    useEffect(() => {
        dispatch(fetchImagesRequest());
        axios.get(`${process.env.REACT_APP_BACKEND_URI}/${id}`)
            .then(response => {
                console.log(response.data, 'response.data')
                let data = []
                if (response.data?.result?.length) {
                    data = response.data?.result?.map((el) => {
                        return {
                            name: el.sceneName,
                            image: el.filePath,
                            hotspots: el?.hotspots
                        }
                    })
                }
                dispatch(fetchImagesSuccess(data))
            })
            .catch(error => dispatch(fetchImagesFailure(error)));
    }, []);
    useEffect(() => {
        if (scenes?.length) {
            setItems(scenes)
        }
    }, [scenes])
    return (
        <div id="pannellum-viewer" className="pannellum-viewer">
            {items?.length ? (
                <>
                    <Pannellum
                        width="100%"
                        height="100%"
                        image={items[currentScene].image}
                        autoLoad
                        orientationOnByDefault
                        compass={true}
                        showZoomCtrl={false}
                        showFullscreenCtrl={false}
                        onLoad={() => {
                            console.log("panorama loaded");
                        }}
                    >
                        {items[currentScene].hotspots.map((hotspot, index) => (
                            <Pannellum.Hotspot
                                key={`hotspot-${index}`}
                                type="custom"
                                pitch={hotspot.position[1]}
                                yaw={hotspot.position[0]}
                                handleClick={() => goToScene(hotspot.targetScene)}
                                name={`hs-${index}`}
                            />
                        ))}
                    </Pannellum>
                    <div className="overlay">
                        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                            &#9776; {/* Unicode for hamburger icon */}
                        </button>
                        {menuOpen && (
                            <div className="scene-names">
                                {items.map((scene, index) => (
                                    <button
                                        key={`scene-${index}`}
                                        onClick={() => goToScene(scene.name)}
                                        className={`scene-name ${currentScene === index ? 'active' : ''}`}
                                    >
                                        {scene.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="navigation-buttons">
                            <button onClick={() => goToScene(items[(currentScene - 1 + items.length) % items.length].name)}>Previous</button>
                            <button onClick={() => goToScene(items[(currentScene + 1) % items.length].name)}>Next</button>
                        </div>
                    </div>
                </>
            ) : (
                <div>No scenes available.</div>
            )}
        </div>
    );
}

export default PannellumViewer;
