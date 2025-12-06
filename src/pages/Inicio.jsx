import { useEffect } from "react";
import { animate } from "animejs";
import Aurora from "../animation/aurora";
import Particles from "../animation/particles";
import { Welcome } from "../components/welcome";
import { Modos } from "../components/modos";

export const Inicio = () => {
  useEffect(() => {
    animate(".animar", {
      scale: 1.25,
      duration: 1000,
      ease: "inOut(1.68)",
    });
  }, []);

  return (
    <div className="flex flex-col gap-15 relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Aurora
          colorStops={["#4dcb3a", "#b19eef", "#5227ff"]}
          blend={0.5}
          amplitude={1.5}
          speed={1}
        />
      </div>

      <div className="absolute inset-0 -z-10 w-full h-full">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.4}
          particleBaseSize={210}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="animar">
        <Welcome />
        <Modos />
      </div>
    </div>
  );
};
