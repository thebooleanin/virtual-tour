import React, { useState } from 'react';
import { Pannellum } from "pannellum-react";
import './PannellumViewer.css';
import { useSelector } from 'react-redux';

function PannellumViewer() {
    const [currentScene, setCurrentScene] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const { scenes } = useSelector((state) => state.image);

    const goToScene = (sceneName) => {
        const sceneIndex = scenes.findIndex(scene => scene.name === sceneName);
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

    return (
        <div id="pannellum-viewer" className="pannellum-viewer">
            {scenes?.length ? (
                <>
                    <Pannellum
                        width="100%"
                        height="100%"
                        image={scenes[currentScene].image}
                        autoLoad
                        orientationOnByDefault
                        compass={true}
                        showZoomCtrl={false}
                        showFullscreenCtrl={false}
                        onLoad={() => {
                            console.log("panorama loaded");
                        }}
                    >
                        {scenes[currentScene].hotspots.map((hotspot, index) => (
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
                                {scenes.map((scene, index) => (
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
                            <button onClick={() => goToScene(scenes[(currentScene - 1 + scenes.length) % scenes.length].name)}>Previous</button>
                            <button onClick={() => goToScene(scenes[(currentScene + 1) % scenes.length].name)}>Next</button>
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
