/* ============================================================
   CATALOGUE PRODUITS — products.js
   Source unique de vérité pour toutes les pages.

   COMMENT AJOUTER UN PRODUIT :
   1. Copier un bloc existant, lui donner un id unique (p9, p10…)
   2. Remplir les champs de base (name, price, category…)
   3. Ajouter vos images dans image/products/pX/
   4. Définir vos variantes si nécessaire

   CHAMP SPÉCIAL :
   - featured: true  → le produit apparaît dans la section
                        "Pièces phares" de la page d'accueil
                        (max 3 produits affichés)

   VARIANTES — deux modes :

   MODE A — variante simple (taille, parfum, thème…)
   Les options ne changent que le prix. Images communes à toutes.
   {
     type: "taille", label: "Taille",
     options: [
       { value: "S", label: "Petite (20cm)" },
       { value: "L", label: "Grande (35cm)", priceExtra: 8 },
     ]
   }

   MODE B — variante visuelle (couleur, modèle…)
   Chaque option a ses propres images (et peut avoir un prix différent).
   Quand l'utilisateur choisit une option, les photos changent.
   {
     type: "couleur", label: "Couleur", visual: true,
     options: [
       { value: "bleu",   label: "Bleu",   color: "#4a90d9",
         images: ["../image/products/p5/bleu-1.jpg", "../image/products/p5/bleu-2.jpg"] },
       { value: "rouge",  label: "Rouge",  color: "#c0392b",
         images: ["../image/products/p5/rouge-1.jpg"] },
     ]
   }

   CHAMPS OPTIONNELS PAR OPTION :
   - priceExtra : surcoût en € (ex: +8)
   - images     : tableau de chemins d'images (écrase les images du produit)
   - description: texte alternatif affiché quand cette option est sélectionnée
   - unavailable: true → option barrée, non sélectionnable
   ============================================================ */

