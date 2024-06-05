import logo from './logo.svg';
import './App.css';
import * as PANOLENS from 'panolens';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

function App() {
  const imageContainer = useRef(null);

  useEffect(() => {
    if (imageContainer.current) {
      // Create two panoramas
      const panorama1 = new PANOLENS.ImagePanorama('/images/360img.jpg');
      const panorama2 = new PANOLENS.ImagePanorama('/images/image2.jpg');

      const viewer = new PANOLENS.Viewer({
        container: imageContainer.current,
        autoRotate: false,
        controlBar: true,
        backgroundColor: 'red',
        cameraFov: 100
      });

      // Add panoramas to the viewer
      viewer.add(panorama1, panorama2);

      // Infospot positions for panorama1
      const infospotPosition1 = new THREE.Vector3(-2136.06, 16.30, 890.14);
      const infospot1 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
      infospot1.position.copy(infospotPosition1);
      infospot1.addEventListener('click', () => {
        viewer.setPanorama(panorama2);
      });

      // Add hover information to infospot1
      const hoverElement1 = document.createElement('div');
      hoverElement1.className = 'hover-info';
      hoverElement1.innerHTML = 'Navigate to the second panorama';
      infospot1.addHoverElement(hoverElement1);

      panorama1.add(infospot1);

      // Infospot positions for panorama2
      const infospotPosition2 = new THREE.Vector3(3136.06, -16.30, -890.14);
      const infospot2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
      infospot2.position.copy(infospotPosition2);
      infospot2.addEventListener('click', () => {
        viewer.setPanorama(panorama1);
      });

      // Add hover information to infospot2
      const hoverElement2 = document.createElement('div');
      hoverElement2.className = 'hover-info';
      hoverElement2.innerHTML = 'Navigate to the first panorama';
      infospot2.addHoverElement(hoverElement2);

      panorama2.add(infospot2);

      // Start with the first panorama
      viewer.setPanorama(panorama1);
    }
  }, []);

  return (
    <div className="App">
      <div>
        3d tour
      </div>
      <div ref={imageContainer} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
}

export default App;
