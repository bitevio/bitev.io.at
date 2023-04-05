const modules={
    at:[
        {
        
          icon: "las la-tasks",
          label: "Etats",
          description: `
          Récapitulatif du jour des pointages
          `,
          to: "/apps/reporting/etats",
        },
        {
          icon: "las la-clock",
          label: "Pointage",
          description: "Historique des pointages ",
          to: "/apps/collections/controls",
        },
        {
          icon: "las la-calendar-alt",
          label: "Planning & Calendrier ",
          description: `
          Emploi du temps de gestion de présences
          `,
          to: "/apps/collections/planning",

        },
        {
          icon: "las la-calendar-plus",
          label: "Evenements de planning",
          description: `
          Les évenements liées aux plannings
          `,
          to: "/apps/collections/events_on_planning",

        },
        {
          icon: "las la-file",
          label: "Rapports",
          description: "Rapport détailés des temps de travail + Paie",
          to: "/apps/reporting/dashboard",
        },
    
        {
          icon: "las la-history",
          label: "Grilles horaires",
          description: "Configuration des grilles horaires ",
          to: "/apps/collections/timetables",
        },
    
        {
          icon: "las la-city",
          label: "Départements ",
          description: "Les départements ou serivces (GRH)",
          to: "/apps/collections/departments",
        },
        {
          icon: "las la-mobile",
          label: "Appareils ",
          description: "Appareils de pointages",
          to: "/apps/collections/devices",
        },
        {
          icon: "las la-user-friends",
          label: "Utilisateurs ",
          description: `Utilisateurs / Employés du process de pointage et d'administration (GRH)`,
          to: "/apps/collections/employees",
        },
    
        {
          icon: "las la-tag",
          label: "Code fonction ",
          description: `Gestion des attributs d'absence ou d'actions spécifiques`,
          to: "/apps/collections/function_codes",
        },
        {
          icon: "las la-file-alt",
          label: "Modèles ",
          description: `Composition de modèle pour planning .`,
          to: "/apps/collections/timesheets_models",
        },
        {
          icon: "las la-percent",
          label: "Classes de paie",
          description: "Gestion des taux horaires",
          to: "/apps/collections/rate_classes",
        },
      ],
}




export {
    modules
}