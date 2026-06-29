import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface Translations {
  navHome: string;
  navAbout: string;
  navSkills: string;
  navExperience: string;
  navInteractive: string;
  navEducation: string;
  navContact: string;
  
  heroGreeting: string;
  heroSubtitle: string;
  heroDescription: string;
  heroContactBtn: string;
  heroCVBtn: string;
  
  aboutTitle: string;
  aboutSubtitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutText3: string;
  aboutHighlightOptics: string;
  aboutHighlightCare: string;
  
  skillsTitle: string;
  skillsSubtitle: string;
  skillsOptometry: string;
  skillsContactology: string;
  skillsWorkshop: string;
  skillsInstruments: string;
  skillsLanguages: string;
  skillsSoft: string;
  
  expTitle: string;
  expSubtitle: string;
  expPresent: string;
  
  interactiveTitle: string;
  interactiveSubtitle: string;
  calculatorTitle: string;
  calculatorSubtitle: string;
  sphLabel: string;
  cylLabel: string;
  idealIndexTitle: string;
  thicknessCompareTitle: string;
  indexStandard: string;
  indexThin: string;
  indexSuperThin: string;
  indexUltraThin: string;
  standardDesc: string;
  thinDesc: string;
  superThinDesc: string;
  ultraThinDesc: string;
  hiraAdviceHeader: string;
  lensEdgeThickness: string;
  reductionLabel: string;
  
  eduTitle: string;
  eduSubtitle: string;
  
  contactTitle: string;
  contactSubtitle: string;
  contactName: string;
  contactEmail: string;
  contactSubject: string;
  contactMessage: string;
  contactSendBtn: string;
  contactSending: string;
  contactSuccess: string;
  contactError: string;
  contactIntro: string;
  contactLocationTitle: string;
  contactDirectTitle: string;
  contactLocationText: string;
  contactMailBtn: string;
  contactCopyBtn: string;
  contactCopiedBtn: string;
  contactCallBtn: string;
  
  aboutHighlightText: string;
  aboutHighlight1Title: string;
  aboutHighlight1Desc: string;
  aboutHighlight2Title: string;
  aboutHighlight2Desc: string;
  aboutHighlight3Title: string;
  aboutHighlight3Desc: string;
  
  langNativo: string;
  langBilingue: string;
  langAvanzado: string;
  
  footerDesc: string;
  footerSections: string;
  footerCVDesc: string;
  
  jobs: {
    optician: {
      title: string;
      company: string;
      period: string;
      bullets: string[];
    };
    workshopManager: {
      title: string;
      company: string;
      period: string;
      bullets: string[];
    };
    salesAssistant: {
      title: string;
      company: string;
      period: string;
      bullets: string[];
    };
    socialFacilitator: {
      title: string;
      company: string;
      period: string;
      bullets: string[];
    };
  };
  
  education: {
    degree: {
      title: string;
      school: string;
      period: string;
    };
    vocational: {
      title: string;
      school: string;
      period: string;
    };
    highschool: {
      title: string;
      school: string;
      period: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    navHome: 'Inicio',
    navAbout: 'Sobre Mí',
    navSkills: 'Especialidades',
    navExperience: 'Experiencia',
    navInteractive: 'Lentes',
    navEducation: 'Formación',
    navContact: 'Contacto',
    
    heroGreeting: '¡Hola! Soy Hira Khan Aslam ✿',
    heroSubtitle: 'Óptica - Optometrista',
    heroDescription: 'Apasionada por la salud de tus ojitos, con más de 4 años de experiencia en refracción, lentes de contacto y montaje de gafas. Inteligente, alegre y amante de las flores y las gafas bonitas. ¡Bienvenido a mi rincón cuqui!',
    heroContactBtn: '¡Hablemos!',
    heroCVBtn: 'Descargar CV',
    
    aboutTitle: 'Sobre Mí',
    aboutSubtitle: 'Salud visual con mucha empatía, sonrisas y flores',
    aboutText1: '¡Hola! Soy una óptica-optometrista con 4 años de experiencia. Me fascina ayudar a que las personas vean el mundo con total claridad. Para mí, la óptica es escuchar con dulzura, comprender qué necesita tu mirada y aconsejarte con cariño y alegría.',
    aboutText2: 'Me gradué en la Universitat Politècnica de Catalunya (UPC) y me he especializado tanto en el gabinete clínico como en el taller de montaje de gafas, cuidando cada detalle.',
    aboutText3: 'Creo que una mirada feliz alegra el corazón y que un trato humano, empático y súper adorable marca la diferencia.',
    aboutHighlightOptics: 'Salud Visual',
    aboutHighlightCare: 'Atención Cuqui',
    
    skillsTitle: 'Especialidades y Habilidades',
    skillsSubtitle: 'Un toque de ciencia visual, precisión técnica y mucho cariño por los detalles.',
    skillsOptometry: 'Óptica y Optometría',
    skillsContactology: 'Contactología Especializada',
    skillsWorkshop: 'Montaje y Taller',
    skillsInstruments: 'Instrumentación Clínica',
    skillsLanguages: 'Idiomas',
    skillsSoft: 'Cualidades Adorables',
    
    expTitle: 'Experiencia Profesional',
    expSubtitle: 'Mi dulce camino en gabinetes universitarios, talleres de óptica y atención clínica.',
    expPresent: 'Actualidad',
    
    interactiveTitle: 'Calculador de Reducción de Cristales 👓',
    interactiveSubtitle: '¿No sabes qué reducción elegir para tus gafas? Introduce tu graduación y mira la diferencia de grosor y peso de forma sencilla.',
    calculatorTitle: 'Grosor de Cristales',
    calculatorSubtitle: 'Selecciona tu Esfera y Cilindro para ver qué lente te recomienda Hira.',
    sphLabel: 'Esfera (SPH) - Miopía / Hipermetropía',
    cylLabel: 'Cilindro (CYL) - Astigmatismo',
    idealIndexTitle: 'Lente Recomendada',
    thicknessCompareTitle: 'Espesor Estimado del Cristal',
    indexStandard: 'Estándar 1.5',
    indexThin: 'Reducida 1.6',
    indexSuperThin: 'Extra-Fina 1.67',
    indexUltraThin: 'Ultra-Fina 1.74',
    standardDesc: 'Apta para graduaciones bajas. Lente básica, más económica pero más gruesa y pesada.',
    thinDesc: '¡20% más fina! Muy resistente y ligera. Es la ideal para monturas al aire o ranuradas.',
    superThinDesc: '¡35% más fina! Excelente estética. Ideal para evitar el efecto de ojo grande o pequeño.',
    ultraThinDesc: '¡45% más fina! La máxima reducción física. Ideal para graduaciones altas.',
    hiraAdviceHeader: 'El consejo de Hira 🌸',
    lensEdgeThickness: 'Espesor del Borde',
    reductionLabel: 'Reducción de peso',
    
    eduTitle: 'Educación y Formación',
    eduSubtitle: 'Mi formación en la UPC y mis especialidades más queridas.',
    
    contactTitle: 'Contacto',
    contactSubtitle: '¿Buscas una profesional de la visión o quieres saludarme? Escríbeme.',
    contactName: 'Nombre Completo',
    contactEmail: 'Correo Electrónico',
    contactSubject: 'Asunto',
    contactMessage: 'Mensaje',
    contactSendBtn: 'Enviar Mensaje',
    contactSending: 'Enviando...',
    contactSuccess: '¡Mensaje enviado con éxito! Te responderé con una gran sonrisa muy pronto.',
    contactError: 'Ocurrió un error. Por favor, inténtalo de nuevo.',
    contactIntro: '¿Buscas una óptica-optometrista comprometida, entusiasta y con experiencia clínica para tu equipo? No dudes en contactarme. ¡Estoy disponible para empezar ya!',
    contactLocationTitle: 'Ubicación',
    contactDirectTitle: 'Contacto Directo',
    contactLocationText: 'Barcelona, Cataluña, España',
    contactMailBtn: 'Enviar Correo',
    contactCopyBtn: 'Copiar Email',
    contactCopiedBtn: '¡Copiado!',
    contactCallBtn: 'Llamar',
    
    aboutHighlightText: 'Especialista en refracción clínica, lentes de contacto y asesoramiento de monturas personalizadas.',
    aboutHighlight1Title: 'Refracción de Precisión',
    aboutHighlight1Desc: 'Exámenes detallados para compensar miopía, hipermetropía, astigmatismo y presbicia con mucho mimo.',
    aboutHighlight2Title: 'Taller y Montaje',
    aboutHighlight2Desc: 'Corte, biselado y montaje de lentes en todo tipo de monturas en el laboratorio clínico.',
    aboutHighlight3Title: 'Contactología Feliz',
    aboutHighlight3Desc: 'Adaptación personalizada de lentes de contacto para que sientas tus ojos cómodos y frescos.',
    
    langNativo: 'Nativo',
    langBilingue: 'Bilingüe',
    langAvanzado: 'Avanzado',
    
    footerDesc: 'Salud visual y optometría especializada. Cuidando tus ojitos con el mejor asesoramiento, profesionalidad y un trato súper cercano y alegre.',
    footerSections: 'Secciones',
    footerCVDesc: '¿Quieres descargar mi curriculum en formato PDF?',
    
    jobs: {
      optician: {
        title: 'Óptica y Optometrista',
        company: 'Óptica Universitaria',
        period: '2022 - Actualidad',
        bullets: [
          'Realización de exámenes visuales completos para determinar la graduación y salud ocular básica.',
          'Adaptación de lentes de contacto blandas y permeables, incluyendo pruebas de tolerancia, instrucciones de uso y visitas de seguimiento.',
          'Asesoramiento personalizado a pacientes sobre opciones de lentes oftálmicas y monturas según sus necesidades visuales y estéticas.',
          'Operación de instrumental clínico especializado (foróptero, retinoscopio, biomicroscopio con lámpara de hendidura, tonómetro de aire).',
          'Detección temprana de signos de patologías oculares y derivación oportuna a oftalmología.',
          'Gestión de pedidos y control de stock de lentes de contacto, monturas y productos para el cuidado ocular.',
          'Mantenimiento y actualización constante del historial clínico y registros optométricos de los pacientes.'
        ]
      },
      workshopManager: {
        title: 'Responsable de Taller',
        company: 'Centre Universitari de la Visió (CUV)',
        period: '2021 - 2022',
        bullets: [
          'Gestión integral del taller de óptica, organizando el stock de monturas y lentes para garantizar la disponibilidad.',
          'Biselado, montaje y centrado de lentes oftálmicas en monturas de metal, acetato, ranuradas y al aire, garantizando altos estándares de acabado.',
          'Manipulación y preparación de lentes de contacto especiales, así como el control de calidad del material del taller.',
          'Reparación, ajuste y mantenimiento de gafas para pacientes del centro universitario.'
        ]
      },
      salesAssistant: {
        title: 'Dependienta y Atención al Cliente',
        company: 'Diversos establecimientos',
        period: '2017 - 2019',
        bullets: [
          'Atención al cliente y asesoramiento comercial directo en tienda.',
          'Cobro en caja, gestión de arqueo y procesamiento de cobros electrónicos.',
          'Recepción, reposición, etiquetado y organización visual de productos en tienda.',
          'Apertura y cierre de tienda, garantizando la seguridad y el mantenimiento del establecimiento.',
          'Mantenimiento del orden y la limpieza de la superficie de ventas.'
        ]
      },
      socialFacilitator: {
        title: 'Dinamizadora Social',
        company: 'Espai Social La Verneda',
        period: '2014 - 2017',
        bullets: [
          'Refuerzo escolar y acompañamiento a niños y jóvenes en la realización de tareas escolares y técnicas de estudio.',
          'Diseño y facilitación de talleres creativos de manualidades y actividades de participación activa.',
          'Traducción e interpretación lingüística (Catalán/Castellano/Urdu/Punjabi) para facilitar la comunicación y mediación cultural en la comunidad.'
        ]
      }
    },
    
    education: {
      degree: {
        title: 'Grado en Óptica y Optometría',
        school: 'Universitat Politècnica de Catalunya (UPC)',
        period: '2018 - 2022'
      },
      vocational: {
        title: 'CFGS en Radioterapia y Dosimetría',
        school: 'Campus Training',
        period: '2017'
      },
      highschool: {
        title: 'Bachillerato Científico',
        school: 'Institut Joan d\'Àustria',
        period: '2014 - 2016'
      }
    }
  },
  en: {
    navHome: 'Home',
    navAbout: 'About Me',
    navSkills: 'Specialties',
    navExperience: 'Experience',
    navInteractive: 'Lenses',
    navEducation: 'Education',
    navContact: 'Contact',
    
    heroGreeting: 'Hi! I\'m Hira Khan Aslam ✿',
    heroSubtitle: 'Optician - Optometrist',
    heroDescription: 'Passionate about your eye health, with over 4 years of experience in refraction, contact lenses, and lens mounting. Smart, cheerful, and in love with flowers and pretty glasses. Welcome to my cute corner!',
    heroContactBtn: 'Let\'s Talk!',
    heroCVBtn: 'Download CV',
    
    aboutTitle: 'About Me',
    aboutSubtitle: 'Visual health with empathy, smiles, and flowers',
    aboutText1: 'Hi there! I am an optician-optometrist with 4 years of experience. I love helping people see the world with total clarity. For me, optics is about listening gently, understanding what your eyes need, and advising you with care and joy.',
    aboutText2: 'I graduated from the Polytechnic University of Catalonia (UPC) and specialized in both the clinical office and the lens mounting workshop, taking care of every little detail.',
    aboutText3: 'I believe a happy look brings joy to the heart, and that a human, empathetic, and super adorable touch makes all the difference.',
    aboutHighlightOptics: 'Visual Health',
    aboutHighlightCare: 'Cute Care',
    
    skillsTitle: 'Specialties & Skills',
    skillsSubtitle: 'A touch of visual science, technical precision, and a lot of love for details.',
    skillsOptometry: 'Optics & Optometry',
    skillsContactology: 'Specialized Contactology',
    skillsWorkshop: 'Assembly & Workshop',
    skillsInstruments: 'Clinical Instruments',
    skillsLanguages: 'Languages',
    skillsSoft: 'Adorable Qualities',
    
    expTitle: 'Professional Experience',
    expSubtitle: 'My sweet journey in university clinics, optical workshops, and clinical care.',
    expPresent: 'Present',
    
    interactiveTitle: 'Lens Thinning & Index Calculator 👓',
    interactiveSubtitle: 'Not sure which lens index to select for your glasses? Enter your prescription and easily see the difference in thickness and weight.',
    calculatorTitle: 'Lens Thickness',
    calculatorSubtitle: 'Select your Sphere and Cylinder values to see what lens Hira recommends.',
    sphLabel: 'Sphere (SPH) - Nearsightedness / Farsightedness',
    cylLabel: 'Cylinder (CYL) - Astigmatism',
    idealIndexTitle: 'Recommended Lens',
    thicknessCompareTitle: 'Estimated Lens Thickness',
    indexStandard: 'Standard 1.5',
    indexThin: 'Thin 1.6',
    indexSuperThin: 'Super Thin 1.67',
    indexUltraThin: 'Ultra Thin 1.74',
    standardDesc: 'Suitable for low prescriptions. Basic lens, more economical but thicker and heavier.',
    thinDesc: '20% thinner! Highly resistant and lightweight. Ideal choice for rimless or semi-rimless frames.',
    superThinDesc: '35% thinner! Excellent aesthetics. Ideal to avoid eyes appearing too magnified or minified.',
    ultraThinDesc: '45% thinner! The maximum physical thickness reduction. Ideal for high prescriptions.',
    hiraAdviceHeader: 'Hira\'s Advice 🌸',
    lensEdgeThickness: 'Edge Thickness',
    reductionLabel: 'Weight reduction',
    
    eduTitle: 'Education & Training',
    eduSubtitle: 'My training at UPC and my most beloved specialties.',
    
    contactTitle: 'Contact Me',
    contactSubtitle: 'Looking for a vision professional or want to say hello? Write to me.',
    contactName: 'Full Name',
    contactEmail: 'Email Address',
    contactSubject: 'Subject',
    contactMessage: 'Message',
    contactSendBtn: 'Send Message',
    contactSending: 'Sending...',
    contactSuccess: 'Message sent successfully! I will reply to you with a big smile very soon.',
    contactError: 'An error occurred. Please try again.',
    contactIntro: 'Looking for a committed, enthusiastic optician-optometrist with clinical experience for your team? Feel free to reach out. I am available to start right away!',
    contactLocationTitle: 'Location',
    contactDirectTitle: 'Direct Contact',
    contactLocationText: 'Barcelona, Catalonia, Spain',
    contactMailBtn: 'Send Email',
    contactCopyBtn: 'Copy Email',
    contactCopiedBtn: 'Copied!',
    contactCallBtn: 'Call',
    
    aboutHighlightText: 'Specialist in clinical refraction, contact lenses, and personalized frame styling advice.',
    aboutHighlight1Title: 'Precision Refraction',
    aboutHighlight1Desc: 'Detailed examinations to compensate for nearsightedness, farsightedness, astigmatism, and presbyopia with great care.',
    aboutHighlight2Title: 'Workshop & Assembly',
    aboutHighlight2Desc: 'Cutting, edging, and mounting lenses on all kinds of frames in the clinical laboratory.',
    aboutHighlight3Title: 'Happy Contactology',
    aboutHighlight3Desc: 'Custom fit of contact lenses so that your eyes feel comfortable, moist, and fresh.',
    
    langNativo: 'Native',
    langBilingue: 'Bilingual',
    langAvanzado: 'Advanced',
    
    footerDesc: 'Specialized visual health and optometry. Caring for your eyes with the best advice, professionalism, and a super friendly and cheerful touch.',
    footerSections: 'Sections',
    footerCVDesc: 'Do you want to download my CV in PDF format?',
    
    jobs: {
      optician: {
        title: 'Optician and Optometrist',
        company: 'Óptica Universitaria',
        period: '2022 - Present',
        bullets: [
          'Performed comprehensive eye examinations to determine refraction errors and assess basic ocular health.',
          'Fitted contact lenses (soft and RGP), conducting tolerance checks, user training, and regular follow-up consults.',
          'Advised patients on ophthalmic lens options and frames tailored to their visual needs and personal style.',
          'Operated specialized clinical equipment (phoropter, retinoscope, slit-lamp biomicroscope, air tonometer).',
          'Detected early signs of ocular conditions and referred patients to ophthalmologists when appropriate.',
          'Managed ordering processes and inventory levels for contact lenses, frames, and lens care accessories.',
          'Maintained and updated clinical records and patient charts with high precision.'
        ]
      },
      workshopManager: {
        title: 'Lab Workshop Manager',
        company: 'University Vision Center (CUV)',
        period: '2021 - 2022',
        bullets: [
          'Managed the optical lab, supervising lens and frame inventories to ensure workshop availability.',
          'Assembled, edged, and adjusted lenses into full rim, semi-rimless, and rimless frames according to specifications.',
          'Handled and prepared specialized contact lenses and managed quality checks on workshop machinery.',
          'Repaired, aligned, and customized spectacles for patients of the university clinic.'
        ]
      },
      salesAssistant: {
        title: 'Sales Assistant & Customer Service',
        company: 'Various establishments',
        period: '2017 - 2019',
        bullets: [
          'Assisted and advised store customers, handling direct commercial consultations.',
          'Operated POS cash registers, balanced tills, and processed electronic card payments.',
          'Received, unpacked, tagged, and systematically displayed inventory on shelves and windows.',
          'Managed opening and closing procedures, ensuring store security and premises care.',
          'Maintained store cleanliness, organizing displays and merchandising areas.'
        ]
      },
      socialFacilitator: {
        title: 'Social Work Facilitator',
        company: 'Espai Social La Verneda',
        period: '2014 - 2017',
        bullets: [
          'Tutored and mentored children and youth, supporting homework assignments and teaching study techniques.',
          'Organized and led craft workshops and interactive group activities designed to foster active participation.',
          'Translated and interpreted (Catalan/Spanish/Urdu/Punjabi) to assist in community integration and cultural mediation.'
        ]
      }
    },
    
    education: {
      degree: {
        title: 'Bachelor\'s Degree in Optics and Optometry',
        school: 'Polytechnic University of Catalonia (UPC)',
        period: '2018 - 2022'
      },
      vocational: {
        title: 'Higher Vocational Training in Radiotherapy and Dosimetry',
        school: 'Campus Training',
        period: '2017'
      },
      highschool: {
        title: 'Scientific Baccalaureate',
        school: 'Institut Joan d\'Àustria',
        period: '2014 - 2016'
      }
    }
  }
};

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-lang') as Language | null;
    if (saved === 'es' || saved === 'en') return saved;
    return 'es'; // Default to Spanish
  });

  useEffect(() => {
    localStorage.setItem('portfolio-lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ language, t: translations[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
