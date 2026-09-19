# Design tokens V4 Premium — palette, rayons, ombres

Extrait des 4 écrans V4 de `pencil-new.pen` : **Home V4 Premium** (`a6sFds`), **Properties V4** (`cD4Ck`), **Decorators V4** (`u4FpoC`), **Property Detail V4** (`HJoQI`). Les compteurs d'usage sont ceux de la maquette. Complète la note « Spec Système V4 — Tokens & Intégration » sans la remplacer.

Cible : shadcn (style `new-york`, variables HSL) + Tailwind 3.4, comme le back-office existant. Tout est préfixé `lux-` et scopé sous `.theme-lux` pour ne pas toucher au thème BO.

---

## 1. Palette — couleurs opaques

Statut : **existant** = déjà variable dans le .pen · **nouveau** = attribué ici · **doublon** = à remplacer.

### Fonds

| Token | Hex | HSL (shadcn) | Usage maquette | Statut |
|---|---|---|---|---|
| `lux-ink` | `#0B0908` | `20 15.8% 3.7%` | fond global, texte sur or (35 fills) | existant |
| `lux-ink-deep` | `#0E0C0B` | `20 12% 4.9%` | fond footer | nouveau (variable `bg-deep` dans le .pen) |
| `lux-surface-1` | `#17130F` | `30 21.1% 7.5%` | inputs/selects, panneau filtres, cartes fiche bien, squelette | existant (`surface-1`) |
| `lux-surface-2` | `#141210` | `30 11.1% 7.1%` | panneau verre carte **indisponible** (à 85 %) | existant (`surface-2`) |
| `lux-surface-3` | `#1C140A` | `33 47.4% 7.5%` | panneau verre carte **disponible** (à 85 %) | nouveau |

Doublons à normaliser : `#100D0C` (fond section Galerie, 1×) → `lux-ink-deep` · `#141010` (cartes section Sélection, 4×) → `lux-surface-2`.

### Accent

| Token | Hex | HSL | Usage | Statut |
|---|---|---|---|---|
| `lux-gold` | `#C9A24B` | `41 53.8% 54.1%` | CTA pleins, marqueurs, flèche active, ring focus (54 fills) | existant |
| `lux-gold-soft` | `#E3C88E` | `41 60.3% 72.4%` | eyebrows, icônes, tag « Exclusivité », texte sur fond sombre (51 + 26 fills) | existant |

### Textes (6 niveaux, du plus clair au plus sombre)

| Token | Hex | HSL | Usage | Contraste sur ink | Statut |
|---|---|---|---|---|---|
| `lux-cream` | `#F2ECE1` | `39 39.5% 91.6%` | texte principal, titres, noms de biens (92 fills) | 16.9 | existant |
| `lux-text-soft` | `#D8CFC0` | `38 23.5% 80%` | sous-titre hero, descriptions | 12.9 | existant |
| `lux-text-nav` | `#C3B9A6` | `39 19.5% 70.8%` | liens nav, « Tout voir », labels boutons secondaires (32 fills) | 10.2 | existant |
| `lux-muted` | `#B4A891` | `39 18.9% 63.7%` | texte secondaire, icônes d'action, « Mis à jour aujourd'hui » | 8.5 | existant |
| `lux-text-dim` | `#8E8471` | `39 11.4% 50%` | labels, compteurs, placeholders, méta (27 + 26 fills) | 5.4 | existant |
| `lux-text-disabled` | `#6E6555` | `38 12.8% 38.2%` | icône flèche désactivée uniquement | 3.5 (OK car disabled) | nouveau |

Doublons à normaliser : `#F4EFE6` (26×) → `lux-cream` · `#9C927F` (3×) → `lux-text-dim` · `#C7BCA8` (1×) → `lux-text-nav` · `#D6CCBA` (1×) → `lux-text-soft`.

### Neutre « indisponible »

