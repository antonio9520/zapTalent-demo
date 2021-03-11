export const porcentajePerfil = (
  confirmarEmail,
  subirCV, 
  adnsap,
  trabajos,
  certificado,
  estudios
) => {
  let number = 0;
  if (confirmarEmail) number = number + 11;
  if (subirCV) number = number + 9;
  if (adnsap) number = number + 35;
  if (trabajos) number = number + 15;
  if (certificado) number = number + 15;
  if (estudios) number = number + 15;
  return number;
};
