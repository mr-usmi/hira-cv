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
  tryonHeading: string;
  tryonSub: string;
  chartHeading: string;
  chartSub: string;
  chartTestBtn: string;
  chartPass: string;
  chartFail: string;
  
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
    navInteractive: 'Gabinete Óptico',
    navEducation: 'Formación',
    navContact: 'Contacto',
    
    heroGreeting: '¡Hola! Soy Hira Khan Aslam',
    heroSubtitle: 'Óptica - Optometrista',
    heroDescription: 'Apasionada por el cuidado de la salud visual, con más de 4 años de experiencia en refracción, adaptación de lentes de contacto y gestión de taller. Una mente inteligente y entusiasta de la óptica... ¡con un toque alegre y floral!',
    heroContactBtn: 'Hablemos',
    heroCVBtn: 'Descargar CV',
    
    aboutTitle: 'Sobre Mí',
    aboutSubtitle: 'Ciencia visual con empatía y una gran sonrisa',
    aboutText1: 'Soy una óptica-optometrista con 4 años de experiencia en el sector. Me apasiona ayudar a las personas a ver el mundo con total claridad. Para mí, la óptica no se trata solo de graduar lentes; se trata de escuchar, comprender las necesidades de cada paciente y encontrar la montura y el tratamiento perfectos con un trato cercano y alegre.',
    aboutText2: 'Graduada por la Universitat Politècnica de Catalunya (UPC), me he especializado tanto en la parte clínica (exámenes visuales, detección de patologías oculares iniciales y contactología) como en la parte técnica del taller de montaje de gafas.',
    aboutText3: 'Creo firmemente que la salud visual mejora la calidad de vida y que un trato humano, empático y profesional marca toda la diferencia.',
    aboutHighlightOptics: 'Exámenes Visuales y Contactología',
    aboutHighlightCare: 'Atención al Paciente y Taller',
    
    skillsTitle: 'Especialidades y Habilidades',
    skillsSubtitle: 'Combinación de destreza clínica, precisión técnica y un toque multicultural.',
    skillsOptometry: 'Óptica y Optometría',
    skillsContactology: 'Contactología Avanzada',
    skillsWorkshop: 'Montaje y Taller de Gafas',
    skillsInstruments: 'Instrumentación Clínica',
    skillsLanguages: 'Multilingüe',
    skillsSoft: 'Habilidades Personales',
    
    expTitle: 'Experiencia Profesional',
    expSubtitle: 'Mi trayectoria en gabinetes universitarios, talleres de óptica y atención clínica.',
    expPresent: 'Actualidad',
    
    interactiveTitle: 'Gabinete Óptico Interactivo',
    interactiveSubtitle: 'Diviértete probando monturas virtuales o jugando a medir tu agudeza visual.',
    tryonHeading: 'Probador de Gafas Virtual',
    tryonSub: 'Prueba diferentes estilos de monturas y encuentra las gafas ideales para Hira.',
    chartHeading: 'Test de Visión Interactivo',
    chartSub: 'Encuentra qué letra se muestra en la tabla de Snellen. ¡Haz clic en las lentes para enfocar la visión borrosa!',
    chartTestBtn: 'Graduar Visión',
    chartPass: '¡Excelente visión! Agudeza visual 1.0 (20/20).',
    chartFail: 'La visión está borrosa. Aplica la lente correctora para enfocar.',
    
    eduTitle: 'Educación y Formación',
    eduSubtitle: 'Mi formación académica en la UPC y especializaciones técnicas.',
    
    contactTitle: 'Contacto',
    contactSubtitle: '¿Buscas una profesional de la visión o quieres colaborar? Escríbeme.',
    contactName: 'Nombre Completo',
    contactEmail: 'Correo Electrónico',
    contactSubject: 'Asunto',
    contactMessage: 'Mensaje',
    contactSendBtn: 'Enviar Mensaje',
    contactSending: 'Enviando...',
    contactSuccess: '¡Mensaje enviado con éxito! Me pondré en contacto contigo muy pronto.',
    contactError: 'Ocurrió un error. Por favor, inténtalo de nuevo.',
    
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
    navInteractive: 'Optometric Lab',
    navEducation: 'Education',
    navContact: 'Contact',
    
    heroGreeting: 'Hi! I\'m Hira Khan Aslam',
    heroSubtitle: 'Optician - Optometrist',
    heroDescription: 'Passionate about visual health care, with over 4 years of experience in refraction, contact lens fitting, and lab workshop management. An intelligent optics mind... with a cheerful and floral touch!',
    heroContactBtn: 'Let\'s Talk',
    heroCVBtn: 'Download CV',
    
    aboutTitle: 'About Me',
    aboutSubtitle: 'Visual science with empathy and a big smile',
    aboutText1: 'I am an optician-optometrist with 4 years of professional experience. I love helping people see the world with total clarity. For me, optics is not just about prescribing lenses; it is about listening, understanding each patient\'s unique needs, and finding the perfect frames and treatment with a friendly and warm approach.',
    aboutText2: 'Graduated from the Polytechnic University of Catalonia (UPC), I have specialized in both clinical care (visual exams, early eye pathology detection, and contactology) and the technical side of the optical assembly workshop.',
    aboutText3: 'I strongly believe that visual health enhances quality of life, and that a human, empathetic, and professional touch makes all the difference.',
    aboutHighlightOptics: 'Visual Exams & Contactology',
    aboutHighlightCare: 'Patient Care & Lab Workshop',
    
    skillsTitle: 'Specialties & Skills',
    skillsSubtitle: 'A blend of clinical accuracy, technical precision, and a multicultural background.',
    skillsOptometry: 'Optics & Optometry',
    skillsContactology: 'Advanced Contactology',
    skillsWorkshop: 'Lens Fitting & Optical Workshop',
    skillsInstruments: 'Clinical Instrumentation',
    skillsLanguages: 'Multilingual',
    skillsSoft: 'Soft Skills',
    
    expTitle: 'Professional Experience',
    expSubtitle: 'My professional path in university eye clinics, optical workshops, and clinical care.',
    expPresent: 'Present',
    
    interactiveTitle: 'Interactive Optical Lab',
    interactiveSubtitle: 'Have fun trying on virtual glasses frames or testing your visual acuity.',
    tryonHeading: 'Virtual Glasses Try-On',
    tryonSub: 'Try on different styles of frames and find the perfect glasses for Hira.',
    chartHeading: 'Interactive Vision Test',
    chartSub: 'Identify the letter shown on the Snellen Chart. Click the optical lenses to focus the blurry image!',
    chartTestBtn: 'Adjust Vision',
    chartPass: 'Excellent vision! Visual acuity 20/20 (1.0).',
    chartFail: 'Vision is blurry. Apply the corrective lens to focus the letters.',
    
    eduTitle: 'Education & Training',
    eduSubtitle: 'My academic degrees from UPC and technical vocational training.',
    
    contactTitle: 'Contact Me',
    contactSubtitle: 'Looking for a vision specialist or want to collaborate? Drop me a message.',
    contactName: 'Full Name',
    contactEmail: 'Email Address',
    contactSubject: 'Subject',
    contactMessage: 'Message',
    contactSendBtn: 'Send Message',
    contactSending: 'Sending...',
    contactSuccess: 'Message sent successfully! I will get back to you very soon.',
    contactError: 'An error occurred. Please try again.',
    
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
