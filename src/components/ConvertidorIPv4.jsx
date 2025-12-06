import { useEffect, useState } from "react";
import AnimatedContent from "../animation/botonAnimation";
import { ipv4ToIpv6 } from "../logica/ipv4toipv6";

export const ConvertidorIPv4 = ({ onBack }) => {
  const [ip, setIp] = useState("");
  const [errorIp, setErrorIp] = useState(null);
  const [result, setResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (ip == "") {
      setErrorIp(null); 
      return;
    }
    if (validarIp(ip) === false) {
      setErrorIp(true);
    } else {
      setErrorIp(false);
    }
  }, [ip]);

  // valirdaIp
  const validarIp = (ip) => {
    const partes = ip.split(".");

    if (partes.length !== 4) return false;

    for (let parte of partes) {
      if (parte === "") return false;

      const num = Number(parte);

      if (isNaN(num) || num < 0 || num > 255) return false;
    }

    return true;
  };

  // valirdaIp

  const handlerInputIp = (e) => {
    const valorIp = e.target.value;
    setIp(valorIp);
  };

  const handlerClick = (e) => {
    if (ip && errorIp === false) {
      const conversion = ipv4ToIpv6(ip);

      // Detecta si la función devolvió un mensaje de error
      if (conversion.startsWith("Error")) {
        setErrorMsg(conversion);
        setResult("");
      } else {
        setResult(conversion);
        setErrorMsg("");
      }
    } else {
      setErrorMsg("La dirección IPv4 no es válida");
      setResult("");
    }
  };

  return (
    <div className="w-full h-12 flex justify-center items-start pt-20">
      <div className="flex flex-col justify-center items-center  gap-14">
        <div>
          <fieldset className="fieldset ">
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
              placeholder="Ejm: 192.168.1.2"
              onChange={handlerInputIp}
            />

            {errorIp === true && (
              <p className="text-red-500 text-lg ">
                IP inválida (formato incorrecto)
              </p>
            )}
            {errorIp === false && (
              <p className="text-green-500 text-lg ">IP correcta</p>
            )}
          </fieldset>
        </div>
        <div className="flex items-center justify-center">
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
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Resultado IPv6</h3>
                <p className="py-4 text-4xl">{result}</p>
              </div>

              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </AnimatedContent>
        </div>
        <button className="p-[2px] relative w-fit" onClick={onBack}>
          <div className=" absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md" />
          <div className="px-3 py-1 bg-black rounded-md relative group transition duration-200 text-white hover:bg-transparent text-sm">
            volver
          </div>
        </button>
      </div>
    </div>
  );
};
