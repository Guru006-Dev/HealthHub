/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const AntigravityInner = ({
    count = 300,
    magnetRadius = 15, // Slightly larger interaction radius
    ringRadius = 12, // Slightly larger ring
    waveSpeed = 0.5,
    waveAmplitude = 1.2,
    particleSize = 1.8,
    lerpSpeed = 0.08,
    color = ['#3b82f6', '#ef4444', '#10b981', '#ffffff'], // Default medical palette
    autoAnimate = false,
    particleVariance = 1.5,
    rotationSpeed = 0,
    depthFactor = 1.2,
    pulseSpeed = 2,
    particleShape = 'sphere', // Defaulting to sphere for a cleaner look
    fieldStrength = 10
}) => {
    const meshRef = useRef(null);
    const { viewport } = useThree();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const colors = useMemo(() => {
        const cArray = Array.isArray(color) ? color : [color];
        return new Float32Array(count * 3);
    }, [count, color]);

    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastMouseMoveTime = useRef(0);
    const virtualMouse = useRef({ x: 0, y: 0 });

    const particles = useMemo(() => {
        const temp = [];
        const width = viewport.width || 100;
        const height = viewport.height || 100;
        const colorArray = Array.isArray(color) ? color : [color];
        const _color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            // Spread particles more widely initially
            const x = (Math.random() - 0.5) * width * 1.5;
            const y = (Math.random() - 0.5) * height * 1.5;
            const z = (Math.random() - 0.5) * 30;

            const randomRadiusOffset = (Math.random() - 0.5) * 2;

            // Assign random color per particle
            const pickedColor = colorArray[Math.floor(Math.random() * colorArray.length)];
            _color.set(pickedColor);
            colors[i * 3] = _color.r;
            colors[i * 3 + 1] = _color.g;
            colors[i * 3 + 2] = _color.b;

            temp.push({
                t,
                factor,
                speed,
                mx: x,
                my: y,
                mz: z,
                cx: x,
                cy: y,
                cz: z,
                randomRadiusOffset,
                originalZ: z
            });
        }
        return temp;
    }, [count, viewport.width, viewport.height, color, colors]);

    useFrame(state => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const { viewport: v, pointer: m } = state;
        const time = state.clock.getElapsedTime();

        // Heartbeat Effect: Rhythmic pulsing of ring radius
        // 60-100 BPM simulated, double beat pattern
        const heartbeat = (Math.sin(time * 8) * 0.1 + Math.sin(time * 15) * 0.05) * (Math.sin(time * 1.5) > 0 ? 1 : 0.2);
        const activeRingRadius = ringRadius + heartbeat * 2;


        const mouseDist = Math.sqrt(Math.pow(m.x - lastMousePos.current.x, 2) + Math.pow(m.y - lastMousePos.current.y, 2));

        if (mouseDist > 0.001) {
            lastMouseMoveTime.current = Date.now();
            lastMousePos.current = { x: m.x, y: m.y };
        }

        let destX = (m.x * v.width) / 2;
        let destY = (m.y * v.height) / 2;

        if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
            destX = Math.sin(time * 0.3) * (v.width / 5);
            destY = Math.cos(time * 0.2) * (v.height / 5);
        }

        const smoothFactor = 0.08; // Slightly responsive
        virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
        virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

        const targetX = virtualMouse.current.x;
        const targetY = virtualMouse.current.y;

        const globalRotation = time * rotationSpeed;

        particles.forEach((particle, i) => {
            let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;

            particle.t += speed;
            t = particle.t;

            const projectionFactor = 1 - cz / 80; // Adjusted projection depth
            const projectedTargetX = targetX * projectionFactor;
            const projectedTargetY = targetY * projectionFactor;

            const dx = mx - projectedTargetX;
            const dy = my - projectedTargetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let targetPos = { x: mx, y: my, z: mz * depthFactor };

            // Magnetic attraction & Orbit
            if (dist < magnetRadius * 1.5) {
                const angle = Math.atan2(dy, dx) + globalRotation;
                const wave = Math.sin(t * waveSpeed + angle) * (0.8 * waveAmplitude);
                const deviation = randomRadiusOffset * (3 / (fieldStrength + 0.1));

                const r = activeRingRadius + wave + deviation;

                targetPos.x = projectedTargetX + r * Math.cos(angle);
                targetPos.y = projectedTargetY + r * Math.sin(angle);

                // Vertical oscillation (DNA helix style movement)
                targetPos.z = mz * depthFactor + Math.sin(t * 2 + angle * 2) * (2 * waveAmplitude);
            }

            particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
            particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
            particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

            dummy.position.set(particle.cx, particle.cy, particle.cz);

            // Dynamic rotation based on movement
            dummy.lookAt(projectedTargetX, projectedTargetY, 50);
            dummy.rotateZ(time * 0.5 + i); // Add some spin

            const currentDistToMouse = Math.sqrt(
                Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
            );

            const distFromRing = Math.abs(currentDistToMouse - activeRingRadius);
            let scaleFactor = 1 - distFromRing / 15;
            scaleFactor = Math.max(0.1, Math.min(1.2, scaleFactor)); // Allow particles to be visible even if far

            // Pulse size with heartbeat
            const pulse = 1 + heartbeat * 0.3;
            const finalScale = scaleFactor * (0.5 + Math.sin(t * pulseSpeed) * 0.3 * particleVariance) * particleSize * pulse;

            dummy.scale.set(finalScale, finalScale, finalScale);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
        // Check if color filtering needs update (optional optimization: only set once if static)
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
            {particleShape === 'sphere' && <sphereGeometry args={[0.15, 12, 12]} />}
            {particleShape === 'box' && <boxGeometry args={[0.2, 0.2, 0.2]} />}
            {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.25]} />}

            <meshBasicMaterial
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending} // Makes overlapping particles glow
                depthWrite={false} // Prevents z-fighting for transparent particles
            />
            {/* Inject colors */}
            <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
        </instancedMesh>
    );
};

const Antigravity = props => {
    return (
        <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
            <AntigravityInner {...props} />
        </Canvas>
    );
};

export default Antigravity;
