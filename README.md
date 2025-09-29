# Tenerife Quad Experience - Marketing Website

Sito marketing multilingua per **Tenerife Quad Experience**, sviluppato con Astro + TypeScript + Tailwind CSS. Il sito è ottimizzato per SEO, performance e supporta routing multilingue nativo.

## 🚀 Stack Tecnologico

- **Framework**: [Astro 5.x](https://astro.build/) - Static Site Generator veloce
- **Language**: TypeScript - Type safety completa
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com/) - Utility-first CSS
- **i18n**: Routing nativo Astro per IT/EN/ES/FR
- **SEO**: Sitemap automatico, Schema.org, Open Graph
- **Tooling**: ESLint, Prettier, Husky, Lighthouse

## 🌍 Funzionalità Multilingue

Il sito supporta 4 lingue con routing automatico:

- **🇮🇹 Italiano** (default): `/`
- **🇬🇧 Inglese**: `/en/`
- **🇪🇸 Spagnolo**: `/es/`
- **🇫🇷 Francese**: `/fr/`

### Struttura URL

```
/ (italiano - default locale)
/en/ (inglese)
/es/ (spagnolo)
/fr/ (francese)
```

## 📁 Struttura Progetto

```
marketing-site/
├── public/                    # Assets statici
│   ├── images/               # Immagini ottimizzate
│   ├── videos/               # Video background
│   └── robots.txt            # SEO robots
├── src/
│   ├── components/           # Component library
│   │   ├── Hero.astro        # Video background hero
│   │   ├── Header.astro      # Navigation + language switcher
│   │   ├── TourCard.astro    # Card tour con prezzi
│   │   ├── USPSection.astro  # Unique selling points
│   │   ├── PriceTable.astro  # Tabella prezzi responsive
│   │   ├── Testimonial.astro # Recensioni clienti
│   │   ├── FAQ.astro         # Domande frequenti
│   │   ├── CTA.astro         # Call to action
│   │   ├── Footer.astro      # Footer completo
│   │   ├── SEOMeta.astro     # Meta tags + Schema.org
│   │   └── OptimizedImage.astro # Immagini lazy-load
│   ├── content/              # Content Collections
│   │   ├── config.ts         # Schema TypeScript tipizzato
│   │   ├── tours/            # Collezione tour quad
│   │   └── blog/             # Collezione articoli
│   ├── layouts/
│   │   └── BaseLayout.astro  # Layout base con SEO
│   ├── pages/                # Routing automatico
│   │   ├── index.astro       # Homepage italiana
│   │   ├── en/               # Pagine inglesi
│   │   ├── es/               # Pagine spagnole
│   │   ├── fr/               # Pagine francesi
│   │   └── api/              # API endpoints
│   │       └── contact.ts    # Form contatti
│   ├── styles/
│   │   └── global.css        # Stili Tailwind + custom
│   └── utils/
│       └── imageUtils.ts     # Utility immagini ottimizzate
├── scripts/
│   └── lighthouse.js         # Performance testing
└── astro.config.mjs          # Configurazione Astro
```

## 🛠️ Setup & Installazione

### Prerequisiti

- Node.js 18+
- npm o yarn

### Installazione

```bash
cd marketing-site
npm install
```

### Comandi Disponibili

