import { useEffect, useState } from "react";
import AnimatedContent from "../animation/botonAnimation";
import { calcularSubred } from "../logica/subRedes";

export const SubRedes = ({ onBack }) => {
  const [ip, setIp] = useState("");
  const [cidr, setCidr] = useState("");
  const [newCidr, setNewCidr] = useState("");

  const [errorIp, setErrorIp] = useState(null);
  const [errorCidr, setErrorCidr] = useState(null);
  const [errorNewCidr, setErrorNewCidr] = useState(null);

  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const validarIp = (ip) => {
    const partes = ip.split(".");
    if (partes.length !== 4) return false;
    for (let p of partes) {
      const n = Number(p);
      if (p === "" || isNaN(n) || n < 0 || n > 255) return false;
    }
    return true;
  };

  const validarCidr = (c) => {
    const n = Number(c);
    return !(isNaN(n) || n < 0 || n > 32);
  };

  useEffect(() => {
    if (ip === "") return setErrorIp(null);
    setErrorIp(!validarIp(ip));
  }, [ip]);

  useEffect(() => {
    if (cidr === "") return setErrorCidr(null);
    setErrorCidr(!validarCidr(cidr));
  }, [cidr]);

  useEffect(() => {
    if (newCidr === "") return setErrorNewCidr(null);
    setErrorNewCidr(!validarCidr(newCidr));
  }, [newCidr]);

  const handlerClick = () => {
    if (errorIp === false && errorCidr === false && errorNewCidr === false) {
      try {
        const datos = calcularSubred(ip, parseInt(cidr), parseInt(newCidr));
        setResult(datos);
        setErrorMsg("");
      } catch (e) {
        console.log(e);
        setResult(null);
        setErrorMsg("Error calculando subred");
      }
    } else {
      setResult(null);
      setErrorMsg("Revisa los campos ingresados");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center pt-20">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-row gap-5">
          {/* IP */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-3xl">IP</legend>
            <input
              type="text"
              className="input text-2xl w-100 h-12 bg-black rounded-[6px] px-3"
              placeholder="192.168.1.0"
              onChange={(e) => setIp(e.target.value)}
            />
            {errorIp && <p className="text-red-500">IP inválida</p>}
            {errorIp === false && <p className="text-green-500">IP válida</p>}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-3xl">Máscara /CIDR</legend>
            <input
              type="number"
              className="input text-2xl w-100 h-12 bg-black rounded-[6px] px-3"
              placeholder="25"
              onChange={(e) => setCidr(e.target.value)}
            />
            {errorCidr && <p className="text-red-500">CIDR inválido</p>}
            {errorCidr === false && (
              <p className="text-green-500">CIDR válido</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-3xl">Subred /CIDR</legend>
            <input
              type="number"
              className="input text-2xl w-100 h-12 bg-black rounded-[6px] px-3"
              placeholder="27"
              onChange={(e) => setNewCidr(e.target.value)}
            />
            {errorNewCidr && (
              <p className="text-red-500">CIDR inválido (0–32)</p>
            )}
            {errorNewCidr === false && (
              <p className="text-green-500">CIDR válido</p>
            )}
          </fieldset>
        </div>

        <AnimatedContent
          distance={50}
          direction="vertical"
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
              document.getElementById("modal_subred").showModal();
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Calcular y Ver Resultado
            </div>
          </button>

          <dialog id="modal_subred" className="modal">
            <div className="modal-box max-w-2xl">
              <h3 className="font-bold text-xl">Información de Subred</h3>

              {errorMsg && <p className="text-red-500">{errorMsg}</p>}

              {result && (
                <>
                  <div className="py-4 text-lg">
                    <p>
                      <b>Address:</b> {result.info.Address.decimal}
                    </p>
                    <p>
                      <b>Netmask Original:</b>{" "}
                      {result.info.NetmaskOriginal.decimal}
                    </p>
                    <p>
                      <b>Netmask Subred:</b> {result.info.NetmaskSubred.decimal}
                    </p>
                    <p>
                      <b>Network:</b> {result.info.Network.decimal}
                    </p>
                    <p>
                      <b>HostMin:</b> {result.info.HostMin.decimal}
                    </p>
                    <p>
                      <b>HostMax:</b> {result.info.HostMax.decimal}
                    </p>
                    <p>
                      <b>Broadcast:</b> {result.info.Broadcast.decimal}
                    </p>
                    <p>
                      <b>Clase:</b> {result.info.Clase}
                    </p>
                    <p>
                      <b>Tipo:</b> {result.info.Tipo}
                    </p>
                    <p>
                      <b>Subredes creadas:</b> {result.info.SubredesCreadas}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mt-3">
                      Subredes generadas
                    </h3>

                    <div className="max-h-60 overflow-y-auto border border-gray-700 rounded p-2 mt-2">
                      {result.subnets.map((s, i) => (
                        <div key={i} className="mb-3 text-md">
                          <p>
                            <b>Network:</b> {s.network}
                          </p>
                          <p>
                            <b>HostMin:</b> {s.hostMin}
                          </p>
                          <p>
                            <b>HostMax:</b> {s.hostMax}
                          </p>
                          <p>
                            <b>Broadcast:</b> {s.broadcast}
                          </p>
                          <hr className="my-2 border-gray-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </AnimatedContent>

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