| Token | Hex | HSL | Usage | Statut |
|---|---|---|---|---|
| `lux-stone` | `#8C8676` | `44 8.7% 50.6%` | bordure/fond du panneau et bouton d'action sur carte indisponible (remplace l'or, en alpha) | nouveau |

### Alerte (statut RÉSERVÉ / LOUÉ / NON DISPONIBLE)

| Token | Hex | HSL | Usage | Statut |
|---|---|---|---|---|
| `lux-alert` | `#FF6A4D` | `10 100% 65.1%` | point d'état + halo pulse | existant |
| `lux-alert-strong` | `#C2200E` | `6 86.5% 40.8%` | fond du badge statut (à 77–85 %), fond chip statut fiche (à 16 %) | nouveau |
| `lux-alert-soft` | `#FF8A70` | `11 100% 72%` | bordure badge statut, texte « NON DISPONIBLE » sur chip fiche | nouveau |
| `lux-alert-text` | `#FFF1ED` | `13 100% 96.5%` | texte du badge statut (« RÉSERVÉ », « LOUÉ ») | nouveau |

Doublon : `#FF9A80` (1×, texte chip fiche) → `lux-alert-soft`.
Variables du .pen **non utilisées** par les écrans V4 : `lux-alert-deep #8E1608`, `lux-alert-text #FFE4DB` (la maquette utilise `#FFF1ED`, retenu ici). À aligner dans le .pen.

---

## 2. Échelle d'alpha

La spec système impose l'échelle **/8 /12 /16 /20 /25 /30 /40 /50 /65 /85**. Colonne « maquette » = valeur réelle posée, « retenu » = valeur sur l'échelle à coder.

### `lux-gold` en alpha

| Maquette | % | Éléments | Retenu |
|---|---|---|---|
| `#C9A24B14` | 8 | fond bouton « retour en haut » | **/8** |
| `#C9A24B1F` | 12 | fond chips attributs hero, bordure squelette, anneau wave 3 | **/12** |
| `#C9A24B24` | 14 | fond chip nav actif | **/16** |
| `#C9A24B29` | 16 | fond bouton rond dans panneau carte | **/16** |
| `#C9A24B33` | 20 | bordure nav, panneau filtres, footer, cartes Sélection, carte résumé fiche, filets, halo | **/20** |
| `#C9A24B3D` | 24 | bordure chip nav actif | **/25** |
| `#C9A24B4D` | 30 | bordure carte hero, panneau verre carte, badge « 312 biens » | **/30** |
| `#C9A24B59` | 35 | bordure chips attributs, bordure portrait décorateur | **/30** |
| `#C9A24B59` | 35 | couleur de l'ombre du bouton or | **/40** |
| `#C9A24B66` | 40 | bordure tag hero, boutons ronds, prev/next, CTA secondaire, flèche retour | **/40** |
| `#C9A24B80` | 50 | bordure badge statut, filets eyebrow, anneau wave 1 | **/50** |

### `lux-cream` en alpha

| Maquette | % | Éléments | Retenu |
|---|---|---|---|
| `#F2ECE10F` | 6 | fond bouton rond carte indisponible | **/8** |
| `#F2ECE114` | 8 | filets d'en-tête catégorie, bordure bas de footer, icône placeholder squelette, bordure des 3 cartes **indisponibles** sur Home (Properties les laisse à /20 → à unifier) | **/8** |
| `#F2ECE11A` | 10 | bordure carte fiche bien (880×156) | **/12** |
| `#F2ECE11F` | 12 | bordure inputs/selects, vignettes, image 16:9, compteur, flèches, carte agence | **/12** |
| `#F2ECE12E` | 18 | **bordure standard des cartes de biens** (36×), chips fiche, boutons ronds, séparateur | **/20** |
| `#F2ECE13D` | 24 | slash FR / EN | **/25** |

### `lux-ink` en alpha (voiles et verre)

