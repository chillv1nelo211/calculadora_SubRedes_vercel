export function ipv4ToIpv6(ipv4) {
  const partes = ipv4.split(".");

  if (partes.length !== 4) return "Error: IPv4 inválido";

  const octetos = [];

  for (const parte of partes) {
    const num = Number(parte);
    if (isNaN(num) || num < 0 || num > 255)
      return "Error: Números fuera de rango (0-255)";
    octetos.push(num);
  }

  const grupo1 =
    octetos[0].toString(16).padStart(2, "0") +
    octetos[1].toString(16).padStart(2, "0");

  const grupo2 =
    octetos[2].toString(16).padStart(2, "0") +
    octetos[3].toString(16).padStart(2, "0");

  return `::${grupo1}:${grupo2}`;
}
