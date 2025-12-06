import { useEffect, useState } from "react";
import AnimatedContent from "../animation/botonAnimation";
import { ipv6ToIpv4 } from "../logica/ipv6ToIpv4";

export const ConvertidorIPv6 = ({ onBack }) => {
  const [ip, setIp] = useState("");
  const [errorIp, setErrorIp] = useState(null);
  const [result, setResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // -------------------------
  // 🔍 VALIDACIÓN IPv6
  // -------------------------
  const validarIpv6 = (ipv6) => {
    // IPv4 embebido: ::ffff:192.168.1.1
    const ipv4Regex =
      /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

    if (ipv6.includes(".")) {
      const partes = ipv6.split(":");
      const ipv4 = partes.pop();
      if (!ipv4Regex.test(ipv4)) return false;
      ipv6 = partes.join(":");
    }

    // No puede haber más de un ::
    if (ipv6.split("::").length > 2) return false;

    // Grupos
    const grupos = ipv6.split(":");

    if (ipv6.includes("::")) {
      const [izq, der] = ipv6.split("::");
      const izqPartes = izq === "" ? [] : izq.split(":");
      const derPartes = der === "" ? [] : der.split(":");
      if (izqPartes.length + derPartes.length > 7) return false;
    } else {
      if (grupos.length !== 8) return false;
    }

    // Validación de cada grupo IPv6
    for (let grupo of grupos) {
      if (grupo === "") continue;
      if (!/^[0-9a-fA-F]{1,4}$/.test(grupo)) return false;
    }

    return true;
  };


  useEffect(() => {
    if (ip === "") {
      setErrorIp(null);
      return;
    }

    if (!validarIpv6(ip)) {
      setErrorIp(true);
    } else {
      setErrorIp(false);
    }
  }, [ip]);


  const handlerInputIp = (e) => {
    setIp(e.target.value);
  };


  const handlerClick = () => {
    if (ip && errorIp === false) {
      const conversion = ipv6ToIpv4(ip);

      if (conversion.startsWith("Error")) {
        setErrorMsg(conversion);
        setResult("");
      } else {
        setResult(conversion);
        setErrorMsg("");
      }
    } else {
      setErrorMsg("La dirección IPv6 no es válida");
      setResult("");
    }
  };



  return (
    <div className="w-full h-12 flex justify-center items-start pt-20">
      <div className="flex flex-col justify-center items-center gap-14">
   
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-3xl">Ingresa IP </legend>
          <input
            type="text"
            className="
              input text-2xl w-100 h-12 bg-black rounded-[6px] px-3
              border border-gray-700 
              outline-none
              transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
              focus:border-purple-500
              focus:shadow-[0_0_12px_rgba(132,0,255,0.7)]
              focus:scale-[1.02]
            "
            placeholder="Ejm: 2001:db8:3333:4444:5555:6666:7777:8888"
            onChange={handlerInputIp}
          />

          {errorIp === true && (
            <p className="text-red-500 text-lg">
              IP inválida (formato incorrecto)
            </p>
          )}

          {errorIp === false && (
            <p className="text-green-500 text-lg">IP correcta</p>
          )}
        </fieldset>

        {/* ---------------- BOTÓN CALCULAR ---------------- */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="bounce.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <button
            className="p-[3px] relative"
            onClick={() => {
              handlerClick();
              document.getElementById("my_modal_2").showModal();
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Calcular y Ver Resultado
            </div>
          </button>

          {/* ---------------- MODAL ---------------- */}
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Resultado IPv4</h3>
              <p className="py-4 text-4xl">{result}</p>

              {errorMsg && <p className="text-red-500 text-xl">{errorMsg}</p>}
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </AnimatedContent>

        {/* ---------------- BOTÓN VOLVER ---------------- */}
        <button className="p-[2px] relative w-fit" onClick={onBack}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md" />
          <div className="px-3 py-1 bg-black rounded-md relative text-white hover:bg-transparent text-sm transition">
            volver
          </div>
        </button>
      </div>
    </div>
  );
};
