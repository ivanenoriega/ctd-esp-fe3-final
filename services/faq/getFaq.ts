export const getFaqs = async () => {
    const res = await fetch("https://ctd-esp-fe3-final-zeta-gules.vercel.app/preguntas-frecuentes");
    const data = await res.json();
    return data;
  };
  