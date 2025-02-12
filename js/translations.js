const translations = {
    // French translations
    fr: {
        // Navigation
        "nav-home": "Accueil",
        "nav-about": "À propos", 
        "nav-projects": "Projets",
        "nav-skills": "Compétences",
        "nav-contact": "Contact",

        // Theme colors
        "accent-color": "Couleur d'accentuation :",
        "default": "Défaut",
        "red": "Rouge",
        "orange": "Orange", 
        "green": "Vert",
        "pink": "Rose",

        // Hero section
        "hero-subtitle": "Développeur Web & Étudiant en BUT Informatique",
        "view-projects": "Voir mes projets",
        "contact-me": "Me contacter",

        // Services section
        "services-title": "Ce que je peux faire pour vous",
        "web-dev-title": "Développement Web",
        "web-dev-desc": "Création de sites web responsifs et modernes utilisant les dernières technologies.",
        "app-dev-title": "Applications",
        "app-dev-desc": "Développement d'applications performantes en C, C++ et autres langages.",
        "ui-design-title": "UI/UX Design",
        "ui-design-desc": "Conception d'interfaces utilisateur intuitives et esthétiques.",

        // Expertise section
        "technical-expertise": "Expertise Technique",
        "years-experience": "Année d'expérience en programmation",
        "completed-projects": "Projets réalisés",
        "technologies-mastered": "Technologies maîtrisées",
        "view-all-skills": "Voir toutes mes compétences",
        "lets-work": "Travaillons ensemble",
        "project-idea": "Vous avez un projet en tête ? Je serais ravi d'en discuter !",
        "download-cv": "Télécharger mon CV",

        // Contact form
        "contact-title": "Contactez-moi",
        "contact-desc": "N'hésitez pas à me contacter pour toute question ou collaboration. Je serai ravi d'échanger avec vous !",
        "name": "Nom",
        "name-placeholder": "Votre nom complet",
        "email-placeholder": "exemple@email.com",
        "subject": "Sujet",
        "select-subject": "Sélectionnez un sujet",
        "collaboration": "Proposition de collaboration",
        "general-question": "Question générale",
        "project-discussion": "Discussion de projet",
        "other": "Autre",
        "message": "Message",
        "message-placeholder": "Votre message ici (10-1000 caractères)",
        "privacy-policy": "J'accepte que mes données soient utilisées pour être recontacté(e)",
        "send": "Envoyer",

        // Footer
        "follow-me": "Suivez-moi :",
        "copyright": "© 2024 Sasha Lorenc. Tous droits réservés.",
        "rights-reserved": "Tous droits réservés.",

        // About page
        "about-title": "À propos de moi",
        "about-description": "Je m'appelle Sasha Lorenc, développeur passionné par l'informatique et le design. Je cherche constamment à apprendre et à m'améliorer. En tant qu'étudiant en Première année de BUT Informatique passionné par le développement web, je maîtrise les langages HTML, CSS, me permettant la création d'applications web. J'apprécie également le développement d'applications bureau avec des langages tels que le C,C++. Mon adaptabilité me permet de relever les défis techniques en combinant mes compétences techniques, incluant des connaissances en frameworks, je suis capable de transformer des concepts en applications web de manière professionnelle. Pour la rentrée 2025, je suis à la recherche d'une alternance dans le domaine du développement web ou autre.",
        "education-title": "Mon parcours",
        "education-description": "Je suis actuellement étudiant en BUT Informatique à l'IUT de Clermont-Ferrand. Avant cela, j'ai obtenu mon baccalauréat avec les spécialités NSI (Numérique et Sciences Informatiques) et Mathématiques au lycée Albert Londres à Cusset. Durant mon parcours lycéen, j'ai eu l'opportunité exceptionnelle de participer à un projet innovant en partenariat avec Samsung dans le cadre du programme \"Solve for Tomorrow\". Notre équipe a fait partie des 5 groupes sélectionnés parmi plus d'un millier de groupes en France pour présenter notre projet devant un jury à Paris, une expérience enrichissante qui a renforcé mes compétences en gestion de projet ainsi qu'en expression orale.",
        "motivation-title": "Ce qui me motive",
        "motivation-description": "J'aime créer des interfaces intuitives et esthétiques, et je cherche à rendre chaque projet innovant et unique pour permettre aux sites que je crée d'être facilement identifiables par leurs utilisateurs.",
        "contact-btn": "Me contacter",
        "scroll-top": "↑",

        // Skills page
        "skills-title": "Mes Compétences",
        "technical-skills": "Compétences Techniques",
        "general-skills": "Compétences Générales",
        "html-css": "HTML & CSS",
        "javascript": "JavaScript",
        "php-mysql": "PHP & MySQL",
        "react-nodejs": "React & Node.js",
        "frameworks-tools": "Frameworks & Outils",
        "project-management": "Gestion de projet",
        "communication": "Communication",
        "problem-solving": "Résolution de problèmes",
        "adaptability": "Adaptabilité",
        "creativity": "Créativité",
        "organization": "Organisation",
        "analysis": "Esprit d'analyse",

        // Skill descriptions
        "project-management-desc": "Leadership naturel avec expérience dans la coordination d'équipes. Excellente capacité à établir des plannings réalistes et à gérer les ressources efficacement. Compétences avérées en gestion des risques et résolution de conflits.",
        "communication-desc": "Communication claire et persuasive en français et en anglais. Capacité à vulgariser des concepts techniques complexes. Excellente aptitude à la rédaction de documentation technique et rapports professionnels. Fort esprit d'équipe avec capacité à fédérer autour d'objectifs communs.",
        "problem-solving-desc": "Capacité à décomposer des problèmes complexes en éléments gérables. Maîtrise des techniques de debugging et d'optimisation. Expérience en analyse de données pour la prise de décision. Capacité à anticiper les problèmes potentiels et à mettre en place des solutions préventives.",
        "adaptability-desc": "Excellente capacité d'adaptation aux changements technologiques et organisationnels. Apprentissage rapide des nouveaux outils et frameworks.Capacité à travailler efficacement dans des environnements multiculturels. Résilience face aux situations stressantes et aux deadlines serrées.",
        "creativity-desc": "Approche innovante dans la résolution de problèmes techniques. Capacité à concevoir des solutions efficaces. Expérience en design thinking et brainstorming créatif. Aptitude à sortir des sentiers battus pour proposer des solutions originales. Passion pour l'innovation technologique et l'amélioration continue.",
        "organization-desc": "Excellence dans la gestion du temps et des priorités. Maîtrise des outils de gestion de projet et de productivité. Capacité à gérer plusieurs projets simultanément. Rigueur dans le suivi des tâches et le respect des délais.",
        "analysis-desc": "Capacité à analyser des situations complexes et à en tirer des conclusions pertinentes. Compétences en analyse de données et en prise de décision basée sur les faits. Approche critique et objective des problèmes.",

        // Projects page
        "page-title": "Projets - Portfolio de Sasha Lorenc",
        "projects-title": "Mes Projets",
        "project1-title": "Projet 1 : Jeux vidéo",
        "project1-desc": "Un jeux vidéo médieval en tour par tour basé sur le pierre feuille cisceau.",
        "project2-title": "Projet 2 : Application de Gestion",
        "project2-desc": "Une application pour gérer stages au sein du département informatique de l'IUT de Clermont-Ferrand.",
        "project3-title": "Projet 3 : Portfolio Interactif",
        "project3-desc": "Un portfolio interactif pour présenter mes compétences et projets de manière visuelle.",
        "project4-title": "Projet 4 : TaskShade",
        "project4-desc": "Une To Do List en ligne permettant d'organiser vos tâches par importance et date d'échéance.",
        "view-project": "Voir le projet",
        "technologies": "Technologies :"
    },

    // English translations 
    en: {
        // Navigation
        "nav-home": "Home",
        "nav-about": "About",
        "nav-projects": "Projects",
        "nav-skills": "Skills",
        "nav-contact": "Contact",

        // Theme colors
        "accent-color": "Accent color:",
        "default": "Default",
        "red": "Red",
        "orange": "Orange",
        "green": "Green",
        "pink": "Pink",

        // Hero section
        "hero-subtitle": "Web Developer & Computer Science Student",
        "view-projects": "View my projects",
        "contact-me": "Contact me",

        // Services section
        "services-title": "What I can do for you",
        "web-dev-title": "Web Development",
        "web-dev-desc": "Creation of responsive and modern websites using the latest technologies.",
        "app-dev-title": "Applications",
        "app-dev-desc": "Development of high-performance applications in C, C++ and other languages.",
        "ui-design-title": "UI/UX Design",
        "ui-design-desc": "Design of intuitive and aesthetic user interfaces.",

        // Expertise section
        "technical-expertise": "Technical Expertise",
        "years-experience": "Year of programming experience",
        "completed-projects": "Completed projects",
        "technologies-mastered": "Technologies mastered",
        "view-all-skills": "View all my skills",
        "lets-work": "Let's work together",
        "project-idea": "Have a project in mind? I'd love to discuss it!",
        "download-cv": "Download my CV",

        // Contact form
        "contact-title": "Contact Me",
        "contact-desc": "Don't hesitate to contact me for any questions or collaboration. I would be happy to discuss with you!",
        "name": "Name",
        "name-placeholder": "Your full name",
        "email-placeholder": "example@email.com",
        "subject": "Subject",
        "select-subject": "Select a subject",
        "collaboration": "Collaboration proposal",
        "general-question": "General question",
        "project-discussion": "Project discussion",
        "other": "Other",
        "message": "Message",
        "message-placeholder": "Your message here (10-1000 characters)",
        "privacy-policy": "I agree that my data will be used to be contacted",
        "send": "Send",

        // Footer
        "follow-me": "Follow me:",
        "copyright": "© 2024 Sasha Lorenc. All rights reserved.",
        "rights-reserved": "All rights reserved.",

        // About page
        "about-title": "About Me",
        "about-description": "My name is Sasha Lorenc, a developer passionate about computer science and design. I constantly seek to learn and improve. As a first-year student in Computer Science passionate about web development, I master HTML and CSS languages, allowing me to create web applications. I also enjoy developing desktop applications using languages such as C,C++. My adaptability allows me to meet technical challenges by combining my technical skills, including knowledge of frameworks, I am able to transform concepts into web applications in a professional manner. For the 2025 academic year, I am looking for an apprenticeship in web development or related fields.",
        "education-title": "My Journey",
        "education-description": "I am currently a student in Computer Science at the IUT of Clermont-Ferrand. Before that, I obtained my baccalaureate with specializations in NSI (Digital and Computer Sciences) and Mathematics at Albert Londres High School in Cusset. During my high school years, I had the exceptional opportunity to participate in an innovative project in partnership with Samsung as part of the \"Solve for Tomorrow\" program. Our team was among the 5 groups selected from over a thousand groups in France to present our project to a jury in Paris, an enriching experience that strengthened my project management and public speaking skills.",
        "motivation-title": "What Drives Me",
        "motivation-description": "I love creating intuitive and aesthetic interfaces, and I seek to make each project innovative and unique to allow the sites I create to be easily identifiable by their users.",
        "contact-btn": "Contact Me",
        "scroll-top": "↑",

        // Skills page
        "skills-title": "My Skills",
        "technical-skills": "Technical Skills",
        "general-skills": "General Skills",
        "html-css": "HTML & CSS",
        "javascript": "JavaScript",
        "php-mysql": "PHP & MySQL",
        "react-nodejs": "React & Node.js",
        "frameworks-tools": "Frameworks & Tools",
        "project-management": "Project Management",
        "communication": "Communication",
        "problem-solving": "Problem Solving",
        "adaptability": "Adaptability",
        "creativity": "Creativity",
        "organization": "Organization",
        "analysis": "Analysis",

        // Skill descriptions
        "project-management-desc": "Natural leadership with team coordination experience. Excellent ability to establish realistic schedules and efficiently manage resources. Proven skills in risk management and conflict resolution.",
        "communication-desc": "Clear and persuasive communication in both French and English. Ability to explain complex technical concepts. Excellent technical documentation and professional report writing skills. Strong team spirit with ability to unite around common goals.",
        "problem-solving-desc": "Ability to break down complex problems into manageable elements. Mastery of debugging and optimization techniques. Experience in data analysis for decision making. Ability to anticipate potential problems and implement preventive solutions.",
        "adaptability-desc": "Excellent adaptability to technological and organizational changes. Quick learning of new tools and frameworks. Ability to work effectively in multicultural environments. Resilience in stressful situations and tight deadlines.",
        "creativity-desc": "Innovative approach to technical problem solving. Ability to design effective solutions. Experience in design thinking and creative brainstorming. Aptitude for thinking outside the box to propose original solutions. Passion for technological innovation and continuous improvement.",
        "organization-desc": "Excellence in time and priority management. Mastery of project management and productivity tools. Ability to manage multiple projects simultaneously. Rigorous in task tracking and meeting deadlines.",
        "analysis-desc": "Ability to analyze complex situations and draw relevant conclusions. Skills in data analysis and fact-based decision making. Critical and objective approach to problems.",

        // Projects page
        "page-title": "Projects - Sasha Lorenc's Portfolio",
        "projects-title": "My Projects",
        "project1-title": "Project 1: Video Game",
        "project1-desc": "A medieval turn-based video game based on rock paper scissors.",
        "project2-title": "Project 2: Management Application",
        "project2-desc": "An application to manage internships within the IT department of the IUT of Clermont-Ferrand.",
        "project3-title": "Project 3: Interactive Portfolio",
        "project3-desc": "An interactive portfolio to showcase my skills and projects visually.",
        "project4-title": "Project 4: TaskShade",
        "project4-desc": "An online To Do List allowing you to organize your tasks by importance and due date.",
        "view-project": "View project",
        "technologies": "Technologies:"
    },

    // Spanish translations
    esp: {
        // Navigation
        "nav-home": "Inicio",
        "nav-about": "Acerca de",
        "nav-projects": "Proyectos",
        "nav-skills": "Habilidades",
        "nav-contact": "Contacto",

        // Theme colors
        "accent-color": "Color de acento:",
        "default": "Predeterminado",
        "red": "Rojo",
        "orange": "Naranja",
        "green": "Verde",
        "pink": "Rosa",

        // Hero section
        "hero-subtitle": "Desarrollador Web & Estudiante de Informática en BUT",
        "view-projects": "Ver mis proyectos",
        "contact-me": "Contactame",

        // Services section
        "services-title": "Lo que puedo hacer para ti",
        "web-dev-title": "Desarrollo Web",
        "web-dev-desc": "Creación de sitios web responsivos y modernos utilizando las últimas tecnologías.",
        "app-dev-title": "Aplicaciones",
        "app-dev-desc": "Desarrollo de aplicaciones de alto rendimiento en C, C++ y otros lenguajes.",
        "ui-design-title": "Diseño UI/UX",
        "ui-design-desc": "Diseño de interfaces de usuario intuitivas y estéticas.",

        // Expertise section
        "technical-expertise": "Habilidades técnicas",
        "years-experience": "Año de experiencia en programación",
        "completed-projects": "Proyectos completados",
        "technologies-mastered": "Tecnologías dominadas",
        "view-all-skills": "Ver todas mis habilidades",
        "lets-work": "Trabajemos juntos",
        "project-idea": "¿Tienes un proyecto en mente? ¡Estoy encantado de discutirlo!",
        "download-cv": "Descargar mi CV",

        // Contact form
        "contact-title": "Contactame",
        "contact-desc": "No dudes en contactarme para cualquier pregunta o colaboración. ¡Estoy feliz de discutir contigo!",
        "name": "Nombre",
        "name-placeholder": "Tu nombre completo",
        "email-placeholder": "ejemplo@email.com",
        "subject": "Asunto",
        "select-subject": "Selecciona un asunto",
        "collaboration": "Propuesta de colaboración",
        "general-question": "Pregunta general",
        "project-discussion": "Discusión de proyecto",
        "other": "Otro",
        "message": "Mensaje",
        "message-placeholder": "Tu mensaje aquí (10-1000 caracteres)",
        "privacy-policy": "Acepto que mis datos se utilicen para ser contactado(a)",
        "send": "Enviar",

        // Footer
        "follow-me": "Sígueme:",
        "copyright": "© 2024 Sasha Lorenc. Todos los derechos reservados.",
        "rights-reserved": "Todos los derechos reservados.",

        // About page
        "about-title": "Acerca de mí",
        "about-description": "Mi nombre es Sasha Lorenc, desarrollador apasionado por la informática y el diseño. Siempre busco aprender y mejorar. Como estudiante de primer año en Informática, estoy apasionado por el desarrollo web y domino los lenguajes HTML y CSS, lo que me permite crear aplicaciones web. También disfruto desarrollando aplicaciones de escritorio utilizando lenguajes como C,C++. Mi adaptabilidad me permite enfrentar desafíos técnicos combinando mis habilidades técnicas, incluyendo conocimientos en frameworks, lo que me permite transformar conceptos en aplicaciones web de manera profesional. Para el año académico 2025, estoy buscando una pasantía en desarrollo web o campos relacionados.",
        "education-title": "Mi viaje",
        "education-description": "Actualmente soy estudiante de Informática en el IUT de Clermont-Ferrand. Antes de eso, obtuve mi baccalauréat con las especialidades NSI (Ciencias y Tecnologías de la Información) y Matemáticas en el instituto Albert Londres de Cusset. Durante mi tiempo en el instituto, tuve la oportunidad excepcional de participar en un proyecto innovador en colaboración con Samsung como parte del programa \"Solve for Tomorrow\". Nuestro equipo fue uno de los 5 seleccionados entre más de mil equipos en Francia para presentar nuestro proyecto ante un jurado en París, una experiencia enriquecedora que fortaleció mis habilidades en gestión de proyectos y oratoria.",
        "motivation-title": "Qué me motiva",
        "motivation-description": "Me encanta crear interfaces intuitivas y estéticas, y busco hacer cada proyecto innovador y único para permitir que los sitios que creo sean fácilmente identificables por sus usuarios.",
        "contact-btn": "Contactame",
        "scroll-top": "↑",

        // Skills page
        "skills-title": "Mis Habilidades",
        "technical-skills": "Habilidades Técnicas",
        "general-skills": "Habilidades Generales",
        "html-css": "HTML & CSS",
        "javascript": "JavaScript",
        "php-mysql": "PHP & MySQL",
        "react-nodejs": "React & Node.js",
        "frameworks-tools": "Frameworks & Herramientas",
        "project-management": "Gestión de proyectos",
        "communication": "Comunicación",
        "problem-solving": "Resolución de problemas",
        "adaptability": "Adaptabilidad",
        "creativity": "Creatividad",
        "organization": "Organización",
        "analysis": "Espíritu analítico",

        // Skill descriptions
        "project-management-desc": "Liderazgo natural con experiencia en la coordinación de equipos. Excelente capacidad para establecer programas realistas y gestionar recursos de manera eficiente. Habilidades probadas en la gestión de riesgos y resolución de conflictos.",
        "communication-desc": "Comunicación clara y persuasiva en ambos idiomas. Capacidad para explicar conceptos técnicos complejos. Excelentes habilidades en la redacción de documentación técnica y reportes profesionales. Espíritu de equipo fuerte con capacidad para unirse a objetivos comunes.",
        "problem-solving-desc": "Capacidad para descomponer problemas complejos en elementos manejables. Maestría en técnicas de depuración y optimización. Experiencia en análisis de datos para la toma de decisiones. Capacidad para anticipar problemas potenciales y implementar soluciones preventivas.",
        "adaptability-desc": "Excelente capacidad de adaptación a cambios tecnológicos y organizativos. Aprendizaje rápido de nuevas herramientas y frameworks. Capacidad para trabajar efectivamente en entornos multicultural",
        "creativity-desc": "Enfoque innovador en la resolución de problemas técnicos. Capacidad para diseñar soluciones efectivas. Experiencia en pensamiento de diseño y brainstorming creativo. Aptitud para salir de los caminos convencionales para proponer soluciones originales. Pasión por la innovación tecnológica y la mejora continua.",
        "organization-desc": "Excelencia en la gestión del tiempo y las prioridades. Maestría en herramientas de gestión de proyectos y productividad. Capacidad para administrar varios proyectos simultáneamente. Rigor en el seguimiento de tareas y cumplimiento de plazos.",
        "analysis-desc": "Capacidad para analizar situaciones complejas y extraer conclusiones relevantes. Habilidades en análisis de datos y toma de decisiones basadas en hechos. Enfoque crítico y objetivo en los problemas.",

        // Projects page
        "page-title": "Proyectos - Portafolio de Sasha Lorenc",
        "projects-title": "Mis Proyectos",
        "project1-title": "Proyecto 1: Juego de Video",
        "project1-desc": "Un juego de video medieval en turnos basado en piedra, papel y tijera.",
        "project2-title": "Proyecto 2: Aplicación de Gestión",
        "project2-desc": "Una aplicación para gestionar pasantías en el departamento de informática del IUT de Clermont-Ferrand.",
        "project3-title": "Proyecto 3: Portafolio Interactivo",
        "project3-desc": "Un portafolio interactivo para mostrar mis habilidades y proyectos de manera visual.",
        "project4-title": "Proyecto 4: TaskShade",
        "project4-desc": "Una lista de tareas en línea para organizar tus tareas por importancia y fecha de vencimiento.",
        "view-project": "Ver proyecto",
        "technologies": "Tecnologías:"
    }
};