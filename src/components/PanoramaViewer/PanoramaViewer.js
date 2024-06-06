import React, { useRef, useEffect } from 'react';
import * as PANOLENS from 'panolens';
import * as THREE from 'three';
import { useSelector } from 'react-redux';
import './PanoramaViewer.css';

const PanoramaViewer = () => {
    const imageContainer = useRef(null);
    const { image } = useSelector((state) => state.image);

    useEffect(() => {
        if (imageContainer.current && image) {
            const panorama1 = new PANOLENS.ImagePanorama(image);
            const panorama2 = new PANOLENS.ImagePanorama('/images/image2.jpg');

            const viewer = new PANOLENS.Viewer({
                container: imageContainer.current,
                autoRotate: false,
                controlBar: true,
                backgroundColor: 'red',
                cameraFov: 100,
            });

            viewer.add(panorama1, panorama2);

            const infospotPosition1 = new THREE.Vector3(-2136.06, 16.30, 890.14);
            const infospot1 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospot1.position.copy(infospotPosition1);
            infospot1.addEventListener('click', () => {
                viewer.setPanorama(panorama2);
            });

            const hoverElement1 = document.createElement('div');
            hoverElement1.className = 'hover-info';
            hoverElement1.innerHTML = 'Navigate to the second panorama';
            infospot1.addHoverElement(hoverElement1);

            panorama1.add(infospot1);

            const infospotPosition2 = new THREE.Vector3(3136.06, -16.30, -890.14);
            const infospot2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
            infospot2.position.copy(infospotPosition2);
            infospot2.addEventListener('click', () => {
                viewer.setPanorama(panorama1);
            });

            const hoverElement2 = document.createElement('div');
            hoverElement2.className = 'hover-info';
            hoverElement2.innerHTML = 'Navigate to the first panorama';
            infospot2.addHoverElement(hoverElement2);

            panorama2.add(infospot2);

            viewer.setPanorama(panorama1);
        }
    }, [image]);

    return <div ref={imageContainer} className="panorama-container"></div>;
};

export default PanoramaViewer;