| Maquette | % | Éléments | Retenu |
|---|---|---|---|
| `#0B090880` | 50 | voile de base sur vidéo hero | **/50** |
| `#0B090899` | 60 | badge « 312 biens », tag « Exclusivité » | **/65** |
| `#0B0908A6` | 65 | **nav verre**, badge statut, prev/next, compteur, voile vignette active | **/65** |

### `lux-stone` et alertes en alpha

| Maquette | % | Éléments | Retenu |
|---|---|---|---|
| `#8C867629` | 16 | fond bouton rond carte indisponible | `lux-stone`**/16** |
| `#8C867666` | 40 | bordure panneau + bouton carte indisponible | `lux-stone`**/40** |
| `#FF6A4D33` | 20 | halo pulse derrière le point | `lux-alert`**/20** |
| `#FF6A4DE6` | 90 | couleur de la lueur du point | `lux-alert`**/85** |
| `#C2200E29` | 16 | fond chip « NON DISPONIBLE » (fiche) | `lux-alert-strong`**/16** |
| `#C2200EC4` | 77 | fond badge « RÉSERVÉ / LOUÉ » (cartes) | `lux-alert-strong`**/85** |
| `#FF8A703D` | 24 | bordure chip fiche | `lux-alert-soft`**/25** |
| `#FF8A7073` | 45 | bordure badge cartes | `lux-alert-soft`**/40** |
| `#1C140AD9` / `#141210D9` | 85 | fond panneau verre disponible / indisponible | `lux-surface-3`**/85** / `lux-surface-2`**/85** |
| `#00000066` | 40 | ombre de la nav | `black`**/40** |

### Dégradés (scrims sur images) — tous en `lux-ink`, direction haut → bas

| Nom | Stops | Où |
|---|---|---|
| `scrim-hero-vignette` | ink/0 @25 % → ink/80 @100 % | plein écran hero |
| `scrim-hero-bottom` | ink/0 @55 % → ink/90 @100 % | plein écran hero |
| `scrim-hero-card` | ink/0 @0 → ink/20 @42 % → ink/80 @68 % → ink/98 @100 % | carte hero 656×620 |
| `scrim-card` | ink/0 @20 % → ink/45 @60 % → ink/90 @100 % | carte de bien disponible (Home + Properties, identique) |
| `scrim-card-unavailable` | ink/35 @20 % → ink/65 @60 % → ink/90 @100 % | carte indisponible **Home** |
| *(variante)* | ink/25 @12 % → ink/60 @55 % → ink/95 @100 % | carte indisponible **Properties** → à unifier sur la version Home |

---

## 3. Mapping shadcn (scope `.theme-lux`)

Le thème est posé sur le root du layout `(catalogue)` (`<div className="theme-lux">`). Les composants shadcn (Button, Input, Select, Badge, Card, Dialog…) prennent la palette lux automatiquement ; le back-office garde `:root` / `.dark`.

shadcn ne sait pas lire d'alpha dans `hsl(var(--x))` : les valeurs translucides sont **aplaties sur ink** pour les variables sémantiques. Pour les bordures/fonds posés **sur une photo**, utiliser les primitives avec modificateur (`border-lux-cream/20`), pas `border-border`.

