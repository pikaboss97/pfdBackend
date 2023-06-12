const CURRICULA = {
  'ECONOMIA': {
    'BE010101': { codigo: "BE010101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type: "I" },
    'BE010102': { codigo: "BE010102", nombre: "FILOSOFIA", creditos: "3", semestre: "1", type: "I" },
    'BE010105': { codigo: "BE010105", nombre: "ADMINISTRACION GENERAL", creditos: "4", semestre: "1", type: "I" },
    'BE010108': { codigo: "BE010108", nombre: "LENGUAJE Y REDACCION", creditos: "3", semestre: "1", type: "I" },
    'EC060103': { codigo: "EC060103", nombre: "INTRODUCCION A LA MACROECONOMIA", creditos: "4", semestre: "1", type: "I" },
    'EC060104': { codigo: "EC060104", nombre: "INTRODUCCION A LA MICROECONOMIA", creditos: "4", semestre: "1", type: "I" },
    'EC060107': { codigo: "EC060107", nombre: "ACTIVIDAD LIBRE: FISICO DEPORTIVA", creditos: "1", semestre: "1", type: "I", cat: "FD" },

    'EC060203': { codigo: "EC060203", nombre: "CONTABILIDAD GENERAL", creditos: "4", semestre: "2", type: "P" },
    'BE010109': { codigo: "BE010109", nombre: "CULTURA DE PAZ Y DEFENSA NACIONAL", creditos: "3", semestre: "2", type: "P" },
    'BE010201': { codigo: "BE010201", nombre: "MATEMATICA SUPERIOR", creditos: "4", semestre: "2", type: "P" },
    'EC060201': { codigo: "EC060201", nombre: "ANALISIS MACROECONOMICO I", creditos: "4", semestre: "2", type: "P" },
    'EC060202': { codigo: "EC060202", nombre: "ANALISIS MICROECONOMICO I", creditos: "4", semestre: "2", type: "P" },
    'EC060206': { codigo: "EC060206", nombre: "METODOLOGIA DEL TRABAJO UNIVERSITARIO", creditos: "3", semestre: "2", type: "P" },
    'EC060207': { codigo: "EC060207", nombre: "ACTIVIDAD LIBRE: ARTISTICO CULTURAL", creditos: "1", semestre: "2", type: "P", cat: "AC" },

    'BE010103': { codigo: "BE010103", nombre: "SOCIOLOGIA", creditos: "3", semestre: "3", type: "I" },
    'EC060204': { codigo: "EC060204", nombre: "HISTORIA ECONOMICA DEL PERU", creditos: "3", semestre: "3", type: "I" },
    'EC060301': { codigo: "EC060301", nombre: "ANALISIS ECONOMICO ESTATICO", creditos: "3", semestre: "3", type: "I" },
    'EC060302': { codigo: "EC060302", nombre: "ANALISIS MACROECONOMICO II", creditos: "4", semestre: "3", type: "I" },
    'EC060303': { codigo: "EC060303", nombre: "ANALISIS MICROECONOMICO II", creditos: "4", semestre: "3", type: "I" },
    'EC060304': { codigo: "EC060304", nombre: "EMPRENDIMIENTO Y LIDERAZGO", creditos: "2", semestre: "3", type: "I" },
    'EC060305': { codigo: "EC060305", nombre: "INTRODUCCION A LA ESTADISTICA APLICADA", creditos: "3", semestre: "3", type: "I" },
    'EC060306': { codigo: "EC060306", nombre: "MANEJO DE PROCESADORES DE DATOS", creditos: "2", semestre: "3", type: "I" },

    'EC060401': { codigo: "EC060401", nombre: "ANALISIS ECONOMICO DINAMICO", creditos: "3", semestre: "4", type: "P" },
    'EC060402': { codigo: "EC060402", nombre: "CONTROL DE CALIDAD", creditos: "3", semestre: "4", type: "P" },
    'EC060403': { codigo: "EC060403", nombre: "COSTOS Y PRESUPUESTOS", creditos: "4", semestre: "4", type: "P" },
    'EC060404': { codigo: "EC060404", nombre: "ESTADISTICA APLICADA A LA ECONOMIA Y NEGOCIOS I", creditos: "4", semestre: "4", type: "P" },
    'EC060405': { codigo: "EC060405", nombre: "TECNICAS DE MUESTREO", creditos: "3", semestre: "4", type: "P" },
    'EC060406': { codigo: "EC060406", nombre: "TEORIA MONETARIA", creditos: "4", semestre: "4", type: "P" },

    'EC060501': { codigo: "EC060501", nombre: "INVESTIGACION DE OPERACIONES I", creditos: "4", semestre: "5", type: "I" },
    'EC060502': { codigo: "EC060502", nombre: "ANALISIS ECONOMICO Y FINANCIERO", creditos: "3", semestre: "5", type: "I" },
    'EC060503': { codigo: "EC060503", nombre: "ESTADISTICA APLICADA A LA ECONOMIA Y NEGOCIOS II", creditos: "4", semestre: "5", type: "I" },
    'EC060504': { codigo: "EC060504", nombre: "INGENIERIA ECONOMICA", creditos: "4", semestre: "5", type: "I" },
    'EC060505': { codigo: "EC060505", nombre: "ORGANIZACION INDUSTRIAL", creditos: "3", semestre: "5", type: "I" },
    'EC060506': { codigo: "EC060506", nombre: "TEORIA DE LA REGULACION", creditos: "3", semestre: "5", type: "I" },
    'EC060507': { codigo: "EC060507", nombre: "ACTIVIDAD LIBRE: CIVICO COMUNITARIO", creditos: "1", semestre: "5", type: "I", cat: "CC" },

    'EC060601': { codigo: "EC060601", nombre: "ECONOMETRIA I", creditos: "4", semestre: "6", type: "P" },
    'EC060602': { codigo: "EC060602", nombre: "ECONOMIA AMBIENTAL Y ECOLOGICA", creditos: "3", semestre: "6", type: "P" },
    'EC060603': { codigo: "EC060603", nombre: "FINANZAS PRIVADAS", creditos: "3", semestre: "6", type: "P" },
    'EC060604': { codigo: "EC060604", nombre: "INVESTIGACION DE OPERACIONES II", creditos: "4", semestre: "6", type: "P" },
    'EC060605': { codigo: "EC060605", nombre: "SISTEMAS DE INFORMACION PARA LA TOMA DE DECISIONES", creditos: "3", semestre: "6", type: "P" },
    'EC060606': { codigo: "EC060606", nombre: "ELECTIVO I", creditos: "2", semestre: "6", type: "P" },
    'EC060607': { codigo: "EC060607", nombre: "INGLES BASICO", creditos: "3", semestre: "6", type: "P" },

    'EC060701': { codigo: "EC060701", nombre: "ECONOMETRIA II", creditos: "4", semestre: "7", type: "I" },
    'EC060702': { codigo: "EC060702", nombre: "ESTUDIOS DE MERCADOS", creditos: "3", semestre: "7", type: "I" },
    'EC060703': { codigo: "EC060703", nombre: "DIAGNOSTICO SOCIECONOMICO Y AMBIENTAL", creditos: "4", semestre: "7", type: "I" },
    'EC060704': { codigo: "EC060704", nombre: "ECONOMIA PUBLICA", creditos: "3", semestre: "7", type: "I" },
    'EC060705': { codigo: "EC060705", nombre: "INGLES TECNICO", creditos: "3", semestre: "7", type: "I" },
    'EC060706': { codigo: "EC060706", nombre: "ELECTIVO II", creditos: "3", semestre: "7", type: "I" },

    'EC060801': { codigo: "EC060801", nombre: "FINANZAS PUBLICAS", creditos: "3", semestre: "8", type: "P" },
    'EC060802': { codigo: "EC060802", nombre: "METODOLOGIA DE INVESTIGACION", creditos: "4", semestre: "8", type: "P" },
    'EC060803': { codigo: "EC060803", nombre: "PLANEAMIENTO EMPRESARIAL", creditos: "3", semestre: "8", type: "P" },
    'EC060804': { codigo: "EC060804", nombre: "PLANEAMIENTO ESTRATEGICO", creditos: "4", semestre: "8", type: "P" },
    'EC060805': { codigo: "EC060805", nombre: "TEORIAS DEL DESARROLLO", creditos: "3", semestre: "8", type: "P" },
    'EC060806': { codigo: "EC060806", nombre: "ELECTIVO III", creditos: "2", semestre: "8", type: "P" },

    'EC060901': { codigo: "EC060901", nombre: "EVALUACION DE IMPACTO AMBIENTAL", creditos: "3", semestre: "9", type: "I" },
    'EC060902': { codigo: "EC060902", nombre: "FORMULACION Y EVALUACION DE PROYECTOS PRIVADOS", creditos: "3", semestre: "9", type: "I" },
    'EC060903': { codigo: "EC060903", nombre: "NEGOCIOS INTERNACIONALES", creditos: "4", semestre: "9", type: "I" },
    'EC060904': { codigo: "EC060904", nombre: "PROYECTOS DE DESARROLLO", creditos: "4", semestre: "9", type: "I" },
    'EC060905': { codigo: "EC060905", nombre: "SEMINARIO TALLER DE TESIS I", creditos: "4", semestre: "9", type: "I" },
    'EC060906': { codigo: "EC060906", nombre: "ELECTIVO IV", creditos: "2", semestre: "9", type: "I" },

    'EC061001': { codigo: "EC061001", nombre: "GESTION DE PROYECTOS", creditos: "3", semestre: "10", type: "P" },
    'EC061002': { codigo: "EC061002", nombre: "POLITICA ECONOMICA", creditos: "4", semestre: "10", type: "P" },
    'EC061003': { codigo: "EC061003", nombre: "SEMINARIO TALLER DE TESIS II", creditos: "4", semestre: "10", type: "P" },
    'EC061004': { codigo: "EC061004", nombre: "GESTION PARA EL DESARROLLO TERRITORIAL SOSTENIBLE", creditos: "3", semestre: "10", type: "P" },
    'EC061005': { codigo: "EC061005", nombre: "PRACTICAS PRE PROFESIONALES", creditos: "2", semestre: "10", type: "P" },

    'TOTALCREDITS': 210,
    'YEAR': 2018
  },
  'INGENIERIA EN INFORMATICA Y SISTEMASV2': {
    'BI010101': { codigo: "BI010101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type:"I"},
    //'IS030101': { codigo: "IS030101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type: "I" },
    'BI010108': { codigo: "BI010108", nombre: "LENGUAJE Y REDACCION GENERAL", creditos: "3", semestre: "1", type:"I" },
    'IS030102': { codigo: "IS030102", nombre: "TALLER DE HABILIDADES BLANDAS", creditos: "4", semestre: "1", type: "I" },
    'IS030103': { codigo: "IS030103", nombre: "SOSTENIBILIDAD Y RESPONSABILIDAD SOCIAL", creditos: "3", semestre: "1", type: "I" },
    'IS030105': { codigo: "IS030105", nombre: "FUNDAMENTOS DE COMPUTACION", creditos: "5", semestre: "1", type: "I" },
    //'IS030104': { codigo: "IS030104", nombre: "REDACCION Y COMPRENSION LECTORA", creditos: "4", semestre: "1", type: "I" },
    //'IS030203': { codigo: "IS030203", nombre: "REDACCION Y COMPRENSION LECTORA", creditos: "4", semestre: "1", type: "I" },

    'BI010102': { codigo: "BI010102", nombre: "FISICA I", creditos: "4", semestre: "2", type:"P" },
    //'IS030202': { codigo: "IS030202", nombre: "FISICA I", creditos: "4", semestre: "2", type: "P" },
    'BI010201': { codigo: "BI010201", nombre: "MATEMATICA I", creditos: "4", semestre: "2", type:"P" },
    //'IS030201': { codigo: "IS030201", nombre: "MATEMATICA I", creditos: "4", semestre: "2", type: "P" },
    'IS030203': { codigo: "IS030203", nombre: "PROGRAMACION BASICA", creditos: "5", semestre: "2", type: "P" },
    'IS030204': { codigo: "IS030204", nombre: "SOPORTE DE TI", creditos: "4", semestre: "2", type: "P" },
    'IS030205': { codigo: "IS030205", nombre: "IDIOMA EXTRANJERO I", creditos: "3", semestre: "2", type: "P" },
    'IS030206': { codigo: "IS030206", nombre: "ACTIVIDAD LIBRE: FISICO - DEPORTIVA", creditos: "1", semestre: "2", type: "P", cat: "FD" },

    'BI010301': { codigo: "BI010301", nombre: "MATEMATICA II", creditos: "4", semestre: "3", type:"I" },
    //'IS030301': { codigo: "IS030301", nombre: "MATEMATICA II", creditos: "4", semestre: "3", type: "I" },
    'IS030302': { codigo: "IS030302", nombre: "FISICA II", creditos: "4", semestre: "3", type: "I" },
    'IS030303': { codigo: "IS030303", nombre: "ESTRUCTURA DE DATOS Y ALGORITMOS", creditos: "5", semestre: "3", type: "I" },
    'IS030304': { codigo: "IS030304", nombre: "SISTEMAS OPERATIVOS I", creditos: "5", semestre: "3", type: "I" },
    'IS030305': { codigo: "IS030305", nombre: "IDIOMA EXTRANJERO II", creditos: "3", semestre: "3", type: "I" },
    'IS030306': { codigo: "IS030306", nombre: "ACTIVIDAD LIBRE: ARTISTICO - CULTURAL", creditos: "1", semestre: "3", type: "I", cat: "AC" },

    'IS030401': { codigo: "IS030401", nombre: "ETICA Y PRACTICA PROFESIONAL", creditos: "2", semestre: "4", type: "P" },
    'IS030402': { codigo: "IS030402", nombre: "DISEÑO DE BASE DE DATOS", creditos: "4", semestre: "4", type: "P" },
    'IS030403': { codigo: "IS030403", nombre: "CONSTRUCCION DE SOFTWARE I", creditos: "5", semestre: "4", type: "P" },
    'IS030404': { codigo: "IS030404", nombre: "SISTEMAS OPERATIVOS II", creditos: "4", semestre: "4", type: "P" },
    'IS030405': { codigo: "IS030405", nombre: "PENSAMIENTO SISTEMICO", creditos: "4", semestre: "4", type: "P" },

    'BI010104': { codigo: "BI010104", nombre: "ESTADISTICA GENERAL", creditos: "4", semestre: "5", type:"I" },
    //'IS030505': { codigo: "IS030505", nombre: "ESTADISTICA Y PROBABILIDADES", creditos: "4", semestre: "5", type: "I" },
    'IS030501': { codigo: "IS030501", nombre: "COSTOS Y PRESUPUESTOS EN TI", creditos: "4", semestre: "5", type: "I" },
    'IS030502': { codigo: "IS030502", nombre: "GESTION DE BASE DE DATOS", creditos: "4", semestre: "5", type: "I" },
    'IS030503': { codigo: "IS030503", nombre: "INGENIERIA DE REQUISITOS", creditos: "4", semestre: "5", type: "I" },
    'IS030504': { codigo: "IS030504", nombre: "REDES Y CONECTIVIDAD I", creditos: "3", semestre: "5", type: "I" },
    'IS030506': { codigo: "IS030506", nombre: "ACTIVIDAD LIBRE CIVICO-COMUNITARIA", creditos: "1", semestre: "5", type: "I", cat: "CC" },

    'IS030601': { codigo: "IS030601", nombre: "OPTIMIZACION Y SIMULACION DE SISTEMAS", creditos: "3", semestre: "6", type: "P" },
    'IS030602': { codigo: "IS030602", nombre: "GESTION DE PROCESOS DE NEGOCIO", creditos: "4", semestre: "6", type: "P" },
    'IS030603': { codigo: "IS030603", nombre: "DISEÑO DE SOFTWARE", creditos: "5", semestre: "6", type: "P" },
    'IS030604': { codigo: "IS030604", nombre: "REDES Y CONECTIVIDAD II", creditos: "5", semestre: "6", type: "P" },
    'IS030605': { codigo: "IS030605", nombre: "INTERNET DE LAS COSAS", creditos: "3", semestre: "6", type: "P" },
    'IS030606': { codigo: "IS030606", nombre: "ELECTIVO I", creditos: "3", semestre: "6", type: "P", class: "E1" },

    'IS030701': { codigo: "IS030701", nombre: "GESTION DE LA CALIDAD", creditos: "3", semestre: "7", type: "I" },
    'IS030702': { codigo: "IS030702", nombre: "SISTEMAS DE INFORMACION", creditos: "3", semestre: "7", type: "I" },
    'IS030703': { codigo: "IS030703", nombre: "CONSTRUCCION DE SOFTWARE II", creditos: "5", semestre: "7", type: "I" },
    'IS030704': { codigo: "IS030704", nombre: "SERVIDORES Y CENTRO DE DATOS", creditos: "4", semestre: "7", type: "I" },
    'IS030705': { codigo: "IS030705", nombre: "FUNDAMENTOS DE INVESTIGACION", creditos: "4", semestre: "7", type: "I" },
    'IS030706': { codigo: "IS030706", nombre: "ELECTIVO II", creditos: "3", semestre: "7", type: "I", class: "E2" },

    'IS030801': { codigo: "IS030801", nombre: "GESTION DE PROYECTOS DE TI", creditos: "4", semestre: "8", type: "P" },
    'IS030802': { codigo: "IS030802", nombre: "SISTEMA DE SOPORTE DE DECISIONES", creditos: "3", semestre: "8", type: "P" },
    'IS030803': { codigo: "IS030803", nombre: "CALIDAD DE PRODUCTO DE SOFTWARE", creditos: "4", semestre: "8", type: "P" },
    'IS030804': { codigo: "IS030804", nombre: "SEGURIDAD INFORMATICA I", creditos: "4", semestre: "8", type: "P" },
    'IS030805': { codigo: "IS030805", nombre: "DISEÑO DE INVESTIGACION I", creditos: "4", semestre: "8", type: "P" },
    'IS030806': { codigo: "IS030806", nombre: "ELECTIVO III", creditos: "3", semestre: "8", type: "P", class: "E3" },

    'IS030901': { codigo: "IS030901", nombre: "GESTION DE SERVICIOS DE TI", creditos: "4", semestre: "9", type: "I" },
    'IS030902': { codigo: "IS030902", nombre: "ARQUITECTURA EMPRESARIAL", creditos: "4", semestre: "9", type: "I" },
    'IS030903': { codigo: "IS030903", nombre: "INTEGRACION DE SISTEMAS DE SOFTWARE", creditos: "4", semestre: "9", type: "I" },
    'IS030904': { codigo: "IS030904", nombre: "SEGURIDAD INFORMATICA II", creditos: "4", semestre: "9", type: "I" },
    'IS030905': { codigo: "IS030905", nombre: "DISEÑO DE INVESTIGACION II", creditos: "4", semestre: "9", type: "I" },
    'IS030906': { codigo: "IS030906", nombre: "ELECTIVO IV", creditos: "3", semestre: "9", type: "I", class: "E4" },
    'IS030907': { codigo: "IS030907", nombre: "PRACTICAS PRE PROFESIONALES", creditos: "4", semestre: "9", type: "I" },

    'IS031001': { codigo: "IS031001", nombre: "INNOVACION Y EMPRENDIMIENTO", creditos: "3", semestre: "10", type: "P" },
    'IS031002': { codigo: "IS031002", nombre: "CALIDAD DE PROCESOS DE SOFTWARE", creditos: "3", semestre: "10", type: "P" },
    'IS031003': { codigo: "IS031003", nombre: "AUDITORIA DE TI", creditos: "4", semestre: "10", type: "P" },
    'IS031004': { codigo: "IS031004", nombre: "PROYECTOS DE INVESTIGACION", creditos: "6", semestre: "10", type: "P" },
    'IS031005': { codigo: "IS031005", nombre: "PLANEAMIENTO Y GOBIERNO DE TI", creditos: "3", semestre: "10", type: "P" },

    'IS03E101': { codigo: "IS03E101", nombre: "METODOS AGILES PARA EL DESARROLLO DE SOFTWARE", creditos: "3", electivo: true, type: "P" },
    'IS03E103': { codigo: "IS03E103", nombre: "PATRONES DE DISEÑO DE SOFTWARE", creditos: "3", electivo: true, type: "P" },
    'IS03E201': { codigo: "IS03E201", nombre: "NETWORKING I (CCNA1)", creditos: "3", electivo: true, type: "P" },
    'IS03E203': { codigo: "IS03E203", nombre: "NETWORKING III (CCNA2-B)", creditos: "3", electivo: true, type: "P" },
    'IS03E205': { codigo: "IS03E205", nombre: "REDES AVANZADAS", creditos: "3", electivo: true, type: "P" },
    'IS03E207': { codigo: "IS03E207", nombre: "PROGRAMABILIDAD DE REDES", creditos: "3", electivo: true, type: "P" },
    'IS03E209': { codigo: "IS03E209", nombre: "TOPICOS DE SEGURIDAD INFORMATIC", creditos: "3", electivo: true, type: "P" },
    'IS03E301': { codigo: "IS03E301", nombre: "GESTION DEL CONOCIMIENTO", creditos: "3", electivo: true, type: "P" },
    'IS03E303': { codigo: "IS03E303", nombre: "ANALISIS DE DATOS", creditos: "3", electivo: true, type: "P" },
    'IS03E305': { codigo: "IS03E305", nombre: "ANALITICA WEB", creditos: "3", electivo: true, type: "P" },

    'IS03E102': { codigo: "IS03E102", nombre: "DISEÑO E IMPLEMENTACION DE INTERFAZ DE USUARIO", creditos: "3", electivo: true, type: "I" },
    'IS03E104': { codigo: "IS03E104", nombre: "PATRONES DE ARQUITECTURA DE SOFTWARE", creditos: "3", electivo: true, type: "I" },
    'IS03E202': { codigo: "IS03E202", nombre: "NETWORKING II (CCNA2-A)", creditos: "3", electivo: true, type: "I" },
    'IS03E204': { codigo: "IS03E204", nombre: "NETWORKING IV (MOBILITY FUNDAMENTALS)", creditos: "3", electivo: true, type: "I" },
    'IS03E206': { codigo: "IS03E206", nombre: "LINUX AVANZADO", creditos: "3", electivo: true, type: "I" },
    'IS03E208': { codigo: "IS03E208", nombre: "VIRTUALIZCION Y CLOUD COMPUTING", creditos: "3", electivo: true, type: "I" },
    'IS03E302': { codigo: "IS03E302", nombre: "TRANSFORMACION DIGITAL", creditos: "3", electivo: true, type: "I" },
    'IS03E304': { codigo: "IS03E304", nombre: "TECNICAS DE MINERIA DE DATOS", creditos: "3", electivo: true, type: "I" },

    'TOTALCREDITS': 215,
    'YEAR': 2018
  },
  'INGENIERIA EN INFORMATICA Y SISTEMAS': {
    //'BI010101': { codigo: "BI010101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type:"I"},
    'IS030101': { codigo: "IS030101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type: "I" },
    //'BI010108': { codigo: "BI010108", nombre: "LENGUAJE Y REDACCION GENERAL", creditos: "3", semestre: "1", type:"I" },
    'IS030102': { codigo: "IS030102", nombre: "TALLER DE HABILIDADES BLANDAS", creditos: "4", semestre: "1", type: "I" },
    'IS030103': { codigo: "IS030103", nombre: "SOSTENIBILIDAD Y RESPONSABILIDAD SOCIAL", creditos: "3", semestre: "1", type: "I" },
    'IS030105': { codigo: "IS030105", nombre: "FUNDAMENTOS DE COMPUTACION", creditos: "5", semestre: "1", type: "I" },
    'IS030104': { codigo: "IS030104", nombre: "REDACCION Y COMPRENSION LECTORA", creditos: "4", semestre: "1", type: "I" },
    'IS030203': { codigo: "IS030203", nombre: "REDACCION Y COMPRENSION LECTORA", creditos: "4", semestre: "1", type: "I" },

    //'BI010102': { codigo: "BI010102", nombre: "FISICA I", creditos: "4", semestre: "2", type:"P" },
    'IS030202': { codigo: "IS030202", nombre: "FISICA I", creditos: "4", semestre: "2", type: "P" },
    //'BI010201': { codigo: "BI010201", nombre: "MATEMATICA I", creditos: "4", semestre: "2", type:"P" },
    'IS030201': { codigo: "IS030201", nombre: "MATEMATICA I", creditos: "4", semestre: "2", type: "P" },
    'IS030203': { codigo: "IS030203", nombre: "PROGRAMACION BASICA", creditos: "5", semestre: "2", type: "P" },
    'IS030204': { codigo: "IS030204", nombre: "SOPORTE DE TI", creditos: "4", semestre: "2", type: "P" },
    'IS030205': { codigo: "IS030205", nombre: "IDIOMA EXTRANJERO I", creditos: "3", semestre: "2", type: "P" },
    'IS030206': { codigo: "IS030206", nombre: "ACTIVIDAD LIBRE: FISICO - DEPORTIVA", creditos: "1", semestre: "2", type: "P", cat: "FD" },

    //'BI010301': { codigo: "BI010301", nombre: "MATEMATICA II", creditos: "4", semestre: "3", type:"I" },
    'IS030301': { codigo: "IS030301", nombre: "MATEMATICA II", creditos: "4", semestre: "3", type: "I" },
    'IS030302': { codigo: "IS030302", nombre: "FISICA II", creditos: "4", semestre: "3", type: "I" },
    'IS030303': { codigo: "IS030303", nombre: "ESTRUCTURA DE DATOS Y ALGORITMOS", creditos: "5", semestre: "3", type: "I" },
    'IS030304': { codigo: "IS030304", nombre: "SISTEMAS OPERATIVOS I", creditos: "5", semestre: "3", type: "I" },
    'IS030305': { codigo: "IS030305", nombre: "IDIOMA EXTRANJERO II", creditos: "3", semestre: "3", type: "I" },
    'IS030306': { codigo: "IS030306", nombre: "ACTIVIDAD LIBRE: ARTISTICO - CULTURAL", creditos: "1", semestre: "3", type: "I", cat: "AC" },

    'IS030401': { codigo: "IS030401", nombre: "ETICA Y PRACTICA PROFESIONAL", creditos: "2", semestre: "4", type: "P" },
    'IS030402': { codigo: "IS030402", nombre: "DISEÑO DE BASE DE DATOS", creditos: "4", semestre: "4", type: "P" },
    'IS030403': { codigo: "IS030403", nombre: "CONSTRUCCION DE SOFTWARE I", creditos: "5", semestre: "4", type: "P" },
    'IS030404': { codigo: "IS030404", nombre: "SISTEMAS OPERATIVOS II", creditos: "4", semestre: "4", type: "P" },
    'IS030405': { codigo: "IS030405", nombre: "PENSAMIENTO SISTEMICO", creditos: "4", semestre: "4", type: "P" },

    //'BI010104': { codigo: "BI010104", nombre: "ESTADISTICA GENERAL", creditos: "4", semestre: "5", type:"I" },
    'IS030505': { codigo: "IS030505", nombre: "ESTADISTICA Y PROBABILIDADES", creditos: "4", semestre: "5", type: "i" },
    'IS030501': { codigo: "IS030501", nombre: "COSTOS Y PRESUPUESTOS EN TI", creditos: "4", semestre: "5", type: "I" },
    'IS030502': { codigo: "IS030502", nombre: "GESTION DE BASE DE DATOS", creditos: "4", semestre: "5", type: "I" },
    'IS030503': { codigo: "IS030503", nombre: "INGENIERIA DE REQUISITOS", creditos: "4", semestre: "5", type: "I" },
    'IS030504': { codigo: "IS030504", nombre: "REDES Y CONECTIVIDAD I", creditos: "3", semestre: "5", type: "I" },
    'IS030506': { codigo: "IS030506", nombre: "ACTIVIDAD LIBRE CIVICO-COMUNITARIA", creditos: "1", semestre: "5", type: "I", cat: "CC" },

    'IS030601': { codigo: "IS030601", nombre: "OPTIMIZACION Y SIMULACION DE SISTEMAS", creditos: "3", semestre: "6", type: "P" },
    'IS030602': { codigo: "IS030602", nombre: "GESTION DE PROCESOS DE NEGOCIO", creditos: "4", semestre: "6", type: "P" },
    'IS030603': { codigo: "IS030603", nombre: "DISEÑO DE SOFTWARE", creditos: "5", semestre: "6", type: "P" },
    'IS030604': { codigo: "IS030604", nombre: "REDES Y CONECTIVIDAD II", creditos: "5", semestre: "6", type: "P" },
    'IS030605': { codigo: "IS030605", nombre: "INTERNET DE LAS COSAS", creditos: "3", semestre: "6", type: "P" },
    'IS030606': { codigo: "IS030606", nombre: "ELECTIVO I", creditos: "3", semestre: "6", type: "P", class: "E1" },

    'IS030701': { codigo: "IS030701", nombre: "GESTION DE LA CALIDAD", creditos: "3", semestre: "7", type: "I" },
    'IS030702': { codigo: "IS030702", nombre: "SISTEMAS DE INFORMACION", creditos: "3", semestre: "7", type: "I" },
    'IS030703': { codigo: "IS030703", nombre: "CONSTRUCCION DE SOFTWARE II", creditos: "5", semestre: "7", type: "I" },
    'IS030704': { codigo: "IS030704", nombre: "SERVIDORES Y CENTRO DE DATOS", creditos: "4", semestre: "7", type: "I" },
    'IS030705': { codigo: "IS030705", nombre: "FUNDAMENTOS DE INVESTIGACION", creditos: "4", semestre: "7", type: "I" },
    'IS030706': { codigo: "IS030706", nombre: "ELECTIVO II", creditos: "3", semestre: "7", type: "I", class: "E2" },

    'IS030801': { codigo: "IS030801", nombre: "GESTION DE PROYECTOS DE TI", creditos: "4", semestre: "8", type: "P" },
    'IS030802': { codigo: "IS030802", nombre: "SISTEMA DE SOPORTE DE DECISIONES", creditos: "3", semestre: "8", type: "P" },
    'IS030803': { codigo: "IS030803", nombre: "CALIDAD DE PRODUCTO DE SOFTWARE", creditos: "4", semestre: "8", type: "P" },
    'IS030804': { codigo: "IS030804", nombre: "SEGURIDAD INFORMATICA I", creditos: "4", semestre: "8", type: "P" },
    'IS030805': { codigo: "IS030805", nombre: "DISEÑO DE INVESTIGACION I", creditos: "4", semestre: "8", type: "P" },
    'IS030806': { codigo: "IS030806", nombre: "ELECTIVO III", creditos: "3", semestre: "8", type: "P", class: "E3" },

    'IS030901': { codigo: "IS030901", nombre: "GESTION DE SERVICIOS DE TI", creditos: "4", semestre: "9", type: "I" },
    'IS030902': { codigo: "IS030902", nombre: "ARQUITECTURA EMPRESARIAL", creditos: "4", semestre: "9", type: "I" },
    'IS030903': { codigo: "IS030903", nombre: "INTEGRACION DE SISTEMAS DE SOFTWARE", creditos: "4", semestre: "9", type: "I" },
    'IS030904': { codigo: "IS030904", nombre: "SEGURIDAD INFORMATICA II", creditos: "4", semestre: "9", type: "I" },
    'IS030905': { codigo: "IS030905", nombre: "DISEÑO DE INVESTIGACION II", creditos: "4", semestre: "9", type: "I" },
    'IS030906': { codigo: "IS030906", nombre: "ELECTIVO IV", creditos: "3", semestre: "9", type: "I", class: "E4" },
    'IS030907': { codigo: "IS030907", nombre: "PRACTICAS PRE PROFESIONALES", creditos: "4", semestre: "9", type: "I" },

    'IS031001': { codigo: "IS031001", nombre: "INNOVACION Y EMPRENDIMIENTO", creditos: "3", semestre: "10", type: "P" },
    'IS031002': { codigo: "IS031002", nombre: "CALIDAD DE PROCESOS DE SOFTWARE", creditos: "3", semestre: "10", type: "P" },
    'IS031003': { codigo: "IS031003", nombre: "AUDITORIA DE TI", creditos: "4", semestre: "10", type: "P" },
    'IS031004': { codigo: "IS031004", nombre: "PROYECTOS DE INVESTIGACION", creditos: "6", semestre: "10", type: "P" },
    'IS031005': { codigo: "IS031005", nombre: "PLANEAMIENTO Y GOBIERNO DE TI", creditos: "3", semestre: "10", type: "P" },

    'IS03E101': { codigo: "IS03E101", nombre: "METODOS AGILES PARA EL DESARROLLO DE SOFTWARE", creditos: "3", electivo: true, type: "P" },
    'IS03E103': { codigo: "IS03E103", nombre: "PATRONES DE DISEÑO DE SOFTWARE", creditos: "3", electivo: true, type: "P" },
    'IS03E201': { codigo: "IS03E201", nombre: "NETWORKING I (CCNA1)", creditos: "3", electivo: true, type: "P" },
    'IS03E203': { codigo: "IS03E203", nombre: "NETWORKING III (CCNA2-B)", creditos: "3", electivo: true, type: "P" },
    'IS03E205': { codigo: "IS03E205", nombre: "REDES AVANZADAS", creditos: "3", electivo: true, type: "P" },
    'IS03E207': { codigo: "IS03E207", nombre: "PROGRAMABILIDAD DE REDES", creditos: "3", electivo: true, type: "P" },
    'IS03E209': { codigo: "IS03E209", nombre: "TOPICOS DE SEGURIDAD INFORMATIC", creditos: "3", electivo: true, type: "P" },
    'IS03E301': { codigo: "IS03E301", nombre: "GESTION DEL CONOCIMIENTO", creditos: "3", electivo: true, type: "P" },
    'IS03E303': { codigo: "IS03E303", nombre: "ANALISIS DE DATOS", creditos: "3", electivo: true, type: "P" },
    'IS03E305': { codigo: "IS03E305", nombre: "ANALITICA WEB", creditos: "3", electivo: true, type: "P" },

    'IS03E102': { codigo: "IS03E102", nombre: "DISEÑO E IMPLEMENTACION DE INTERFAZ DE USUARIO", creditos: "3", electivo: true, type: "I" },
    'IS03E104': { codigo: "IS03E104", nombre: "PATRONES DE ARQUITECTURA DE SOFTWARE", creditos: "3", electivo: true, type: "I" },
    'IS03E202': { codigo: "IS03E202", nombre: "NETWORKING II (CCNA2-A)", creditos: "3", electivo: true, type: "I" },
    'IS03E204': { codigo: "IS03E204", nombre: "NETWORKING IV (MOBILITY FUNDAMENTALS)", creditos: "3", electivo: true, type: "I" },
    'IS03E206': { codigo: "IS03E206", nombre: "LINUX AVANZADO", creditos: "3", electivo: true, type: "I" },
    'IS03E208': { codigo: "IS03E208", nombre: "VIRTUALIZCION Y CLOUD COMPUTING", creditos: "3", electivo: true, type: "I" },
    'IS03E302': { codigo: "IS03E302", nombre: "TRANSFORMACION DIGITAL", creditos: "3", electivo: true, type: "I" },
    'IS03E304': { codigo: "IS03E304", nombre: "TECNICAS DE MINERIA DE DATOS", creditos: "3", electivo: true, type: "I" },

    'TOTALCREDITS': 215,
    'YEAR': 2018
  },
  'INGENIERIA EN INFORMATICA Y SISTEMAS2018': {
    //'BI010101': { codigo: "BI010101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type:"I"},
    'IS030101': { codigo: "IS030101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type: "I" },
    //'BI010108': { codigo: "BI010108", nombre: "LENGUAJE Y REDACCION GENERAL", creditos: "3", semestre: "1", type:"I" },
    'IS030102': { codigo: "IS030102", nombre: "TALLER DE HABILIDADES BLANDAS", creditos: "4", semestre: "1", type: "I" },
    'IS030103': { codigo: "IS030103", nombre: "SOSTENIBILIDAD Y RESPONSABILIDAD SOCIAL", creditos: "3", semestre: "1", type: "I" },
    'IS030105': { codigo: "IS030105", nombre: "FUNDAMENTOS DE COMPUTACION", creditos: "5", semestre: "1", type: "I" },
    'IS030104': { codigo: "IS030104", nombre: "REDACCION Y COMPRENSION LECTORA", creditos: "4", semestre: "1", type: "I" },
    'IS030203': { codigo: "IS030203", nombre: "REDACCION Y COMPRENSION LECTORA", creditos: "4", semestre: "1", type: "I" },

    //'BI010102': { codigo: "BI010102", nombre: "FISICA I", creditos: "4", semestre: "2", type:"P" },
    'IS030202': { codigo: "IS030202", nombre: "FISICA I", creditos: "4", semestre: "2", type: "P" },
    //'BI010201': { codigo: "BI010201", nombre: "MATEMATICA I", creditos: "4", semestre: "2", type:"P" },
    'IS030201': { codigo: "IS030201", nombre: "MATEMATICA I", creditos: "4", semestre: "2", type: "P" },
    'IS030203': { codigo: "IS030203", nombre: "PROGRAMACION BASICA", creditos: "5", semestre: "2", type: "P" },
    'IS030204': { codigo: "IS030204", nombre: "SOPORTE DE TI", creditos: "4", semestre: "2", type: "P" },
    'IS030205': { codigo: "IS030205", nombre: "IDIOMA EXTRANJERO I", creditos: "3", semestre: "2", type: "P" },
    'IS030206': { codigo: "IS030206", nombre: "ACTIVIDAD LIBRE: FISICO - DEPORTIVA", creditos: "1", semestre: "2", type: "P", cat: "FD" },

    //'BI010301': { codigo: "BI010301", nombre: "MATEMATICA II", creditos: "4", semestre: "3", type:"I" },
    'IS030301': { codigo: "IS030301", nombre: "MATEMATICA II", creditos: "4", semestre: "3", type: "I" },
    'IS030302': { codigo: "IS030302", nombre: "FISICA II", creditos: "4", semestre: "3", type: "I" },
    'IS030303': { codigo: "IS030303", nombre: "ESTRUCTURA DE DATOS Y ALGORITMOS", creditos: "5", semestre: "3", type: "I" },
    'IS030304': { codigo: "IS030304", nombre: "SISTEMAS OPERATIVOS I", creditos: "5", semestre: "3", type: "I" },
    'IS030305': { codigo: "IS030305", nombre: "IDIOMA EXTRANJERO II", creditos: "3", semestre: "3", type: "I" },
    'IS030306': { codigo: "IS030306", nombre: "ACTIVIDAD LIBRE: ARTISTICO - CULTURAL", creditos: "1", semestre: "3", type: "I", cat: "AC" },

    'IS030401': { codigo: "IS030401", nombre: "ETICA Y PRACTICA PROFESIONAL", creditos: "2", semestre: "4", type: "P" },
    'IS030402': { codigo: "IS030402", nombre: "DISEÑO DE BASE DE DATOS", creditos: "4", semestre: "4", type: "P" },
    'IS030403': { codigo: "IS030403", nombre: "CONSTRUCCION DE SOFTWARE I", creditos: "5", semestre: "4", type: "P" },
    'IS030404': { codigo: "IS030404", nombre: "SISTEMAS OPERATIVOS II", creditos: "4", semestre: "4", type: "P" },
    'IS030405': { codigo: "IS030405", nombre: "PENSAMIENTO SISTEMICO", creditos: "4", semestre: "4", type: "P" },

    //'BI010104': { codigo: "BI010104", nombre: "ESTADISTICA GENERAL", creditos: "4", semestre: "5", type:"I" },
    'IS030505': { codigo: "IS030505", nombre: "ESTADISTICA Y PROBABILIDADES", creditos: "4", semestre: "5", type: "i" },
    'IS030501': { codigo: "IS030501", nombre: "COSTOS Y PRESUPUESTOS EN TI", creditos: "4", semestre: "5", type: "I" },
    'IS030502': { codigo: "IS030502", nombre: "GESTION DE BASE DE DATOS", creditos: "4", semestre: "5", type: "I" },
    'IS030503': { codigo: "IS030503", nombre: "INGENIERIA DE REQUISITOS", creditos: "4", semestre: "5", type: "I" },
    'IS030504': { codigo: "IS030504", nombre: "REDES Y CONECTIVIDAD I", creditos: "3", semestre: "5", type: "I" },
    'IS030506': { codigo: "IS030506", nombre: "ACTIVIDAD LIBRE CIVICO-COMUNITARIA", creditos: "1", semestre: "5", type: "I", cat: "CC" },

    'IS030601': { codigo: "IS030601", nombre: "OPTIMIZACION Y SIMULACION DE SISTEMAS", creditos: "3", semestre: "6", type: "P" },
    'IS030602': { codigo: "IS030602", nombre: "GESTION DE PROCESOS DE NEGOCIO", creditos: "4", semestre: "6", type: "P" },
    'IS030603': { codigo: "IS030603", nombre: "DISEÑO DE SOFTWARE", creditos: "5", semestre: "6", type: "P" },
    'IS030604': { codigo: "IS030604", nombre: "REDES Y CONECTIVIDAD II", creditos: "5", semestre: "6", type: "P" },
    'IS030605': { codigo: "IS030605", nombre: "INTERNET DE LAS COSAS", creditos: "3", semestre: "6", type: "P" },
    'IS030606': { codigo: "IS030606", nombre: "ELECTIVO I", creditos: "3", semestre: "6", type: "P", class: "E1" },

    'IS030701': { codigo: "IS030701", nombre: "GESTION DE LA CALIDAD", creditos: "3", semestre: "7", type: "I" },
    'IS030702': { codigo: "IS030702", nombre: "SISTEMAS DE INFORMACION", creditos: "3", semestre: "7", type: "I" },
    'IS030703': { codigo: "IS030703", nombre: "CONSTRUCCION DE SOFTWARE II", creditos: "5", semestre: "7", type: "I" },
    'IS030704': { codigo: "IS030704", nombre: "SERVIDORES Y CENTRO DE DATOS", creditos: "4", semestre: "7", type: "I" },
    'IS030705': { codigo: "IS030705", nombre: "FUNDAMENTOS DE INVESTIGACION", creditos: "4", semestre: "7", type: "I" },
    'IS030706': { codigo: "IS030706", nombre: "ELECTIVO II", creditos: "3", semestre: "7", type: "I", class: "E2" },

    'IS030801': { codigo: "IS030801", nombre: "GESTION DE PROYECTOS DE TI", creditos: "4", semestre: "8", type: "P" },
    'IS030802': { codigo: "IS030802", nombre: "SISTEMA DE SOPORTE DE DECISIONES", creditos: "3", semestre: "8", type: "P" },
    'IS030803': { codigo: "IS030803", nombre: "CALIDAD DE PRODUCTO DE SOFTWARE", creditos: "4", semestre: "8", type: "P" },
    'IS030804': { codigo: "IS030804", nombre: "SEGURIDAD INFORMATICA I", creditos: "4", semestre: "8", type: "P" },
    'IS030805': { codigo: "IS030805", nombre: "DISEÑO DE INVESTIGACION I", creditos: "4", semestre: "8", type: "P" },
    'IS030806': { codigo: "IS030806", nombre: "ELECTIVO III", creditos: "3", semestre: "8", type: "P", class: "E3" },

    'IS030901': { codigo: "IS030901", nombre: "GESTION DE SERVICIOS DE TI", creditos: "4", semestre: "9", type: "I" },
    'IS030902': { codigo: "IS030902", nombre: "ARQUITECTURA EMPRESARIAL", creditos: "4", semestre: "9", type: "I" },
    'IS030903': { codigo: "IS030903", nombre: "INTEGRACION DE SISTEMAS DE SOFTWARE", creditos: "4", semestre: "9", type: "I" },
    'IS030904': { codigo: "IS030904", nombre: "SEGURIDAD INFORMATICA II", creditos: "4", semestre: "9", type: "I" },
    'IS030905': { codigo: "IS030905", nombre: "DISEÑO DE INVESTIGACION II", creditos: "4", semestre: "9", type: "I" },
    'IS030906': { codigo: "IS030906", nombre: "ELECTIVO IV", creditos: "3", semestre: "9", type: "I", class: "E4" },
    'IS030907': { codigo: "IS030907", nombre: "PRACTICAS PRE PROFESIONALES", creditos: "4", semestre: "9", type: "I" },

    'IS031001': { codigo: "IS031001", nombre: "INNOVACION Y EMPRENDIMIENTO", creditos: "3", semestre: "10", type: "P" },
    'IS031002': { codigo: "IS031002", nombre: "CALIDAD DE PROCESOS DE SOFTWARE", creditos: "3", semestre: "10", type: "P" },
    'IS031003': { codigo: "IS031003", nombre: "AUDITORIA DE TI", creditos: "4", semestre: "10", type: "P" },
    'IS031004': { codigo: "IS031004", nombre: "PROYECTOS DE INVESTIGACION", creditos: "6", semestre: "10", type: "P" },
    'IS031005': { codigo: "IS031005", nombre: "PLANEAMIENTO Y GOBIERNO DE TI", creditos: "3", semestre: "10", type: "P" },

    'IS03E101': { codigo: "IS03E101", nombre: "METODOS AGILES PARA EL DESARROLLO DE SOFTWARE", creditos: "3", electivo: true, type: "P" },
    'IS03E103': { codigo: "IS03E103", nombre: "PATRONES DE DISEÑO DE SOFTWARE", creditos: "3", electivo: true, type: "P" },
    'IS03E201': { codigo: "IS03E201", nombre: "NETWORKING I (CCNA1)", creditos: "3", electivo: true, type: "P" },
    'IS03E203': { codigo: "IS03E203", nombre: "NETWORKING III (CCNA2-B)", creditos: "3", electivo: true, type: "P" },
    'IS03E205': { codigo: "IS03E205", nombre: "REDES AVANZADAS", creditos: "3", electivo: true, type: "P" },
    'IS03E207': { codigo: "IS03E207", nombre: "PROGRAMABILIDAD DE REDES", creditos: "3", electivo: true, type: "P" },
    'IS03E209': { codigo: "IS03E209", nombre: "TOPICOS DE SEGURIDAD INFORMATIC", creditos: "3", electivo: true, type: "P" },
    'IS03E301': { codigo: "IS03E301", nombre: "GESTION DEL CONOCIMIENTO", creditos: "3", electivo: true, type: "P" },
    'IS03E303': { codigo: "IS03E303", nombre: "ANALISIS DE DATOS", creditos: "3", electivo: true, type: "P" },
    'IS03E305': { codigo: "IS03E305", nombre: "ANALITICA WEB", creditos: "3", electivo: true, type: "P" },

    'IS03E102': { codigo: "IS03E102", nombre: "DISEÑO E IMPLEMENTACION DE INTERFAZ DE USUARIO", creditos: "3", electivo: true, type: "I" },
    'IS03E104': { codigo: "IS03E104", nombre: "PATRONES DE ARQUITECTURA DE SOFTWARE", creditos: "3", electivo: true, type: "I" },
    'IS03E202': { codigo: "IS03E202", nombre: "NETWORKING II (CCNA2-A)", creditos: "3", electivo: true, type: "I" },
    'IS03E204': { codigo: "IS03E204", nombre: "NETWORKING IV (MOBILITY FUNDAMENTALS)", creditos: "3", electivo: true, type: "I" },
    'IS03E206': { codigo: "IS03E206", nombre: "LINUX AVANZADO", creditos: "3", electivo: true, type: "I" },
    'IS03E208': { codigo: "IS03E208", nombre: "VIRTUALIZCION Y CLOUD COMPUTING", creditos: "3", electivo: true, type: "I" },
    'IS03E302': { codigo: "IS03E302", nombre: "TRANSFORMACION DIGITAL", creditos: "3", electivo: true, type: "I" },
    'IS03E304': { codigo: "IS03E304", nombre: "TECNICAS DE MINERIA DE DATOS", creditos: "3", electivo: true, type: "I" },

    'TOTALCREDITS': 215,
    'YEAR': 2018
  },
  'INGENIERIA EN INFORMATICA Y SISTEMAS2009': {
    //'BI010101': { codigo: "BI010101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type:"I"},
    'BI010108': { codigo: "BI010108", nombre: "LENGUAJE Y REDACCION GENERAL", creditos: "3", semestre: "1", type: "I" },
    //'BI010108': { codigo: "BI010108", nombre: "LENGUAJE Y REDACCION GENERAL", creditos: "3", semestre: "1", type:"I" },
    'BI010201': { codigo: "BI010201", nombre: "MATEMATICA I", creditos: "4", semestre: "1", type: "I" },
    'NIS101': { codigo: "NIS101", nombre: "MATEMATICA BASICA", creditos: "4", semestre: "1", type: "I" },
    'NIS103': { codigo: "NIS103", nombre: "TECNICAS DE PROGRAMACION", creditos: "4", semestre: "1", type: "I" },
    'NIS104': { codigo: "NIS104", nombre: "INTROD. A LA ING. EN INFORMATICA Y SISTEMAS", creditos: "2", semestre: "1", type: "I" },
    'NIS106': { codigo: "NIS106", nombre: "METODOLOGIA DEL TRABAJO UNIVERSITARIO", creditos: "2", semestre: "1", type: "I" },
    'NIS107': { codigo: "NIS107", nombre: "ECOLOGIA", creditos: "4", semestre: "2", type: "I" },

    //'BI010102': { codigo: "BI010102", nombre: "FISICA I", creditos: "4", semestre: "2", type:"P" },
    'BI010102': { codigo: "BI010102", nombre: "FISICA I", creditos: "4", semestre: "2", type: "P" },
    //'BI010201': { codigo: "BI010201", nombre: "MATEMATICA I", creditos: "4", semestre: "2", type:"P" },
    'NIS201': { codigo: "NIS201", nombre: "MATEMATICA II", creditos: "4", semestre: "2", type: "P" },
    'NIS202': { codigo: "NIS202", nombre: "ESTADISTICA I", creditos: "4", semestre: "2", type: "P" },
    'NIS204': { codigo: "NIS204", nombre: "TALLER DE PROGRAMACION I", creditos: "4", semestre: "2", type: "P" },
    'NIS205': { codigo: "NIS205", nombre: "DIBUJO ASISTIDO POR COMPUTADORA", creditos: "3", semestre: "2", type: "P" },
    'NIS206': { codigo: "NIS206", nombre: "FILOSOFIA", creditos: "2", semestre: "2", type: "P"},

    //'BI010301': { codigo: "BI010301", nombre: "MATEMATICA II", creditos: "4", semestre: "3", type:"I" },
    'BI010301': { codigo: "BI010301", nombre: "MATEMATICA III", creditos: "4", semestre: "3", type: "I" },
    'NIS302': { codigo: "NIS302", nombre: "ESTADISTICA II", creditos: "3", semestre: "3", type: "I" },
    'NIS303': { codigo: "NIS303", nombre: "FISICA II", creditos: "4", semestre: "3", type: "I" },
    'NIS304': { codigo: "NIS304", nombre: "MATEMATICAS DISCRETAS", creditos: "3", semestre: "3", type: "I" },
    'NIS305': { codigo: "NIS305", nombre: "BASE DE DATOS", creditos: "3", semestre: "3", type: "I" },
    'NIS306': { codigo: "NIS306", nombre: "METODOLOGIA DE LA INVESTIGACION", creditos: "3", semestre: "3", type: "I" },

    'NIS401': { codigo: "NIS401", nombre: "MATEMATICA IV", creditos: "3", semestre: "4", type: "P" },
    'NIS402': { codigo: "NIS402", nombre: "SISTEMAS DIGITALES I", creditos: "3", semestre: "4", type: "P" },
    'NIS403': { codigo: "NIS403", nombre: "GESTION DE BASE DE DATOS", creditos: "4", semestre: "4", type: "P" },
    'NIS404': { codigo: "NIS404", nombre: "ESTRUCTURA DE DATOS Y ALGORITMOS", creditos: "4", semestre: "4", type: "P" },
    'NIS405': { codigo: "NIS405", nombre: "TEORIA GENERAL DE SISTEMAS", creditos: "4", semestre: "4", type: "P" },
    'NIS406': { codigo: "NIS406", nombre: "CONTABILIDAD GENERAL", creditos: "3", semestre: "4", type: "P" },

    //'BI010104': { codigo: "BI010104", nombre: "ESTADISTICA GENERAL", creditos: "4", semestre: "5", type:"I" },
    'NIS501': { codigo: "NIS501", nombre: "ANALISIS NUMERICO COMPUTACIONAL", creditos: "3", semestre: "5", type: "i" },
    'NIS502': { codigo: "NIS502", nombre: "SISTEMAS DIGITALES II", creditos: "4", semestre: "5", type: "I" },
    'NIS503': { codigo: "NIS503", nombre: "TALLER DE PROGRAMACION II", creditos: "4", semestre: "5", type: "I" },
    'NIS504': { codigo: "NIS504", nombre: "INGENIERIA DE SOFTWARE I", creditos: "4", semestre: "5", type: "I" },
    'NIS505': { codigo: "NIS505", nombre: "METODOLOGIA DE SISTEMAS I", creditos: "4", semestre: "5", type: "I" },
    'NIS506': { codigo: "NIS506", nombre: "INVESTIGACION DE OPERACIONES I", creditos: "3", semestre: "5", type: "I" },

    'NIS601': { codigo: "NIS601", nombre: "ARQUITECTURA DE COMPUTADORAS", creditos: "4", semestre: "6", type: "P" },
    'NIS602': { codigo: "NIS602", nombre: "INGENIERIA DE SOFTWARE II", creditos: "4", semestre: "6", type: "P" },
    'NIS603': { codigo: "NIS603", nombre: "ECONOMIA", creditos: "3", semestre: "6", type: "P" },
    'NIS604': { codigo: "NIS604", nombre: "REDES Y TELECOMUNICACIONES I", creditos: "4", semestre: "6", type: "P" },
    'NIS605': { codigo: "NIS605", nombre: "DINAMICA DE SISTEMAS I", creditos: "4", semestre: "6", type: "P" },
    'NIS606': { codigo: "NIS606", nombre: "INVESTIGACION DE OPERACIONES II", creditos: "3", semestre: "6", type: "P" },

    'NIS701': { codigo: "NIS701", nombre: "SISTEMAS OPERATIVOS", creditos: "3", semestre: "7", type: "I" },
    'NIS702': { codigo: "NIS702", nombre: "REDES Y TELECOMUNICACIONES II", creditos: "4", semestre: "7", type: "I" },
    'NIS703': { codigo: "NIS703", nombre: "GESTION DE PROYECTOS", creditos: "3", semestre: "7", type: "I" },
    'NIS704': { codigo: "NIS704", nombre: "METODOLOGIA DE SISTEMAS II", creditos: "4", semestre: "7", type: "I" },
    'NIS705': { codigo: "NIS705", nombre: "ORGANIZACION Y DIRECCION DE EMPRESAS", creditos: "3", semestre: "7", type: "I" },
    'NIS706': { codigo: "NIS706", nombre: "CREATIVIDAD EMPRESARIAL", creditos: "3", semestre: "7", type: "I" },

    'NIS801': { codigo: "NIS801", nombre: "SISTEMAS DISTRIBUIDOS", creditos: "3", semestre: "8", type: "P" },
    'NIS802': { codigo: "NIS802", nombre: "DINAMICA DE SISTEMAS II", creditos: "4", semestre: "8", type: "P" },
    'NIS803': { codigo: "NIS803", nombre: "SISTEMAS DE INFORMACION", creditos: "3", semestre: "8", type: "P" },
    'NIS804': { codigo: "NIS804", nombre: "GESTION DE RECURSOS HUMANOS", creditos: "3", semestre: "8", type: "P" },
    'NIS805': { codigo: "NIS805", nombre: "SIMULACION DISCRETA DE SISTEMAS", creditos: "3", semestre: "8", type: "P" },
    'NIS806': { codigo: "NIS806", nombre: "INTELIGENCIA DE NEGOCIOS", creditos: "3", semestre: "8", type: "P" },

    'NIS901': { codigo: "NIS901", nombre: "INTELIGENCIA ARTIF. Y SIST. EXPERTOS", creditos: "4", semestre: "9", type: "I" },
    'NIS902': { codigo: "NIS902", nombre: "SISTEMAS DE TIEMPO REAL", creditos: "4", semestre: "9", type: "I" },
    'NIS903': { codigo: "NIS903", nombre: "TALLER DE SEGURIDAD INFORMATICA", creditos: "3", semestre: "9", type: "I" },
    'NIS904': { codigo: "NIS904", nombre: "SISTEMAS DE INFORMACION GERENCIAL", creditos: "3", semestre: "9", type: "I" },
    'NIS905': { codigo: "NIS905", nombre: "PLANEAMIENTO INFORMATICO", creditos: "3", semestre: "9", type: "I" },
    'NIS906': { codigo: "NIS906", nombre: "SEMINARIO DE TESIS I", creditos: "3", semestre: "9", type: "I" },

    'NIS1001': { codigo: "NIS1001", nombre: "AUDITORIA DE SISTEMAS", creditos: "3", semestre: "10", type: "P" },
    'NIS1002': { codigo: "NIS1002", nombre: "TALLER EN ING. EN INFORM. Y SISTEMAS", creditos: "4", semestre: "10", type: "P" },
    'NIS1003': { codigo: "NIS1003", nombre: "SEMINARIO DE TESIS II", creditos: "3", semestre: "10", type: "P" },
    'NIS1004': { codigo: "NIS1004", nombre: "DERECHO INFORMATICO", creditos: "3", semestre: "10", type: "P" },
    'NIS1005': { codigo: "NIS1005", nombre: "GESTION DEL CONOCIMIENTO", creditos: "3", semestre: "10", type: "P" },
    'NIS1006': { codigo: "NIS1006", nombre: "DEONTOLOGIA PROFESIONAL", creditos: "2", semestre: "10", type: "P" },
    'NIS1011': { codigo: "NIS1011", nombre: "PRACTICAS PRE PROFESIONALES", creditos: "3", semestre: "10", type: "P" },

    'NEIS01': { codigo: "NEIS01", nombre: "REDES Y CONECTIVIDAD I", creditos: "2", electivo: true, type: "I" },
    'NEIS02': { codigo: "NEIS02", nombre: "REDES Y CONECTIVIDAD II", creditos: "2", electivo: true, type: "I" },
    'NEIS03': { codigo: "NEIS03", nombre: "REDES Y CONECTIVIDAD III", creditos: "2", electivo: true, type: "I" },
    'NEIS04': { codigo: "NEIS04", nombre: "REDES Y CONECTIVIDAD IV", creditos: "2", electivo: true, type: "I" },
    'NEIS05': { codigo: "NEIS05", nombre: "SOFTWARE LIBRE BASICO", creditos: "2", electivo: true, type: "I" },
    'NEIS06': { codigo: "NEIS06", nombre: "SOFTWARE LIBRE INTERMEDIO", creditos: "2", electivo: true, type: "I" },
    'NEIS07': { codigo: "NEIS07", nombre: "SOFTWARE LIBRE AVANZADO", creditos: "2", electivo: true, type: "I" },
    'NEIS08': { codigo: "NEIS08", nombre: "ARQUITECTURA DE PROCESADORES", creditos: "2", electivo: true, type: "I" },
    'NEIS09': { codigo: "NEIS09", nombre: "COMPUTACION GRAFICA", creditos: "2", electivo: true, type: "I" },
    'NEIS10': { codigo: "NEIS10", nombre: "DESARROLLO DE APLICACIONES WEB", creditos: "2", electivo: true, type: "I" },
    'NEIS11': { codigo: "NEIS11", nombre: "INGENIERIA DE REQUERIMIENTOS", creditos: "2", electivo: true, type: "I" },
    'NEIS12': { codigo: "NEIS12", nombre: "TOPICOS DE SIMULACION", creditos: "2", electivo: true, type: "I" },

    'NEIS13': { codigo: "NEIS13", nombre: "COMPILADORES", creditos: "2", electivo: true, type: "P" },
    'NEIS14': { codigo: "NEIS14", nombre: "CALIDAD DE SOFTWARE", creditos: "2", electivo: true, type: "P" },
    'NEIS15': { codigo: "NEIS15", nombre: "GESTION DE PROYECTOS INFORMATICOS", creditos: "2", electivo: true, type: "P" },
    'NEIS16': { codigo: "NEIS16", nombre: "NEGOCIOS ELECTRONICOS", creditos: "2", electivo: true, type: "P" },
    'NEIS17': { codigo: "NEIS17", nombre: "GESTION DEL CAMBIO", creditos: "2", electivo: true, type: "P" },
    'NEIS18': { codigo: "NEIS18", nombre: "REDISEÑO Y REINGENIERIA DE PROCESOS", creditos: "2", electivo: true, type: "P" },
    'NEIS19': { codigo: "NEIS19", nombre: "GESTION DE TEC. LIMPIAS PARA EL DES. SOST.", creditos: "2", electivo: true, type: "P" },
    'NEIS20': { codigo: "NEIS20", nombre: "NEGOCIOS INTERNACIONALES", creditos: "2", electivo: true, type: "P" },
    'NEIS21': { codigo: "NEIS21", nombre: "SISTEMAS DE INFORMACION GEOGRAFICA", creditos: "2", electivo: true, type: "P" },
    'NEIS22': { codigo: "NEIS22", nombre: "CIENCIA, TECNOLOGIA Y SOCIEDAD", creditos: "2", electivo: true, type: "P" },
    'NEIS23': { codigo: "NEIS23", nombre: "INVESTIGACION TECNOLOGICA", creditos: "2", electivo: true, type: "P" },
    'NEIS24': { codigo: "NEIS24", nombre: "TECNOLOGIAS EMERGENTES", creditos: "2", electivo: true, type: "P" },
    'NEIS25': { codigo: "NEIS25", nombre: "PROSPECTIVA TECNOLOGICA", creditos: "2", electivo: true, type: "P" },

    'TOTALCREDITS': 215,
    'YEAR': 2009
  }
};
const ACT_LIBRES = {
  'L0006': { codigo: "L0006", nombre: "FUTBOL", creditos: "1", al: true, type: "FD" },
  'L0009': { codigo: "L0009", nombre: "NATACION", creditos: "1", al: true, type: "FD" },
  'L0045': { codigo: "L0045", nombre: "INSTALACIONES ELECTRICAS DOMICILIARIAS", creditos: "1", al: true, type: "CC" },
  'L0051': { codigo: "L0051", nombre: "HOJA DE CALCULO (EXCEL)", creditos: "1", al: true, type: "CC" },
  'L0041': { codigo: "L0041", nombre: "AJEDREZ", creditos: "1", al: true, type: "FD" },
  'LI040061': { codigo: "LI040061", nombre: "ACTIVIDADES FISICAS BASICAS Y RECREATIVAS", creditos: "1", al: true, type: "FD" },
  'L0147A': { codigo: "L0147A", nombre: "ACTIVIDADES FISICAS BASICAS Y RECREATIVAS", creditos: "1", al: true, type: "FD" },

}
const FACULTAD = {
  "FIIS": "INGENIERIA EN INFORMATICA Y SISTEMAS",
  "FIIS2018": "INGENIERIA EN INFORMATICA Y SISTEMAS2018",
  "FIIS2009": "INGENIERIA EN INFORMATICA Y SISTEMAS2009",
  "ECO": "ECONOMIA"
}
exports.curriculaByCurso = function (escuela, curso, year = 2018) {
  if (!CURRICULA[escuela]) return "ESCUELA NO REGISTRADA";
  else if (!CURRICULA[escuela][curso]) return curso + " NOT FOUND";
  return CURRICULA[escuela][curso];
}
exports.curricula = function (escuela) {
  if (!CURRICULA[escuela]) return "ESCUELA NO REGISTRADA";
  return CURRICULA[escuela];
}
exports.getFacultadByEP = function (escuela) {
  if (!FACULTAD[escuela]) return "ESCUELA NO REGISTRADA";
  return FACULTAD[escuela];
}
exports.cursoByType = function (escuela, type, year = 2018) {
  let esc = CURRICULA[escuela];
  if (!esc) return "ESCUELA NO REGISTRADA";
  let course = searchItems(type, esc);
  if (!course) return type + " NOT FOUND";
  return course;
}
exports.getFreeCourses = function () {
  return ACT_LIBRES;
}


function searchItems(field, data) {
  let results = {};
  for (const key in data) {
    const item = data[key];
    if (item.cat == field) {
      results = item;
      break;
    }
  }
  return results;
}