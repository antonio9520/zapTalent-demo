export const setearTipoPlan = (tipo) => {
  let userPost;
  let totalUsers;
  let totalAvisos;

  if (tipo === "1") {
    userPost = true;
    totalUsers = false;
    totalAvisos = 1;
  }
  if (tipo === "2") {
    userPost = true;
    totalUsers = false;
    totalAvisos = 5;
  }

  if (tipo === "3") {
    userPost = true;
    totalUsers = true;
    totalAvisos = 5;
  }

  if (tipo === "4") {
    userPost = true;
    totalUsers = false;
    totalAvisos = 0;
  }

  if (tipo === "5") {
    userPost = true;
    totalUsers = true;
    totalAvisos = 0;
  }
  return { userPost, totalUsers, totalAvisos };
};

/**NOTAS */

/**
 * *************************Tipo de Plan:
 * 
 * 1 = standar
 * 2 = standar 5+
 * 3 = standar 5+ plus
 * 4 = avanzado
 * 5 = avanzado plus
 * 
 * 
 * userPost = ver usuarios postulados ecosistema
 * totalUser = ver todos los usuarios en ecosistema
 * totalAvisos = cantidad de avisos que se podran crear
 * 
 * avisos ilimitados = 0 
 * 
 * 
 * 
 * 
 */