| Variable shadcn | Token source | HSL |
|---|---|---|
| `--background`, `--body` | `lux-ink` | `20 15.8% 3.7%` |
| `--foreground` | `lux-cream` | `39 39.5% 91.6%` |
| `--card` | `lux-surface-1` | `30 21.1% 7.5%` |
| `--card-foreground` | `lux-cream` | `39 39.5% 91.6%` |
| `--popover` | `lux-surface-1` | `30 21.1% 7.5%` |
| `--popover-foreground` | `lux-cream` | `39 39.5% 91.6%` |
| `--primary` | `lux-gold` | `41 53.8% 54.1%` |
| `--primary-foreground` | `lux-ink` (label + icône des CTA or) | `20 15.8% 3.7%` |
| `--secondary` | `lux-surface-2` | `30 11.1% 7.1%` |
| `--secondary-foreground` | `lux-text-soft` | `38 23.5% 80%` |
| `--muted` | `lux-surface-1` | `30 21.1% 7.5%` |
| `--muted-foreground` | `lux-muted` | `39 18.9% 63.7%` |
| `--accent` | gold/16 aplati sur ink `#292113` (chip nav actif, hover menu) | `38 36.7% 11.8%` |
| `--accent-foreground` | `lux-gold-soft` | `41 60.3% 72.4%` |
| `--destructive` | `lux-alert-strong` | `6 86.5% 40.8%` |
| `--destructive-foreground` | `lux-alert-text` | `13 100% 96.5%` |
| `--border` | cream/20 aplati sur ink `#393633` | `30 5.6% 21.2%` |
| `--input` | cream/12 aplati sur surface-1 `#312D28` | `33 10.1% 17.5%` |
| `--ring` | `lux-gold` | `41 53.8% 54.1%` |
| `--radius` | 8 px | `0.5rem` |

Non redéfinis (absents de la V4, héritent du BO) : `--success`, `--warning`, `--sidebar-*`, `--chart-*`.

---

## 4. Rayons

La maquette pose 16 valeurs ; toutes les valeurs ≥ 13 sont des pilules (rayon = hauteur/2). Échelle retenue : **4 rayons**.

| Retenu | Tailwind | Maquette | Éléments |
|---|---|---|---|
| **2 px** | `rounded-xs` (custom) | 2 | tag « Exclusivité » hero (186×32), marqueur carte 8×8 |
| **6 px** | `rounded-md` | 6 | inputs & selects (h 44), bouton « Valider », portraits décorateurs 250×340, vignettes fiche 192×144 |
| **8 px** | `rounded-lg` | 8 | **cartes de biens 313×400**, carte hero 656×620, panneau filtres, cartes sidebar fiche, image 16:9, squelette, chips fiche 96×40 |
| **full** | `rounded-full` | 7 · 13 · 16 · 17 · 20 · 22 · 23 · 26 · 27 · 30 · 37 · 40 · 44 | pulse 14, chip statut fiche 24h, compteur 33h, retour-haut 34, badge statut 27h / chips hero 36h, liens nav 39h / boutons Partager-Sauvegarder 40h, flèches 46, prev/next 52, bouton rond panneau 54, CTA 45–49h, panneau verre 74h, badge « 312 biens » 48h, nav 88h |

`rounded-sm` shadcn (= `--radius` − 4 = 4 px) n'est utilisé nulle part : ne pas s'en servir.

Incohérences à trancher :
- Chips attributs : **Home** « Meublé / Coffre » (36h) = full, **Fiche bien** « Meublé / Pas de coffre » (40h) = 8. Même composant → même rayon (proposition : full, cohérent avec les badges).
- Tag hero rayon 2 vs badges full : c'est le double langage de bouton déjà noté dans « Points ouverts ».

---

## 5. Ombres, lueurs et flous de verre

Seulement **3 ombres** dans toute la V4 (le reste du relief vient des bordures en alpha).

| Token | Valeur CSS | Maquette | Où |
|---|---|---|---|
| `shadow-lux-nav` | `0 14px 40px -10px rgb(0 0 0 / 0.40)` | y 14, blur 40, spread −10, #00000066 | nav verre flottante (4 écrans) |
| `shadow-lux-gold` | `0 8px 26px -4px hsl(var(--lux-gold) / 0.40)` | y 8, blur 26, spread −4, gold/35 | bouton rond « Découvrir » 56×56 du hero |
| `shadow-lux-alert-glow` | `0 0 9px 1px hsl(var(--lux-alert) / 0.85)` | blur 9, spread 1 (Home) / spread 0 (Properties) | point d'état RÉSERVÉ / LOUÉ (6×) |
| `shadow-lux-focus` | `0 0 0 3px hsl(var(--lux-gold) / 0.16)` | absent (spec §6 : halo gold/15) | focus champs & selects, avec bordure gold/50 |

