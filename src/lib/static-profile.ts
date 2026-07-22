export const staticProfile = {
  name: "Ahamad Fadillah Harahap",
  headline: "Lulusan S1 Agribisnis UMSU",
  professionalTitle: "Human Resources Professional",
  shortDescription:
    "Saya adalah profesional Human Resources yang berfokus pada pengelolaan talenta, pengembangan budaya kerja, dan mendorong pertumbuhan karyawan serta organisasi secara berkelanjutan.",
  about:
    "Saya adalah profesional Human Resources yang berfokus pada pengelolaan talenta, pengembangan budaya kerja, dan mendorong pertumbuhan karyawan serta organisasi secara berkelanjutan. Dengan kombinasi analitis, empati, dan pemahaman bisnis, saya berkomitmen untuk menciptakan pengalaman kerja yang positif dan berkinerja tinggi.",
  location: "Medan, Sumatera Utara, Indonesia",
  publicEmail: "afadillah117@gmail.com",
  whatsapp: "6287768885573",
  instagramUrl: "https://instagram.com/ahmad_harahaap",
  imageUrl: "/me-about.jpeg",
};

export const staticContactLinks = [
  {
    label: "Instagram",
    value: "ahmad_harahaap",
    href: staticProfile.instagramUrl,
    type: "instagram",
  },
  {
    label: "WhatsApp",
    value: staticProfile.whatsapp,
    href: `https://wa.me/${staticProfile.whatsapp}`,
    type: "whatsapp",
  },
  {
    label: "Email",
    value: staticProfile.publicEmail,
    href: `mailto:${staticProfile.publicEmail}`,
    type: "email",
  },
] as const;