| Comando              | Descrizione                                       |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Server sviluppo (http://localhost:4321)           |
| `npm run build`      | Build produzione                                  |
| `npm run preview`    | Preview build locale                              |
| `npm run lint`       | Controllo ESLint                                  |
| `npm run lint:fix`   | Fix automatico ESLint                             |
| `npm run format`     | Formattazione Prettier                            |
| `npm run typecheck`  | Controllo TypeScript                              |
| `npm run lighthouse` | Test performance Lighthouse                       |
| `npm test`           | Test completi (lint + format + typecheck + build) |

## 📝 Content Collections

### Tours Collection

Schema tipizzato per i tour in quad:

```typescript
{
  title: string;           // "Tour del Teide"
  description: string;     // Descrizione SEO
  image: string;           // "/images/tour.jpg"
  price: number;           // 89 (in euro)
  duration: string;        // "4 ore"
  difficulty: "easy" | "moderate" | "hard";
  location: string;        // "Tenerife, Spagna"
  highlights: string[];    // Punti salienti
  included: string[];      // Cosa è incluso
  excluded: string[];      // Cosa è escluso
  maxParticipants: number; // 12
  minAge: number;          // 18
  terrain: "coastal" | "volcanic" | "mixed" | "mountain";
  publishDate: Date;
  featured: boolean;
  lang: "it" | "en" | "es" | "fr";
}
```

### Blog Collection

Schema per articoli informativi:

```typescript
{
  title: string;
  description: string;
  image: string;
  author: string;
  publishDate: Date;
  tags: string[];
  featured: boolean;
  lang: "it" | "en" | "es" | "fr";
}
```

## 🎨 Component Library

### Hero Component

```astro
<Hero
  title="Avventure in Quad a Tenerife"
  subtitle="Esplora paesaggi vulcanici..."
  ctaText="Prenota Ora"
  ctaLink="/contatti"
  videoSrc="/videos/hero-quad.mp4"
  backgroundImage="/images/fallback.jpg"
/>
```

### TourCard Component

```astro
<TourCard
  title="Tour del Teide"
  description="Esplora il vulcano..."
  image="/images/teide.jpg"
  price={89}
  duration="4 ore"
  difficulty="moderate"
  terrain="volcanic"
  slug="teide-tour"
  lang="it"
  maxParticipants={12}
  featured={true}
/>
```

## 🔧 API Endpoints

### Contact Form - `/api/contact`

Endpoint per gestire i form di contatto:

```typescript
POST /api/contact
Content-Type: application/x-www-form-urlencoded

{
  name: string;
  email: string;
  phone?: string;
  tour?: string;
  message: string;
  participants?: string;
  preferredDate?: string;
  language: "it" | "en" | "es" | "fr";
}
```

**Response:**

```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

## 🎯 SEO & Performance

### Schema.org Structured Data

- ✅ **Organization** - Info azienda completa
- ✅ **LocalBusiness** - Attività locale con geo-dati
- ✅ **Product/Offer** - Tour come prodotti strutturati
- ✅ **BreadcrumbList** - Navigazione strutturata
- ✅ **Article** - Articoli blog ottimizzati

### Open Graph & Meta Tags

- ✅ Canonical URLs automatici
- ✅ Meta description ottimizzate
- ✅ Open Graph completo (og:title, og:description, og:image)
- ✅ Twitter Cards
- ✅ hreflang per tutte le lingue

### Performance Features

- ✅ **Lazy Loading**: Immagini caricate on-demand
- ✅ **Image Optimization**: Resize e format automatici
- ✅ **Code Splitting**: Bundle ottimizzati per pagina
- ✅ **Static Generation**: Pre-rendering completo

## 🧪 Testing & Quality

### Lighthouse Testing

```bash
npm run lighthouse
```

Il script testa automaticamente:

- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

### Linting & Formatting

- **ESLint**: Controllo codice TypeScript/Astro
- **Prettier**: Formattazione automatica
- **Husky**: Pre-commit hooks automatici

## 🚀 Deployment

### Build Production

```bash
npm run build
```

Output generato in `/dist/` pronto per hosting statico.

### Hosting Consigliati

- **Netlify**: Deploy automatico da Git
- **Vercel**: Ottimizzato per Astro
- **Cloudflare Pages**: CDN globale
- **AWS S3 + CloudFront**: Soluzione enterprise

### Configurazione DNS

```
www.tenerifequadexperience.com → hosting
tenerifequadexperience.com → redirect a www
```

## 🌟 Decisioni Architetturali

### Perché Astro?

- **Performance**: Static generation = velocità massima
- **SEO**: Server-side rendering nativo
- **i18n**: Routing multilingue built-in
- **Developer Experience**: TypeScript + hot reload
- **Ecosystem**: Integrazione perfetta con Tailwind

### Perché Tailwind CSS?

- **Utility-First**: Sviluppo rapido e consistente
- **Performance**: CSS ottimizzato in produzione
- **Responsive**: Design mobile-first nativo
- **Customization**: Temi personalizzabili

### Perché TypeScript?

- **Type Safety**: Meno bug in produzione
- **IntelliSense**: Autocompletamento IDE
- **Refactoring**: Modifiche sicure del codice
- **Documentation**: Tipi come documentazione

## 📄 Come Aggiungere Nuove Pagine

### 1. Nuova Lingua

```bash
# Crea directory lingua
mkdir src/pages/de  # Tedesco

# Copia homepage
cp src/pages/en/index.astro src/pages/de/index.astro

# Aggiorna astro.config.mjs
i18n: {
  locales: ['it', 'en', 'es', 'fr', 'de']
}
```

### 2. Nuova Pagina

```bash
# Crea pagina italiana
echo "---" > src/pages/prezzi.astro

# Crea versioni tradotte
mkdir -p src/pages/{en,es,fr}
cp src/pages/prezzi.astro src/pages/en/prices.astro
cp src/pages/prezzi.astro src/pages/es/precios.astro
cp src/pages/prezzi.astro src/pages/fr/prix.astro
```

### 3. Nuovo Tour

```bash
# Crea file content
cat > src/content/tours/sunset-adventure-it.md << EOF
---
title: "Tour Tramonto Spettacolare"
description: "Goditi un tramonto mozzafiato..."
price: 75
duration: "3 ore"
difficulty: "easy"
# ... resto frontmatter
---

Contenuto del tour...
EOF
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Pulisci cache Astro
rm -rf .astro/

# Reinstalla dipendenze
rm -rf node_modules/ package-lock.json
npm install

# Ricostruisci
npm run build
```

### Content Collection Errors

```bash
# Verifica schema
npm run dev # Mostra errori schema in console

# Valida frontmatter
npm run typecheck
```

### Lighthouse Issues

```bash
# Testa in locale
npm run build && npm run preview
npm run lighthouse
```

## 📞 Supporto

Per problemi o domande:

1. Controlla la [documentazione Astro](https://docs.astro.build/)
2. Verifica la configurazione in `astro.config.mjs`
3. Testa con `npm run dev` per errori di sviluppo

---

## 🎉 Riepilogo Risultati

✅ **Progetto Astro + TypeScript + Tailwind** inizializzato
✅ **Routing i18n** configurato per 4 lingue (/it, /en, /es, /fr)
✅ **Content Collections** tipizzate per tours e blog
✅ **Component Library** completa (10+ componenti)
✅ **SEO Avanzato** con Schema.org, sitemap, meta tags
✅ **API Endpoint** per form contatti
✅ **Tooling Professionale** ESLint, Prettier, Husky
✅ **Performance Testing** con Lighthouse automatico
✅ **Build Funzionante** con 0 errori

Il sito è pronto per il deployment e ottimizzato per ottenere Lighthouse scores ≥ 90 su tutte le metriche!
