export const calcularSubred = (ip, netmask, newMask) => {
  // Si no se ingresa una nueva máscara, usar la original
  const subnetMask = newMask ?? netmask;


  const ipToInt = (ipStr) => {
    const oct = ipStr.split(".");
    return ((+oct[0] << 24) | (+oct[1] << 16) | (+oct[2] << 8) | +oct[3]) >>> 0;
  };

  
  const intToIp = (num) =>
    `${(num >>> 24) & 255}.${(num >>> 16) & 255}.${(num >>> 8) & 255}.${
      num & 255
    }`;


  const intToBin = (num) => {
    const bin = num.toString(2).padStart(32, "0");
    return `${bin.slice(0, 8)}.${bin.slice(8, 16)}.${bin.slice(
      16,
      24
    )}.${bin.slice(24, 32)}`;
  };


  const maskInt = (0xffffffff << (32 - netmask)) >>> 0;
  const newMaskInt = (0xffffffff << (32 - subnetMask)) >>> 0;
  const wildcardInt = ~maskInt >>> 0;

  const ipInt = ipToInt(ip);
  const networkInt = ipInt & maskInt;

  
  const blockSize = Math.pow(2, 32 - subnetMask); 
  const numSubnets = Math.pow(2, subnetMask - netmask);

  const subnets = [];

  for (let i = 0; i < numSubnets; i++) {
    const subnetNetwork = (networkInt + i * blockSize) >>> 0;
    const subnetBroadcast = (subnetNetwork + blockSize - 1) >>> 0;

    subnets.push({
      subnet: i + 1,
      network: `${intToIp(subnetNetwork)}/${subnetMask}`,
      hostMin: intToIp(subnetNetwork + 1),
      hostMax: intToIp(subnetBroadcast - 1),
      broadcast: intToIp(subnetBroadcast),
      totalHosts: blockSize - 2,
    });
  }


  const hostMin = networkInt + 1;
  const broadcastInt = networkInt | wildcardInt;
  const hostMax = broadcastInt - 1;


  const firstOctet = (networkInt >> 24) & 255;
  let clase =
    firstOctet < 128
      ? "Class A"
      : firstOctet < 192
      ? "Class B"
      : firstOctet < 224
      ? "Class C"
      : firstOctet < 240
      ? "Class D (Multicast)"
      : "Class E (Reserved)";

  const second = (networkInt >> 16) & 255;
  const privada =
    firstOctet === 10 ||
    (firstOctet === 172 && second >= 16 && second <= 31) ||
    (firstOctet === 192 && second === 168);

  return {
    info: {
      Address: { decimal: ip, binario: intToBin(ipInt) },

      NetmaskOriginal: {
        decimal: `${intToIp(maskInt)} = /${netmask}`,
        binario: intToBin(maskInt),
      },

      NetmaskSubred: {
        decimal: `${intToIp(newMaskInt)} = /${subnetMask}`,
        binario: intToBin(newMaskInt),
      },

      Network: {
        decimal: `${intToIp(networkInt)}/${netmask}`,
        binario: intToBin(networkInt),
      },

      HostMin: { decimal: intToIp(hostMin), binario: intToBin(hostMin) },
      HostMax: { decimal: intToIp(hostMax), binario: intToBin(hostMax) },

      Broadcast: {
        decimal: intToIp(broadcastInt),
        binario: intToBin(broadcastInt),
      },

      HostsNet: Math.pow(2, 32 - netmask) - 2,
      Clase: clase,
      Tipo: privada ? "Private Internet" : "Public Internet",
      SubredesCreadas: numSubnets,
    },

    subnets: subnets,
  };
};
