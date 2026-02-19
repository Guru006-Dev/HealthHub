import React, { useRef, useEffect } from 'react';

// ===================== HERO COMPONENT =====================
const AuroraHero = ({
    children, // Added children prop
    className = ""
}) => {
    return (
        <section className={`relative h-screen w-screen overflow-hidden ${className}`}>
            {/* Full Page Background */}
            <div className="absolute inset-0 z-0">
                <ShaderBackground />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                {children}
            </div>
        </section>
    );
};

// ===================== SHADER BACKGROUND =====================
const ShaderBackground = () => {
    const shaderProps = {
        flowSpeed: 0.4,
        colorIntensity: 1.2,
        noiseLayers: 4.0,
        mouseInfluence: 0.3,
    };

    return (
        <div className="bg-black absolute inset-0 -z-10 w-full h-full">
            <InteractiveShader {...shaderProps} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>
    );
};

// ===================== SHADER COMPONENT =====================
const InteractiveShader = ({
    flowSpeed = 0.4,
    colorIntensity = 1.2,
    noiseLayers = 4.0,
    mouseInfluence = 0.3,
}) => {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL is not supported in this browser.");
            return;
        }

        const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

        // Robust Plasma Shader (Aurora Effect)
        const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        vec2 pos = (uv * 2.0 - 1.0);
        pos.x *= iResolution.x / iResolution.y;
        
        float t = iTime * 0.4;
        
        // Layered waves
        float v = 0.0;
        v += sin(pos.y * 5.0 + t);
        v += sin((pos.x + pos.y) * 5.0 + t * 0.5);
        v += sin(sqrt(pos.x*pos.x + pos.y*pos.y + 1.0) * 5.0 + t * 1.5);
        
        // Color mapping
        float r = sin(v * 3.14 + t) * 0.5 + 0.5;
        float g = cos(v * 3.14 + t + 1.0) * 0.5 + 0.5;
        float b = sin(v * 3.14 + t + 2.0) * 0.5 + 0.5;
        
        // Colors: Shift towards HealthHub Greens/Teals
        vec3 col = vec3(0.0, g * 0.6 + 0.1, b * 0.7 + 0.3); // Teal/Cyan base
        col += vec3(r * 0.2, 0.0, r * 0.3); // Subtle purple hints
        
        // Mouse glow
        float dist = distance(uv, vec2(iMouse.x / iResolution.x, 1.0 - iMouse.y / iResolution.y));
        col += (1.0 - smoothstep(0.0, 0.4, dist)) * 0.15;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

        const compileShader = (source, type) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(`Program linking error: ${gl.getProgramInfoLog(program)}`);
            return;
        }
        gl.useProgram(program);

        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const aPosition = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
        const iTimeLocation = gl.getUniformLocation(program, "iTime");
        const iMouseLocation = gl.getUniformLocation(program, "iMouse");

        const startTime = performance.now();
        let animationFrameId;

        const handleMouseMove = (e) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const renderLoop = () => {
            if (!gl || gl.isContextLost()) return;

            const currentTime = performance.now();
            gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
            gl.uniform2f(iMouseLocation, mousePos.current.x, mousePos.current.y);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(renderLoop);
        };
        renderLoop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (gl) {
                // Cleanup usually done here
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />;
};

export default AuroraHero;
