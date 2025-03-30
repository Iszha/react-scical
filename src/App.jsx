import Calculator from './components/Calculator'
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './App.css'

function App() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="app">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 120,
          background: {
            color: "#f5f5f5"
          },
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#a2d39b"
            },
            links: {
              enable: true,
              color: "#d9c5a0",
              distance: 150,
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              outModes: {
                default: "bounce"
              }
            }
          }
        }}
      />
      <div className="content">
        <h1>Scientific Calculator</h1>
        <Calculator />
      </div>
    </div>
  )
}

export default App
