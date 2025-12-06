import SplitText from "../animation/textanimation";
export const Welcome = () => {
  return (
    <section className="relative w-full h-[300px] flex items-center justify-center bg-transparent">
      <h1 className="absolute top-24 text-center text-7xl md:text-9xl font-extrabold text-[#ffff] leading-none z-20 bg-transparent">
        <SplitText
          text="Convertidor de IPs"
          className="text-8xl font-semibold text-center"
          delay={80}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </h1>
    </section>
  );
};
