# 📁 My Portfolio - Documentation

> Portfolio personnel de **Tchandikou U. Shalom** avec une interface style macOS/Desktop

---

## 🎯 Vue d'ensemble

Ce projet est un portfolio créatif qui reproduit l'interface d'un bureau macOS. L'utilisateur peut interagir avec des éléments de bureau comme des dossiers, une barre de navigation et un dock animé.

---

## 📦 Stack Technique

| Technologie | Version | Description |
|-------------|---------|-------------|
| **Next.js** | 16.0.7 | Framework React avec App Router |
| **React** | 19.2.0 | Bibliothèque UI |
| **TypeScript** | ^5 | Typage statique |
| **Tailwind CSS** | v4 | Framework CSS utility-first |
| **Motion** | 12.23.25 | Animations (Framer Motion) |
| **Radix UI** | - | Composants accessibles (Tooltip, Slot) |
| **Lucide React** | 0.555.0 | Icônes |
| **React Icons** | 5.5.0 | Collection d'icônes |

### Gestionnaire de paquets
- **pnpm**

---

## 📁 Structure du Projet

```
my-portfolio/
├── public/
│   └── assets/              # Images de fond d'écran
│       ├── bg-1.jpg
│       ├── bg-3.jpg         # Fond actuel
│       ├── bg.jpg
│       ├── macos-bg.jpg
│       ├── macos-bg-2.png
│       ├── space.jpg
│       └── word.jpg
│
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   └── page.tsx     # Page d'accueil
│   │   ├── globals.css      # Styles globaux + variables CSS
│   │   └── layout.tsx       # Layout principal
│   │
│   ├── components/
│   │   ├── desktop/         # Composants de l'interface desktop
│   │   │   ├── top-bar.tsx      # Barre supérieure (batterie, wifi, heure)
│   │   │   ├── bottom-bar.tsx   # Barre inférieure avec dock
│   │   │   ├── custom-dock.tsx  # Dock avec liens sociaux
│   │   │   ├── desktop-grid.tsx # Grille du bureau avec gestion des positions
│   │   │   ├── draggable-item.tsx # Wrapper pour éléments drag and drop
│   │   │   ├── folder.tsx       # Composant dossier (avec nom personnalisable)
│   │   │   └── files/
│   │   │       └── file-pdf.tsx # Composant fichier PDF (à développer)
│   │   │
│   │   ├── shared/          # Composants partagés
│   │   │   └── custom-tooltip.tsx
│   │   │
│   │   └── ui/              # Composants UI réutilisables
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── dock.tsx     # Dock animé avec magnification
│   │       └── tooltip.tsx
│   │
│   └── lib/
│       └── utils.ts         # Utilitaire cn() pour classes CSS
│
├── docs/                    # Documentation
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── components.json          # Config shadcn/ui
```

---

## 🖥️ Interface Utilisateur

### 1. TopBar (Barre supérieure)
- Indicateur de batterie (75%)
- Icône WiFi
- Bouton de recherche
- Date et heure en temps réel

### 2. Zone Principale (Desktop)
- **Grille de positionnement** : Système de grille pour organiser les éléments
- **Drag and Drop** : Les dossiers et fichiers peuvent être déplacés librement
- Dossiers actuels :
  - 📁 Projets
  - 📁 À propos
  - 📁 Compétences
  - 📁 Contact
- Effet hover avec fond semi-transparent
- Snap automatique sur la grille après un drag

### 3. BottomBar / Dock
Dock animé style macOS avec effet de **magnification** au survol :
- 🔗 **GitHub** - Lien vers le profil GitHub
- 📧 **Gmail** - Contact par email
- 💬 **WhatsApp** - Contact WhatsApp

---

## 🎨 Design System

### Thème
Le projet supporte les thèmes **clair** et **sombre** via des variables CSS (oklch).

### Effets visuels
- **Glassmorphism** : `backdrop-blur` + transparence
- **Animations** : Motion pour le dock avec effet de magnification
- **Drag and Drop** : Animations fluides avec spring physics
- **Transitions** : Effets hover fluides

### Polices
- **Inter** (Google Fonts) - Police principale

---

## 🚀 Commandes

```bash
# Installation des dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Build de production
pnpm build

# Lancer en production
pnpm start

# Linter
pnpm lint
```

---

## 📝 TODO / Améliorations futures

- [x] Système de grille pour le bureau
- [x] Drag and drop des dossiers/fichiers
- [x] Rendre les dossiers cliquables avec ouverture de fenêtres modales
- [x] Ajouter le contenu dans chaque dossier (Projets, À propos, etc.)
- [x] Implémenter le composant `file-pdf.tsx` pour afficher un CV PDF
- [x] Ajouter plus d'applications dans le dock
- [x] Système de fenêtres draggables et redimensionnables
- [x] Menu contextuel (clic droit)
- [x] Animations de démarrage
- [x] Persistance des positions des éléments (localStorage)
- [x] Support mobile / responsive

---

## 🧩 Composants Clés

### DesktopGrid
Composant qui crée une grille invisible sur le bureau pour gérer le positionnement des éléments.

**Props :**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | number | 6 | Nombre de lignes |
| `cols` | number | 10 | Nombre de colonnes |
| `cellSize` | number | 100 | Taille d'une cellule en pixels |
| `gap` | number | 8 | Espacement entre les cellules |
| `initialItems` | DesktopItem[] | [] | Items initiaux |

### DraggableItem
Wrapper qui rend n'importe quel élément enfant draggable sur la grille.

**Props :**
| Prop | Type | Description |
|------|------|-------------|
| `id` | string | Identifiant unique de l'élément |
| `initialPosition` | GridPosition | Position initiale {row, col} |
| `onDoubleClick` | () => void | Callback au double-clic |

**Utilisation :**
```tsx
<DesktopGrid rows={6} cols={12} cellSize={90} gap={8}>
  <DraggableItem id="folder-1" initialPosition={{ row: 0, col: 0 }}>
    <Folder name="Mon Dossier" />
  </DraggableItem>
</DesktopGrid>
```

---

## 👤 Auteur

**CianusDev**