Flous d'arrière-plan (`backdrop-filter`) — 5 valeurs posées, **2 retenues** :

| Token | Retenu | Maquette | Où |
|---|---|---|---|
| `backdrop-blur-lux-sm` | **12 px** | 10 · 12 · 14 | tag hero, badge statut, compteur photos, prev/next, badge « 312 biens » |
| `backdrop-blur-lux-lg` | **20 px** | 18 · 20 | nav verre, panneau verre des cartes |

Recette « verre » : `bg-lux-ink/65 + border-lux-gold/20 + backdrop-blur-lux-lg + shadow-lux-nav` (nav) · `bg-lux-surface-3/85 + border-lux-gold/30 + backdrop-blur-lux-lg` (panneau carte).

---

## 6. Code à coller

### `src/app/globals.css` — dans `@layer base`, après `.dark { … }`

```css
.theme-lux {
    /* primitives */
    --lux-ink: 20 15.8% 3.7%;
    --lux-ink-deep: 20 12% 4.9%;
    --lux-surface-1: 30 21.1% 7.5%;
    --lux-surface-2: 30 11.1% 7.1%;
    --lux-surface-3: 33 47.4% 7.5%;
    --lux-gold: 41 53.8% 54.1%;
    --lux-gold-soft: 41 60.3% 72.4%;
    --lux-cream: 39 39.5% 91.6%;
    --lux-text-soft: 38 23.5% 80%;
    --lux-text-nav: 39 19.5% 70.8%;
    --lux-muted: 39 18.9% 63.7%;
    --lux-text-dim: 39 11.4% 50%;
    --lux-text-disabled: 38 12.8% 38.2%;
    --lux-stone: 44 8.7% 50.6%;
    --lux-alert: 10 100% 65.1%;
    --lux-alert-strong: 6 86.5% 40.8%;
    --lux-alert-soft: 11 100% 72%;
    --lux-alert-text: 13 100% 96.5%;

    /* shadcn sémantique */
    --body: var(--lux-ink);
    --background: var(--lux-ink);
    --foreground: var(--lux-cream);
    --card: var(--lux-surface-1);
    --card-foreground: var(--lux-cream);
    --popover: var(--lux-surface-1);
    --popover-foreground: var(--lux-cream);
    --primary: var(--lux-gold);
    --primary-foreground: var(--lux-ink);
    --secondary: var(--lux-surface-2);
    --secondary-foreground: var(--lux-text-soft);
    --muted: var(--lux-surface-1);
    --muted-foreground: var(--lux-muted);
    --accent: 38 36.7% 11.8%;
    --accent-foreground: var(--lux-gold-soft);
    --destructive: var(--lux-alert-strong);
    --destructive-foreground: var(--lux-alert-text);
    --border: 30 5.6% 21.2%;
    --input: 33 10.1% 17.5%;
    --ring: var(--lux-gold);
    --radius: 0.5rem;

    color-scheme: dark;
}
```

### `tailwind.config.ts` — à fusionner dans `theme.extend`

