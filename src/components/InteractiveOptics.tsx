import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Eye, Sparkles, AlertCircle, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

export const InteractiveOptics: React.FC = () => {
  const { t } = useLanguage();
  const [sph, setSph] = useState<number>(0);
  const [cyl, setCyl] = useState<number>(0);
  const [isCorrected, setIsCorrected] = useState<boolean>(true);
  
  // 3D Scene Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  // Mesh Refs
  const lensGeometryRef = useRef<THREE.CylinderGeometry | null>(null);
  const lensMeshRef = useRef<THREE.Mesh | null>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);
  const raysGroupRef = useRef<THREE.Group | null>(null);
  const eyeballGroupRef = useRef<THREE.Group | null>(null);
  
  // Rotation / Drag Interaction State via Ref to prevent stale closures in requestAnimationFrame
  const rotationRef = useRef({ x: 0.2, y: -0.6 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Handle Dragging / Rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;
    
    rotationRef.current.x += deltaY * 0.01;
    rotationRef.current.y += deltaX * 0.01;
    
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch Support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.current.y;
    
    rotationRef.current.x += deltaY * 0.015;
    rotationRef.current.y += deltaX * 0.015;
    
    previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Preset Views
  const setView = (view: 'profile' | 'front' | 'angled') => {
    if (view === 'profile') {
      rotationRef.current = { x: 0, y: Math.PI / 2 };
    } else if (view === 'front') {
      rotationRef.current = { x: 0, y: 0 };
    } else {
      rotationRef.current = { x: 0.2, y: -0.6 };
    }
  };

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfffbf7); // Matches var(--bg-primary) sunny cream
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(6, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xfcb1c4, 0.45); // Cute warm pink light
    dirLight2.position.set(-6, -6, -3);
    scene.add(dirLight2);

    // 5. Geometry & Lens Mesh creation
    const geometry = new THREE.CylinderGeometry(1.6, 1.6, 0.4, 64, 8);
    geometry.rotateX(Math.PI / 2);
    lensGeometryRef.current = geometry;

    // Cache original vertex positions for deformation calculations
    const positionAttr = geometry.getAttribute('position');
    originalPositionsRef.current = positionAttr.array.slice() as Float32Array;

    // Material with high-end glass physics
    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe, // Soft blue-teal glass tint
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0.02,
      metalness: 0.05,
      ior: 1.52, // Glass Refractive Index
      thickness: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide
    });

    const lensMesh = new THREE.Mesh(geometry, lensMaterial);
    scene.add(lensMesh);
    lensMeshRef.current = lensMesh;

    // 6. ADD OPTOMETRIST TRIAL FRAME (Montura de Prueba) around the Lens
    // Rims of the lens (Cute Pink Torus)
    const rimGeo = new THREE.TorusGeometry(1.65, 0.1, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({ 
      color: 0xec4899, // Bright pink plastic
      roughness: 0.2, 
      metalness: 0.1 
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2; // Align to Z axis
    lensMesh.add(rimMesh);

    // Trial lens handle/tab (Optometrists use this to rotate axis)
    const tabGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
    const tabMat = new THREE.MeshStandardMaterial({ color: 0xfb923c, roughness: 0.3 }); // Peach colored tab
    const tabMesh = new THREE.Mesh(tabGeo, tabMat);
    tabMesh.position.set(0, 1.8, 0); // Position at the top of the lens
    lensMesh.add(tabMesh);

    // 7. ADD GLOSSY 3D EYEBALL (Globo Ocular) at Z = 3
    const eyeballGroup = new THREE.Group();
    eyeballGroup.position.set(0, 0, 3);
    scene.add(eyeballGroup);
    eyeballGroupRef.current = eyeballGroup;

    // Sclera (White Sphere)
    const scleraGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const scleraMat = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      roughness: 0.1,
      metalness: 0.05
    });
    const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
    eyeballGroup.add(scleraMesh);

    // Iris (Teal Circle/Lens on the front facing the lens Z = -1.0)
    // Rotate to face the incoming light rays (z axis)
    const irisGeo = new THREE.CircleGeometry(0.38, 32);
    const irisMat = new THREE.MeshStandardMaterial({ 
      color: 0x0d9488, // Emerald teal iris
      roughness: 0.1,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.set(0, 0, -1.01); // Just slightly offset from center
    irisMesh.rotation.y = Math.PI; // Face the lens
    eyeballGroup.add(irisMesh);

    // Pupil (Black Circle)
    const pupilGeo = new THREE.CircleGeometry(0.2, 32);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.set(0, 0, -1.02);
    pupilMesh.rotation.y = Math.PI;
    eyeballGroup.add(pupilMesh);

    // 8. Ray Group Container
    const raysGroup = new THREE.Group();
    scene.add(raysGroup);
    raysGroupRef.current = raysGroup;

    // Handle full responsiveness using ResizeObserver
    const container = canvasRef.current.parentElement;
    let initialWidth = 300;
    if (container) {
      initialWidth = Math.min(container.clientWidth - 32, 350);
      renderer.setSize(initialWidth, initialWidth);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = Math.min(entry.contentRect.width - 32, 350);
      if (newWidth > 100) {
        renderer.setSize(newWidth, newWidth);
      }
    });

    if (container) {
      resizeObserver.observe(container);
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (lensMeshRef.current && eyeballGroupRef.current && raysGroupRef.current) {
        // Read directly from rotationRef to resolve the stale closure bug!
        lensMeshRef.current.rotation.x = rotationRef.current.x;
        lensMeshRef.current.rotation.y = rotationRef.current.y;
        
        eyeballGroupRef.current.rotation.x = rotationRef.current.x;
        eyeballGroupRef.current.rotation.y = rotationRef.current.y;
        
        raysGroupRef.current.rotation.x = rotationRef.current.x;
        raysGroupRef.current.rotation.y = rotationRef.current.y;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      lensMaterial.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      tabGeo.dispose();
      tabMat.dispose();
      scleraGeo.dispose();
      scleraMat.dispose();
      irisGeo.dispose();
      irisMat.dispose();
      pupilGeo.dispose();
      pupilMat.dispose();
      renderer.dispose();
      resizeObserver.disconnect();
    };
  }, []);

  // Update Scene when Theme changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (scene) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      scene.background = new THREE.Color(isDark ? 0x181124 : 0xfffbf7);
    }
  }, [sph, cyl, isCorrected]);

  // Render 3D Rays and deform lens
  useEffect(() => {
    const geometry = lensGeometryRef.current;
    const originalPositions = originalPositionsRef.current;
    const raysGroup = raysGroupRef.current;

    if (!geometry || !originalPositions) return;

    // 1. DEFORM LENS GEOMETRY
    const positionAttr = geometry.getAttribute('position');
    const positions = positionAttr.array as Float32Array;
    
    const sphFactor = sph * 0.04;
    const cylFactor = cyl * 0.04;

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];

      const r2 = x * x + y * y;

      let newZ = z;
      if (z > 0.01) {
        newZ = z + (2.0 - r2 * 0.4) * sphFactor + (2.0 - x * x * 0.5) * cylFactor;
      } else if (z < -0.01) {
        newZ = z - (2.0 - r2 * 0.4) * sphFactor - (2.0 - x * x * 0.5) * cylFactor;
      }

      positions[i + 2] = newZ;
    }

    positionAttr.needsUpdate = true;
    geometry.computeVertexNormals();

    // 2. TRACE 3D LIGHT RAYS AS 3D GLOWING CYLINDERS (instead of 1px lines!)
    if (raysGroup) {
      // Clear old beam meshes
      while (raysGroup.children.length > 0) {
        const obj = raysGroup.children[0] as THREE.Mesh;
        raysGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) (obj.material as THREE.Material).dispose();
      }

      const rayPositions = [
        { x: -0.7, y: 0.7 },
        { x: 0.7, y: 0.7 },
        { x: 0, y: 0 },
        { x: -0.7, y: -0.7 },
        { x: 0.7, y: -0.7 }
      ];

      const rayColor = isCorrected ? 0x2dd4bf : 0xf472b6; // Teal for corrected, pink for blurry

      // Helper function to create a 3D cylindrical beam between two points
      const createCylinderBeam = (p1: THREE.Vector3, p2: THREE.Vector3) => {
        const direction = new THREE.Vector3().subVectors(p2, p1);
        const length = direction.length();
        
        // Dynamic cylinder geometry matching length
        const beamGeo = new THREE.CylinderGeometry(0.03, 0.03, length, 8);
        beamGeo.translate(0, length / 2, 0); // Shift pivot to base
        beamGeo.rotateX(Math.PI / 2); // Align cylinder axis to Z axis
        
        const beamMat = new THREE.MeshBasicMaterial({
          color: rayColor,
          transparent: true,
          opacity: 0.75
        });

        const beamMesh = new THREE.Mesh(beamGeo, beamMat);
        beamMesh.position.copy(p1);
        beamMesh.lookAt(p2);
        return beamMesh;
      };

      rayPositions.forEach((pos) => {
        // Calculate points
        const pt1 = new THREE.Vector3(pos.x, pos.y, -4);
        const pt2 = new THREE.Vector3(pos.x, pos.y, -0.2);

        let targetZ = 3.0; // target retina position is Z = 3.0 (where eyeball is)
        let targetX = 0;
        let targetY = 0;

        if (isCorrected) {
          // Perfectly focused on eyeball iris (Z = 2.0 is the front face of eyeball!)
          targetX = 0;
          targetY = 0;
          targetZ = 2.0;
        } else {
          // Uncorrected focal point calculation
          if (sph === 0) {
            targetX = pos.x;
            targetY = pos.y;
            targetZ = 2.0; // stays parallel
          } else if (sph < 0) {
            // Myopia: focuses BEFORE eyeball (e.g. Z = 1.0)
            const focalZ = 2.0 + 2.0 / sph;
            targetX = pos.x * (1 - 2.0 / focalZ);
            targetY = pos.y * (1 - 2.0 / focalZ);
            targetZ = 2.0; // continues to eyeball
          } else {
            // Hyperopia: focuses BEHIND eyeball (e.g. Z = 4.0)
            const focalZ = 2.0 + 2.0 / sph;
            targetX = pos.x * (1 - 2.0 / focalZ);
            targetY = pos.y * (1 - 2.0 / focalZ);
            targetZ = 2.0;
          }

          // Apply astigmatism cylinder shift
          if (cyl !== 0) {
            const astigmatismZ = 2.0 + 1.8 / cyl;
            targetX = targetX * (1 - 2.0 / astigmatismZ);
          }
        }

        const pt3 = new THREE.Vector3(pos.x, pos.y, 0.2);
        const pt4 = new THREE.Vector3(targetX, targetY, targetZ);

        // Beam 1: Entering light (Parallel from Z = -4 to Z = -0.2)
        raysGroup.add(createCylinderBeam(pt1, pt2));
        
        // Beam 2: Passing through lens (Z = -0.2 to Z = 0.2)
        raysGroup.add(createCylinderBeam(pt2, pt3));

        // Beam 3: Exiting/Refracting light (From Z = 0.2 to target retina Z = 2.0)
        raysGroup.add(createCylinderBeam(pt3, pt4));
      });
    }

  }, [sph, cyl, isCorrected]);

  // Formatted string helper
  const formatValue = (val: number) => {
    if (val === 0) return '0.00';
    return (val > 0 ? '+' : '') + val.toFixed(2);
  };

  const getBlurValue = () => {
    if (isCorrected) return 0;
    
    const totalAmetropia = Math.abs(sph) + Math.abs(cyl) * 0.8;
    if (totalAmetropia === 0) return 0;
    
    return Math.min(12, 1 + totalAmetropia * 1.8);
  };

  const needsThinning = Math.abs(sph) > 3.00 || Math.abs(cyl) > 2.00;

  return (
    <section id="interactive" className="interactive-section">
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-teal"></div>

      <div className="container interactive-container">
        <div className="section-header">
          <h2>{t.interactiveTitle}</h2>
          <p>{t.interactiveSubtitle}</p>
        </div>

        <div className="grid-2 interactive-grid">
          {/* Left Panel: Sliders & Controls */}
          <div className="control-panel glass-card">
            <h3 className="interactive-card-title">
              <Eye size={22} className="card-title-icon pink-color" />
              {t.prescriptionDecoderTitle}
            </h3>
            <p className="interactive-card-sub">{t.prescriptionDecoderSubtitle}</p>

            <div className="sliders-container">
              {/* SPH Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <label className="slider-label">{t.sphLabel}</label>
                  <span className="slider-value-badge" style={{ backgroundColor: sph === 0 ? 'var(--text-muted)' : sph > 0 ? 'var(--accent-peach)' : 'var(--accent-pink)' }}>
                    {formatValue(sph)} D
                  </span>
                </div>
                <input
                  type="range"
                  min="-6.00"
                  max="6.00"
                  step="0.25"
                  value={sph}
                  onChange={(e) => setSph(parseFloat(e.target.value))}
                  className="prescription-slider"
                />
                <p className="slider-help-text">{t.sphHelp}</p>
              </div>

              {/* CYL Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <label className="slider-label">{t.cylLabel}</label>
                  <span className="slider-value-badge" style={{ backgroundColor: cyl === 0 ? 'var(--text-muted)' : 'var(--accent-teal)' }}>
                    {formatValue(cyl)} D
                  </span>
                </div>
                <input
                  type="range"
                  min="-4.00"
                  max="0.00"
                  step="0.25"
                  value={cyl}
                  onChange={(e) => setCyl(parseFloat(e.target.value))}
                  className="prescription-slider"
                />
                <p className="slider-help-text">{t.cylHelp}</p>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="toggle-container">
              <span className="toggle-label">{t.applyCorrection}</span>
              <button 
                onClick={() => setIsCorrected(!isCorrected)} 
                className={`custom-toggle-btn ${isCorrected ? 'active-corrected' : 'active-blurry'}`}
              >
                <span className="toggle-knob"></span>
                <span className="toggle-text-inside">
                  {isCorrected ? t.applyCorrection.slice(0, 18) + '...' : t.simulateVision.slice(0, 18) + '...'}
                </span>
              </button>
            </div>
            
            {/* Blurry Vision Text Simulation */}
            <div className="text-blur-simulation-box">
              <p className="sim-title-text">{isCorrected ? t.viewCorrectedText : t.viewBlurryText}:</p>
              <div className="simulation-screen">
                <p 
                  className="sim-blurred-text"
                  style={{ filter: `blur(${getBlurValue()}px)`, transition: 'filter 0.3s ease' }}
                >
                  {t.aboutHighlightText}
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: 3D Refraction Lab & Recommendations */}
          <div className="result-panel glass-card">
            <div className="three-lab-header">
              <h3 className="interactive-card-title">
                <Sparkles size={22} className="card-title-icon teal-color" />
                3D Refraction Lab
              </h3>
              
              <div className="view-presets">
                <button onClick={() => setView('angled')} className="preset-btn" title="Angled View"><RotateCcw size={14} /></button>
                <button onClick={() => setView('profile')} className="preset-btn" title="Side Profile"><ZoomIn size={14} /></button>
                <button onClick={() => setView('front')} className="preset-btn" title="Front View"><ZoomOut size={14} /></button>
              </div>
            </div>

            {/* 3D Canvas Box */}
            <div className="canvas-wrapper-container">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="three-canvas"
              />
              <div className="drag-hint">
                <span>Drag to Rotate Lens ⟳</span>
              </div>
            </div>

            {/* Prescription Analysis Output */}
            <div className="prescription-analysis">
              {sph === 0 && cyl === 0 ? (
                <div className="analysis-empty">
                  <AlertCircle size={20} className="empty-icon" />
                  <p><strong>{t.normalVisionTitle}:</strong> Tienes una visión emétrope. Tu lente es plana y los rayos convergen perfectamente en la retina.</p>
                </div>
              ) : (
                <div className="analysis-details">
                  {sph !== 0 && (
                    <div className="analysis-item">
                      <div className="analysis-bullet" style={{ backgroundColor: sph > 0 ? 'var(--accent-peach)' : 'var(--accent-pink)' }}></div>
                      <div className="analysis-text-wrapper">
                        <span className="analysis-title">
                          {sph > 0 ? t.hyperopiaTitle : t.myopiaTitle} ({formatValue(sph)} SPH)
                        </span>
                        <p className="analysis-desc">
                          {sph > 0 ? t.sphExplainPos : t.sphExplainNeg}
                        </p>
                      </div>
                    </div>
                  )}

                  {cyl !== 0 && (
                    <div className="analysis-item">
                      <div className="analysis-bullet" style={{ backgroundColor: 'var(--accent-teal)' }}></div>
                      <div className="analysis-text-wrapper">
                        <span className="analysis-title">
                          {t.astigmatismTitle} ({formatValue(cyl)} CYL)
                        </span>
                        <p className="analysis-desc">{t.cylExplain}</p>
                      </div>
                    </div>
                  )}

                  {/* Recommendation Card */}
                  <div className="hira-rec-card">
                    <div className="hira-rec-header">
                      <Sparkles size={16} className="hira-rec-icon" />
                      <span>{t.hiraRecommendation}</span>
                    </div>
                    <ul className="hira-rec-list">
                      <li>✿ {needsThinning ? t.recThinning : t.recStandard}</li>
                      <li>✿ {t.recAntiReflective}</li>
                      {Math.abs(sph) > 0.5 && (
                        <li>✿ {t.recBlueLight}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .interactive-section {
          background-color: var(--bg-primary);
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        .interactive-container {
          position: relative;
          z-index: 10;
        }

        .interactive-grid {
          align-items: stretch;
        }

        .interactive-card-title {
          font-size: 1.45rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-friendly);
          color: var(--text-primary);
        }

        .pink-color { color: var(--accent-pink); }
        .teal-color { color: var(--accent-teal); }

        .interactive-card-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          text-align: left;
        }

        /* Control Panel */
        .control-panel {
          padding: 2.25rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          border-radius: 24px;
        }

        .sliders-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          text-align: left;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .slider-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-friendly);
        }

        .slider-value-badge {
          font-size: 0.8rem;
          font-weight: 700;
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }

        .prescription-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: var(--bg-tertiary);
          outline: none;
          margin: 10px 0;
        }

        .prescription-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--accent-pink);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(236, 72, 153, 0.4);
          transition: transform 0.1s ease;
        }

        .prescription-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .slider-help-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Toggle Button */
        .toggle-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .toggle-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-secondary);
          font-family: var(--font-friendly);
        }

        .custom-toggle-btn {
          position: relative;
          width: 180px;
          height: 36px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          outline: none;
          overflow: hidden;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .active-corrected {
          background-color: var(--accent-teal);
        }

        .active-blurry {
          background-color: var(--accent-pink);
        }

        .toggle-knob {
          position: absolute;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.15);
          top: 4px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .active-corrected .toggle-knob {
          transform: translateX(70px);
        }

        .active-blurry .toggle-knob {
          transform: translateX(-70px);
        }

        .toggle-text-inside {
          font-size: 0.8rem;
          font-weight: 700;
          color: #ffffff;
          z-index: 10;
          font-family: var(--font-friendly);
        }

        /* Blurry Vision Text Box */
        .text-blur-simulation-box {
          background: var(--bg-primary);
          padding: 1.25rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          text-align: left;
        }

        .sim-title-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .simulation-screen {
          background: #ffffff;
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        [data-theme='dark'] .simulation-screen {
          background: #fdfaf2;
        }

        .sim-blurred-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: #111111;
          text-align: center;
          line-height: 1.5;
        }

        /* Result Panel */
        .result-panel {
          padding: 2.25rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          border-radius: 24px;
        }

        .three-lab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 1rem;
        }

        .view-presets {
          display: flex;
          gap: 0.4rem;
        }

        .preset-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .preset-btn:hover {
          border-color: var(--accent-pink);
          color: var(--accent-pink);
          transform: translateY(-1px);
        }

        .canvas-wrapper-container {
          position: relative;
          width: 100%;
          background: var(--bg-primary);
          border-radius: 20px;
          border: 1.5px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.02);
        }

        .three-canvas {
          cursor: grab;
          width: 100%;
          max-width: 350px;
          height: auto;
          aspect-ratio: 1 / 1;
          border-radius: 16px;
        }

        .three-canvas:active {
          cursor: grabbing;
        }

        .drag-hint {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-top: 0.5rem;
          pointer-events: none;
        }

        /* Prescription Analysis Output */
        .prescription-analysis {
          text-align: left;
          flex-grow: 1;
        }

        .analysis-empty {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          background: var(--bg-primary);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .empty-icon {
          color: var(--accent-teal);
          flex-shrink: 0;
        }

        .analysis-details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .analysis-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .analysis-bullet {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: 0.4rem;
          flex-shrink: 0;
        }

        .analysis-text-wrapper {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .analysis-title {
          font-weight: 700;
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.15rem;
          font-family: var(--font-friendly);
        }

        /* Hira Recommendation Card */
        .hira-rec-card {
          background: var(--bg-tertiary);
          border-radius: 20px;
          padding: 1.25rem;
          border: 1.5px solid var(--border-color);
        }

        .hira-rec-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--accent-pink);
          font-size: 1.05rem;
          margin-bottom: 0.75rem;
          font-family: var(--font-friendly);
        }

        .hira-rec-icon {
          animation: pulseEffect 2s infinite alternate;
        }

        @keyframes pulseEffect {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }

        .hira-rec-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};
