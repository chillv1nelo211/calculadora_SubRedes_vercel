export function ipv6ToIpv4(ipv6) {
  let grupos = [];

  if (ipv6.includes("::")) {
    let [izq, der] = ipv6.split("::");

    const gruposIzq = izq ? izq.split(":").filter((g) => g) : [];
    const gruposDer = der ? der.split(":").filter((g) => g) : [];

    const cerosFaltantes = 8 - (gruposIzq.length + gruposDer.length);

    grupos = [...gruposIzq, ...Array(cerosFaltantes).fill("0"), ...gruposDer];
  } else {
    grupos = ipv6.split(":").map((g) => (g ? g : "0"));
  }

  if (grupos.length !== 8) {
    return "Error: IPv6 debe expandirse a 8 grupos";
  }

  try {
    const penultimo = grupos[6];
    const ultimo = grupos[7];

    const oct1 = parseInt(penultimo.slice(0, 2), 16);
    const oct2 = parseInt(penultimo.slice(2, 4), 16);
    const oct3 = parseInt(ultimo.slice(0, 2), 16);
    const oct4 = parseInt(ultimo.slice(2, 4), 16);

    for (const o of [oct1, oct2, oct3, oct4]) {
      if (isNaN(o) || o < 0 || o > 255) return "Error: Valores fuera de rango";
    }

    return `${oct1}.${oct2}.${oct3}.${oct4}`;
  } catch (e) {
    return "Error: Valores hexadecimales inválidos";
  }
}