```ts
colors: {
    lux: {
        ink: { DEFAULT: "hsl(var(--lux-ink) / <alpha-value>)", deep: "hsl(var(--lux-ink-deep) / <alpha-value>)" },
        surface: {
            1: "hsl(var(--lux-surface-1) / <alpha-value>)",
            2: "hsl(var(--lux-surface-2) / <alpha-value>)",
            3: "hsl(var(--lux-surface-3) / <alpha-value>)",
        },
        gold: { DEFAULT: "hsl(var(--lux-gold) / <alpha-value>)", soft: "hsl(var(--lux-gold-soft) / <alpha-value>)" },
        cream: "hsl(var(--lux-cream) / <alpha-value>)",
        text: {
            soft: "hsl(var(--lux-text-soft) / <alpha-value>)",
            nav: "hsl(var(--lux-text-nav) / <alpha-value>)",
            dim: "hsl(var(--lux-text-dim) / <alpha-value>)",
            disabled: "hsl(var(--lux-text-disabled) / <alpha-value>)",
        },
        muted: "hsl(var(--lux-muted) / <alpha-value>)",
        stone: "hsl(var(--lux-stone) / <alpha-value>)",
        alert: {
            DEFAULT: "hsl(var(--lux-alert) / <alpha-value>)",
            strong: "hsl(var(--lux-alert-strong) / <alpha-value>)",
            soft: "hsl(var(--lux-alert-soft) / <alpha-value>)",
            text: "hsl(var(--lux-alert-text) / <alpha-value>)",
        },
    },
},
borderRadius: {
    xs: "2px",
    // lg / md / sm existants inchangés (8 / 6 / 4 px avec --radius: 0.5rem)
},
boxShadow: {
    "lux-nav": "0 14px 40px -10px rgb(0 0 0 / 0.40)",
    "lux-gold": "0 8px 26px -4px hsl(var(--lux-gold) / 0.40)",
    "lux-alert-glow": "0 0 9px 1px hsl(var(--lux-alert) / 0.85)",
    "lux-focus": "0 0 0 3px hsl(var(--lux-gold) / 0.16)",
},
backdropBlur: {
    "lux-sm": "12px",
    "lux-lg": "20px",
},
backgroundImage: {
    "scrim-card": "linear-gradient(to bottom, hsl(var(--lux-ink) / 0) 20%, hsl(var(--lux-ink) / 0.45) 60%, hsl(var(--lux-ink) / 0.90) 100%)",
    "scrim-card-unavailable": "linear-gradient(to bottom, hsl(var(--lux-ink) / 0.35) 20%, hsl(var(--lux-ink) / 0.65) 60%, hsl(var(--lux-ink) / 0.90) 100%)",
    "scrim-hero-card": "linear-gradient(to bottom, hsl(var(--lux-ink) / 0) 0%, hsl(var(--lux-ink) / 0.20) 42%, hsl(var(--lux-ink) / 0.80) 68%, hsl(var(--lux-ink) / 0.98) 100%)",
    "scrim-hero-vignette": "linear-gradient(to bottom, hsl(var(--lux-ink) / 0) 25%, hsl(var(--lux-ink) / 0.80) 100%)",
    "scrim-hero-bottom": "linear-gradient(to bottom, hsl(var(--lux-ink) / 0) 55%, hsl(var(--lux-ink) / 0.90) 100%)",
},
```

Exemples d'utilisation :

```tsx
// carte de bien
<article className="rounded-lg border border-lux-cream/20 bg-lux-surface-1 ...">
// badge statut sur photo
<span className="rounded-full bg-lux-ink/65 border border-lux-gold/50 backdrop-blur-lux-sm text-lux-cream">
// badge RÉSERVÉ
<span className="rounded-full bg-lux-alert-strong/85 border border-lux-alert-soft/40 text-lux-alert-text backdrop-blur-lux-sm">
// input (via shadcn Input, hérite --input/--ring) + focus custom
<Input className="rounded-md bg-lux-surface-1 focus-visible:border-lux-gold/50 focus-visible:shadow-lux-focus" />
// CTA or (via shadcn Button variant="default", hérite --primary)
<Button className="rounded-full">Découvrir</Button>
```

---

## 7. À faire dans le .pen pour aligner la maquette

1. Créer les variables manquantes : `surface-3`, `text-disabled`, `stone`, `alert-strong`, `alert-soft` ; corriger `lux-alert-text` → `#FFF1ED`.
2. Remplacer les 8 hex doublons listés en §1 par leurs variables.
3. Arrondir les 30 alphas posés à la main sur l'échelle (§2).
4. Trancher le rayon des chips attributs (full vs 8) et unifier le scrim « indisponible » (§2, §4).