const PRODUCTS = {

  rose_unie: {
    name: "Rose unie",
    price: 3,
    featured: true,
    images: [
      "../image/products/rose_unie/rose_beige.jpg"
    ],
    icon: "🌿",
    category: "fleurs",
    badge: null,
    badgeColor: "#2C5F2E",
    stock: "in-stock",
    description: "Une collection de roses crochetées aux couleurs pures et élégantes. Chaque fleur met en valeur une teinte unique, allant des tons doux et naturels aux couleurs les plus vives. Simples et intemporelles, elles constituent la base de toute collection florale.",
    highlights: [
      "🌿 Matériaux naturels séchés",
      "📏 Diamètre selon la taille choisie",
      "🎁 Idéale en cadeau",
      "♻️ Emballage recyclable",
    ],
    tabs: {
      details: "Chaque fleur est entièrement crochetée à la main avec soin. Les variations de couleur, de texture et de forme témoignent du caractère artisanal de chaque création. Disponible en plusieurs coloris et motifs uniques.",
      materiaux: "Fil de coton, rembourrage textile léger, tige métallique gainée, feuilles crochetées assorties.",
      entretien: "Ne nécessite aucun arrosage. Conserver à l'abri de l'humidité prolongée et de la poussière excessive. Nettoyer délicatement avec un chiffon sec ou un pinceau doux."
    },
    variants: [
      {
        type: "couleur", label: "Coloris",
        visual: true,
        options: [
          {
            value: "beige", label: "Beige", color: "#E8E1D5",
            images: ["../image/products/rose_unie/rose_beige.jpg"],
            description: "Rose élégante et discrète aux nuances naturelles.",
          },
          {
            value: "turquoise", label: "Turquoise", color: "#A7E3DD",
            images: ["../image/products/rose_unie/rose_turquoise.jpg"],
            description: "Rose aux tons marins clairs évoquant les lagons tropicaux."
          },
          {
            value: "menthe", label: "Menthe", color: "#8EB8A5",
            images: ["../image/products/rose_unie/rose_menthe.jpg"],
            description: "Fleur douce et apaisante inspirée des feuilles de menthe fraîche."
          },
          {
            value: "ciel", label: "Ciel", color: "#4EB5E8",
            images: ["../image/products/rose_unie/rose_ciel.jpg"],
            description: "Rose lumineuse rappelant un ciel d'été sans nuages."
          },
          {
            value: "marine", label: "Marine", color: "#163E96",
            images: ["../image/products/rose_unie/rose_marine.jpg"],
            description: "Fleur profonde aux teintes de l'océan au crépuscule."
          },
          {
            value: "violet", label: "Violet", color: "#4E347D",
            images: ["../image/products/rose_unie/rose_violet.jpg"],
            description: "Fleur mystérieuse associée à la créativité et à la magie."
          },
          {
            value: "gris", label: "Gris", color: "#B0B0B0",
            images: ["../image/products/rose_unie/rose_gris.jpg"],
            description: "Rose sobre aux couleurs minérales et raffinées."
          },
          {
            value: "rose", label: "Rose", color: "#D88BA5",
            images: ["../image/products/rose_unie/rose_rose.jpg"],
            description: "Fleur tendre symbolisant l'affection et la douceur."
          },
          {
            value: "noir", label: "Noir", color: "#1A1A1A",
            images: ["../image/products/rose_unie/rose_noir.jpg"],
            description: "Rose rare aux pétales sombres et énigmatiques."
          },
          {
            value: "rouge", label: "Rouge", color: "#B71C2A",
            images: ["../image/products/rose_unie/rose_rouge.jpg"],
            description: "Fleur passionnée représentant le courage et l'amour."
          },
          {
            value: "orange", label: "Orange", color: "#C75A28",
            images: ["../image/products/rose_unie/rose_orange.jpg"],
            description: "Rose chaleureuse aux couleurs du coucher de soleil."
          },
          {
            value: "jaune", label: "Jaune", color: "#D9C13A",
            images: ["../image/products/rose_unie/rose_jaune.jpg"],
            description: "Fleur rayonnante inspirée par la lumière du soleil."
          },
        ]
      }
    ]
  },

  rose_a_motif: {
    name: "Rose à motif",
    price: 3,
    featured: true,
    images: [
      "../image/products/rose_a_motif/rose_om.jpg"
    ],
    icon: "🌿",
    category: "fleurs",
    badge: "Nouveauté",
    badgeColor: "#2C5F2E",
    stock: "in-stock",
    description: "Une série de roses crochetées combinant plusieurs couleurs dans une même fleur. Ces créations originales offrent des contrastes harmonieux ou audacieux, donnant naissance à des variétés rares et distinctives inspirées de thèmes, de gourmandises ou d'associations de couleurs emblématiques.",
    highlights: [
      "🌿 Matériaux naturels séchés",
      "📏 Diamètre selon la taille choisie",
      "🎁 Idéale en cadeau",
      "♻️ Emballage recyclable",
    ],
    tabs: {
      details: "Chaque fleur est entièrement crochetée à la main avec soin. Les variations de couleur, de texture et de forme témoignent du caractère artisanal de chaque création. Disponible en plusieurs coloris et motifs uniques.",
      materiaux: "Fil de coton, rembourrage textile léger, tige métallique gainée, feuilles crochetées assorties.",
      entretien: "Ne nécessite aucun arrosage. Conserver à l'abri de l'humidité prolongée et de la poussière excessive. Nettoyer délicatement avec un chiffon sec ou un pinceau doux."
    },
    variants: [
      {
        type: "couleur", label: "Coloris",
        visual: true,
        options: [
          {
            value: "om", label: "OM", colors: ["#F2F2F2", "#7CC6F5"],
            images: ["../image/products/rose_a_motif/rose_om.jpg"],
            description: "Rose lumineuse aux couleurs fraîches et aériennes.",
          },
          {
            value: "lakers", label: "Lakers", colors: ["#F0B52A", "#4F2C84"],
            images: ["../image/products/rose_a_motif/rose_lakers.jpg"],
            description: "Alliance royale de violet et d'or, symbole de prestige."
          },
          {
            value: "rosy", label: "Rosy", colors: ["#D88BA5", "#21408F"],
            images: ["../image/products/rose_a_motif/rose_rosy.jpg"],
            description: "Mariage harmonieux entre douceur florale et bleu profond."
          },
          {
            value: "bleuet", label: "Bleuet", colors: ["#46B5E8", "#21408F"],
            images: ["../image/products/rose_a_motif/rose_bleuet.jpg"],
            description: "Fleur inspirée des eaux claires et des océans profonds."
          },
          {
            value: "fraise-chantilly", label: "Fraise-Chantilly", colors: ["#F2F2F2", "#E7A0B9"],
            images: ["../image/products/rose_a_motif/rose_fraise_chantilly.jpg"],
            description: "Fleur gourmande rappelant un dessert léger et sucré."
          },
          {
            value: "chocolat", label: "Chocolat", colors: ["#C6A37A", "#7A5234"],
            images: ["../image/products/rose_a_motif/rose_chocolat.jpg"],
            description: "Rose aux teintes riches inspirées du cacao."
          },
          {
            value: "oreo", label: "Oréo", colors: ["#F2F2F2", "#1A1A1A"],
            images: ["../image/products/rose_a_motif/rose_oreo.jpg"],
            description: "Contraste parfait entre lumière et obscurité."
          },
          {
            value: "cafe", label: "Café", color : "#C5A67B",
            images: ["../image/products/rose_a_motif/rose_cafe.jpg"],
            description: "Fleur aux couleurs chaleureuses d'un café fraîchement torréfié."
          },
          {
            value: "rcl", label: "RCL", colors: ["#C71F25", "#E3D043"],
            images: ["../image/products/rose_a_motif/rose_rcl.jpg"],
            description: "Variété flamboyante aux couleurs éclatantes et énergétiques."
          },
          {
            value: "orangeade", label: "Orangeade", colors: ["#B72524", "#D56A2E"],
            images: ["../image/products/rose_a_motif/rose_orangeade.jpg"],
            description: "Mélange fruité de rouge intense et d'orange vif."
          },
          {
            value: "potiron", label: "Potiron", colors: ["#D96D2C", "#DCC84A"],
            images: ["../image/products/rose_a_motif/rose_potiron.jpg"],
            description: "Fleur automnale inspirée des récoltes de saison."
          }
        ]
      }
    ]
  },

  tulipe: {
    name: "Tulipe",
    price: 3,
    featured: true,
    images: [
      "../image/products/tulipe/tulipe_beige.jpg"
    ],
    icon: "🌿",
    category: "fleurs",
    badge: null,
    badgeColor: "#2C5F2E",
    stock: "in-stock",
    description: "Une collection de fleurs crochetées à la main aux couleurs douces et éclatantes. Chaque création met en avant une teinte unique et un design épuré, offrant une décoration intemporelle qui ne fane jamais.",
    highlights: [
      "🌿 Matériaux naturels séchés",
      "📏 Diamètre selon la taille choisie",
      "🎁 Idéale en cadeau",
      "♻️ Emballage recyclable",
    ],
    tabs: {
      details: "Chaque fleur est entièrement crochetée à la main avec soin. Les variations de couleur, de texture et de forme témoignent du caractère artisanal de chaque création. Disponible en plusieurs coloris et motifs uniques.",
      materiaux: "Fil de coton, rembourrage textile léger, tige métallique gainée, feuilles crochetées assorties.",
      entretien: "Ne nécessite aucun arrosage. Conserver à l'abri de l'humidité prolongée et de la poussière excessive. Nettoyer délicatement avec un chiffon sec ou un pinceau doux."
    },
    variants: [
      {
        type: "couleur", label: "Coloris",
        visual: true,
        options: [
          {
            value: "beige", label: "Beige", color: "#F1EFE8",
            images: ["../image/products/tulipe/tulipe_beige.jpg"],
            description: "Fleur délicate aux tons naturels et apaisants."
          },
          {
            value: "jaune_doree", label: "Jaune doré", color: "#D8AA3C",
            images: ["../image/products/tulipe/tulipe_jaune_dore.jpg"],
            description: "Fleur lumineuse inspirée des champs baignés de soleil.",
          },
          {
            value: "orange", label: "Orange", color: "#D56A2E",
            images: ["../image/products/tulipe/tulipe_orange.jpg"],
            description: "Fleur chaleureuse aux couleurs des couchers de soleil d'automne."
          },
          {
            value: "rouge", label: "Rouge", color: "#B71C2A",
            images: ["../image/products/tulipe/tulipe_rouge.jpg"],
            description: "Fleur éclatante symbolisant la passion et l'énergie."
          },
          {
            value: "rose_pale", label: "Rose pâle", color: "#E5C7D5",
            images: ["../image/products/tulipe/tulipe_rose_pale.jpg"],
            description: "Fleur douce évoquant la tendresse et la légèreté."
          },
          {
            value: "rose", label: "Rose", color: "#D88BA5",
            images: ["../image/products/tulipe/tulipe_rose.jpg"],
            description: "Fleur élégante aux nuances romantiques."
          },
          {
            value: "violet", label: "Violet", color: "#7452B6",
            images: ["../image/products/tulipe/tulipe_violet.jpg"],
            description: "Fleur mystérieuse aux teintes royales et raffinées."
          }
        ]
      }
    ]
  },

  /*p2: {
    name: "Collier macramé",
    price: 35,
    featured: true,   // ← apparaît en "Pièces phares" sur l'accueil
    images: [
      "../image/products/renard.jpg",
      "../image/products/renard.jpg",
    ],
    icon: "✨",
    category: "bijou",
    badge: "Coup de ♥",
    badgeColor: "orange",
    stock: "in-stock",
    description: "Collier réalisé en macramé avec perles naturelles. Léger, élégant, il se porte au quotidien ou pour une occasion spéciale.",
    highlights: [
      "✨ Perles naturelles",
      "📐 Longueur réglable 40–55 cm",
      "🤍 Coloris naturels",
      "🎁 Livré dans une pochette en lin",
    ],
    tabs: {
      details:   "Réalisé à la main avec du fil de coton ciré et des perles naturelles. Fermoir ajustable. Chaque pièce est unique.",
      materiaux: "Fil de coton ciré, perles en pierre naturelle (howlite, jade ou améthyste selon la couleur), fermoir en laiton sans nickel.",
      entretien: "Éviter le contact prolongé avec l'eau. Conserver à l'abri de l'humidité.",
    },
    variants: [
      {
        type: "couleur", label: "Coloris",
        visual: true,
        options: [
          {
            value: "naturel", label: "Naturel", color: "#e8d5b7",
            images: ["../image/products/renard.jpg", "../image/products/renard.jpg"],
            description: "Tons sable et ivoire, pour un style épuré et intemporel."
          },
          {
            value: "terracotta", label: "Terracotta", color: "#c1714a",
            images: ["../image/products/renard.jpg"],
            description: "Teintes chaudes aux reflets de terre cuite, esprit bohème."
          },
          {
            value: "sauge", label: "Sauge", color: "#8aa68e",
            images: ["../image/products/renard.jpg"],
            description: "Vert sauge doux, pour une touche nature et apaisante."
          },
          {
            value: "nuit", label: "Nuit", color: "#3a3d6b",
            images: ["../image/products/renard.jpg"],
            description: "Bleu nuit profond, élégant et mystérieux."
          },
        ]
      }
    ]
  },

  p3: {
    name: "Tote bag brodé",
    price: 22,
    images: ["../image/products/renard.jpg"],
    icon: "🧵",
    category: "textile",
    badge: null,
    stock: "in-stock",
    description: "Tote bag en coton naturel orné d'une broderie faite main. Pratique, solide et joliment unique.",
    highlights: [
      "🧵 Broderie réalisée à la main",
      "♻️ Coton naturel non blanchi",
      "📦 Capacité généreuse",
      "🌿 Lavable en machine (30°)",
    ],
    tabs: {
      details:   "Tote bag en coton canvas 280g non blanchi. Les anses renforcées supportent une charge jusqu'à 8 kg.",
      materiaux: "Coton canvas naturel 280g/m², fils à broder en coton mercerisé DMC, coutures doubles renforcées.",
      entretien: "Lavage en machine à 30°. Ne pas utiliser d'assouplissant. Séchage à plat.",
    },
    variants: [
      {
        type: "modele", label: "Motif brodé",
        visual: true,
        options: [
          {
            value: "fleur",   label: "🌸 Fleur sauvage",
            images: ["../image/products/renard.jpg"],
            description: "Motif floral délicat brodé au point de croix."
          },
          {
            value: "feuille", label: "🌿 Feuillage",
            images: ["../image/products/renard.jpg"],
            description: "Branchages et feuilles stylisés, esprit botanique."
          },
          {
            value: "soleil",  label: "☀️ Soleil",
            images: ["../image/products/renard.jpg"],
            description: "Soleil graphique rayonnant, joyeux et chaleureux."
          },
        ]
      }
    ]
  },

  p4: {
    name: "Bougie artisanale",
    price: 45,
    images: ["../image/products/renard.jpg", "../image/products/renard.jpg"],
    icon: "🕯️",
    category: "deco",
    badge: null,
    stock: "in-stock",
    description: "Bougie en cire naturelle de soja, parfumée aux huiles essentielles. Un objet de décoration autant qu'une expérience sensorielle.",
    highlights: [
      "🕯️ Cire 100% soja naturelle",
      "🌸 Parfums aux huiles essentielles",
      "⏱️ Durée : environ 45h",
      "✋ Mèche en coton naturel",
    ],
    tabs: {
      details:   "Coulée à la main dans un pot en verre réutilisable (200g). Premier allumage : laisser brûler 2h pour une nappe de cire uniforme.",
      materiaux: "Cire de soja naturelle (non OGM), huiles essentielles biologiques, mèche en coton naturel, pot en verre borosilicate avec couvercle en bois.",
      entretien: "Couper la mèche à 5mm avant chaque allumage. Ne pas brûler plus de 3h à la fois.",
    },
    variants: [
      {
        type: "parfum", label: "Parfum",
        options: [
          { value: "lavande",    label: "💜 Lavande & Romarin",   description: "Floral et herbacé, apaisant et méditerranéen." },
          { value: "vanille",    label: "🤍 Vanille & Ambre",     description: "Doux et enveloppant, parfait pour les soirées cocooning." },
          { value: "eucalyptus", label: "🌿 Eucalyptus & Menthe", description: "Frais et vivifiant, idéal pour purifier l'atmosphère." },
          { value: "rose",       label: "🌹 Rose & Bois de Cèdre",description: "Floral et boisé, romantique et élégant." },
        ]
      }
    ]
  },

  p5: {
    name: "Boucles d'oreilles",
    price: 18,
    images: ["../image/products/renard.jpg"],
    icon: "💛",
    category: "bijou",
    badge: null,
    stock: "low",
    description: "Boucles d'oreilles légères réalisées à la main. Un bijou délicat pour sublimer votre quotidien.",
    highlights: [
      "💛 Crochets hypoallergéniques",
      "🪶 Ultra légères",
      "🎁 Livrées dans un écrin",
      "✋ Pièces uniques",
    ],
    tabs: {
      details:   "Légères et confortables à porter toute la journée. Chaque paire est unique — les légères variations font partie du charme artisanal.",
      materiaux: "Crochets en acier inoxydable 316L hypoallergénique, perles en résine naturelle, céramique ou pierres semi-précieuses selon le modèle.",
      entretien: "Éviter le contact avec l'eau et les produits cosmétiques. Conserver dans l'écrin fourni.",
    },
    variants: [
      {
        type: "modele", label: "Modèle",
        visual: true,
        options: [
          {
            value: "cercle", label: "○ Cercle céramique",
            images: ["../image/products/renard.jpg"],
            description: "Cercle en céramique mate, minimaliste et élégant."
          },
          {
            value: "goutte",  label: "◇ Goutte en résine",
            images: ["../image/products/renard.jpg"],
            description: "Goutte translucide en résine naturelle, légère et lumineuse."
          },
          {
            value: "fleur",  label: "✿ Fleur en argile",
            images: ["../image/products/renard.jpg"],
            description: "Petite fleur sculptée en argile, délicate et féminine."
          },
        ]
      },
      {
        type: "couleur", label: "Coloris",
        options: [
          { value: "blanc",      label: "Blanc",      color: "#f0ece4" },
          { value: "terracotta", label: "Terracotta", color: "#c1714a" },
          { value: "sauge",      label: "Sauge",      color: "#8aa68e" },
        ]
      }
    ]
  },

  p6: {
    name: "Coffret cadeau",
    price: 55,
    images: ["../image/products/renard.jpg", "../image/products/renard.jpg"],
    icon: "🎁",
    category: "cadeau",
    badge: "Best-seller",
    badgeColor: "green",
    stock: "in-stock",
    description: "Un coffret soigneusement composé de créations assorties. Le cadeau idéal pour les êtres chers.",
    highlights: [
      "🎁 3 créations assorties",
      "🌸 Emballage cadeau inclus",
      "✍️ Carte personnalisée offerte",
      "🚚 Expédition soignée",
    ],
    tabs: {
      details:   "Le coffret inclut toujours une bougie, un bijou et un objet de décoration, choisis en harmonie. Vous pouvez indiquer vos préférences dans la note de commande.",
      materiaux: "Boîte en carton kraft recyclé, papier de soie, ruban en satin de coton, carte artisanale.",
      entretien: "Voir les fiches entretien de chaque produit contenu dans le coffret.",
    },
    variants: [
      {
        type: "theme", label: "Thème",
        visual: true,
        options: [
          {
            value: "nature",   label: "🌿 Esprit Nature",
            images: ["../image/products/renard.jpg"],
            description: "Tons verts et naturels — bougie eucalyptus, bijou sauge, déco végétale."
          },
          {
            value: "douceur",  label: "🤍 Tout en Douceur",
            images: ["../image/products/renard.jpg"],
            description: "Tons crème et poudré — bougie vanille, bijou ivoire, déco douce."
          },
          {
            value: "surprise", label: "🎲 Laissez-moi choisir !",
            images: ["../image/products/renard.jpg"],
            description: "Je compose le coffret selon mon inspiration du moment — une vraie surprise !"
          },
        ]
      }
    ]
  },

  p7: {
    name: "Pochette brodée",
    price: 38,
    images: ["../image/products/renard.jpg"],
    icon: "🌸",
    category: "textile",
    badge: null,
    stock: "in-stock",
    description: "Pochette zippée en lin brodé main. Parfaite pour sac à main, trousse de voyage ou nécessaire de toilette.",
    highlights: [
      "🌸 Broderie faite main",
      "🪡 Lin naturel doublé coton",
      "🔒 Fermeture éclair en métal",
      "📏 Format pratique 22×14cm",
    ],
    tabs: {
      details:   "Pochette de 22×14cm, doublée intérieur coton enduit imperméable. Fermeture éclair en métal brossé avec tirette en cuir végétal.",
      materiaux: "Lin naturel lavé, broderie en fils de coton, doublure coton enduit imperméable, fermeture éclair en métal, tirette en cuir végétal.",
      entretien: "Nettoyage à la main à l'eau tiède. Séchage à plat. Ne pas mettre en machine.",
    },
    variants: [
      {
        type: "couleur", label: "Fond",
        visual: true,
        options: [
          {
            value: "naturel", label: "Lin naturel", color: "#d4c5a9",
            images: ["../image/products/renard.jpg"],
            description: "Lin brut non teint, texture naturelle authentique."
          },
          {
            value: "gris",    label: "Gris perle",  color: "#b8b8b0",
            images: ["../image/products/renard.jpg"],
            description: "Gris perle doux, élégant et polyvalent."
          },
          {
            value: "bleu",    label: "Bleu nuit",   color: "#2c3e6b",
            images: ["../image/products/renard.jpg"],
            description: "Bleu nuit intense, sobre et raffiné."
          },
        ]
      }
    ]
  },

  p8: {
    name: "Suspension murale",
    price: 32,
    featured: true,   // ← apparaît en "Pièces phares" sur l'accueil
    images: ["../image/products/renard.jpg", "../image/products/renard.jpg"],
    icon: "🍂",
    category: "deco",
    badge: null,
    stock: "in-stock",
    description: "Suspension murale en macramé naturel. Un élément décoratif chaud et artisanal pour habiller vos murs.",
    highlights: [
      "🍂 Coton naturel brut",
      "📏 Hauteur selon le format choisi",
      "🪵 Bâton en bois flotté",
      "🌿 Style bohème naturel",
    ],
    tabs: {
      details:   "Réalisée en macramé sur un bâton de bois récupéré et poncé. Chaque suspension est unique. Un fil de chanvre permet la fixation murale.",
      materiaux: "Cordon de coton naturel 5mm, bois flotté ou branche naturelle, fil de chanvre.",
      entretien: "Éviter l'humidité. Épousseter avec un pinceau doux.",
    },
    variants: [
      {
        type: "taille", label: "Format",
        options: [
          { value: "mini",     label: "Mini (~40cm)" },
          { value: "standard", label: "Standard (~60cm)" },
          { value: "grand",    label: "Grand (~90cm)", priceExtra: 12 },
        ]
      }
    ]
  },
*/
};

if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
}

/* ============================================================
   UTILITAIRE — label de catégorie (partagé par toutes les pages)
   ============================================================ */
function getCategoryLabel(cat) {
  const labels = { fleurs: "Fleurs" };
  return labels[cat] || cat;
}

if (typeof window !== 'undefined') {
  window.getCategoryLabel = getCategoryLabel;
}
