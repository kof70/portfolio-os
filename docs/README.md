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
│   │   │   ├── wallpaper-picker.tsx # Sélecteur de fond d'écran
│   │   │   ├── context-menu/    # Menu contextuel (clic droit)
│   │   │   │   ├── index.ts
│   │   │   │   ├── context-menu.tsx
│   │   │   │   └── context-menu-context.tsx
│   │   │   └── files/
│   │   │       └── file-pdf.tsx # Composant fichier PDF
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
│   ├── hooks/
│   │   ├── use-mobile.tsx   # Hook de détection mobile (3 breakpoints)
│   │   ├── use-long-press.tsx # Hook pour long-press tactile
│   │   └── use-desktop-storage-context.tsx # Hook de persistance localStorage
│   │
│   └── lib/
│       ├── utils.ts         # Utilitaire cn() pour classes CSS
│       ├── data.ts          # Données personnelles et projets
│       └── animations.ts    # Utilitaires d'animation
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
- **Persistance** : Les positions sont sauvegardées dans localStorage
- **Menu contextuel** : Clic droit pour accéder aux options
- Dossiers actuels :
  - 📁 Projets
  - 📁 À propos
  - 📁 Contact
  - 📄 Mon CV (PDF)
- Effet hover avec fond semi-transparent
- Snap automatique sur la grille après un drag

### 3. Menu Contextuel (Clic droit)
Options selon le contexte :
- **Sur le bureau** :
  - Actualiser
  - Changer le fond d'écran
  - Réinitialiser les positions
  - Paramètres (désactivé)
- **Sur un dossier** :
  - Ouvrir
  - Obtenir des informations
  - Dupliquer (désactivé)
  - Mettre à la corbeille (désactivé)
- **Sur un fichier** :
  - Ouvrir
  - Télécharger
  - Obtenir des informations
  - Mettre à la corbeille (désactivé)

### 4. Sélecteur de Fond d'écran
- Interface modale avec grille de wallpapers
- Prévisualisation des fonds d'écran disponibles
- Sélection persistée dans localStorage

### 5. BottomBar / Dock
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
- **Menu contextuel** : Animations d'apparition/disparition
- **Wallpaper picker** : Transitions et prévisualisations animées

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

- [x] ~~Système de grille pour le bureau~~
- [x] ~~Drag and drop des dossiers/fichiers~~
- [x] Rendre les dossiers cliquables avec ouverture de fenêtres modales
- [x] Ajouter le contenu dans chaque dossier (Projets, À propos, etc.)
- [x] Implémenter le composant `file-pdf.tsx` pour afficher un CV PDF
- [x] Ajouter plus d'applications dans le dock
- [x] Système de fenêtres draggables et redimensionnables
- [x] Menu contextuel (clic droit)
- [x] Animations de démarrage
- [x] Persistance des positions des éléments (localStorage)
- [x] Support mobile / responsive complet
  - [x] Fenêtres fullscreen sur mobile avec navigation iOS-style
  - [x] Long-press pour menu contextuel sur tactile
  - [x] TopBar style iOS avec indicateurs de statut
  - [x] Dock mobile optimisé
  - [x] Layout adaptatif (Bento en haut, grille en bas)
  - [x] Safe areas pour iPhone (notch/home indicator)
- [ ] Mode sombre / clair
- [ ] Plus de personnalisations utilisateur

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

## 🆕 Nouvelles Fonctionnalités (v2.0)

### ContextMenu
Système de menu contextuel complet avec :
- Provider React pour gérer l'état global
- Détection du contexte (desktop, folder, file)
- Fermeture automatique au clic extérieur ou Escape
- Style macOS avec backdrop blur

**Fichiers :**
- `src/components/desktop/context-menu/context-menu-context.tsx`
- `src/components/desktop/context-menu/context-menu.tsx`

### DesktopStorageProvider
Système de persistance localStorage avec :
- Sauvegarde des positions des éléments
- Gestion du fond d'écran personnalisé
- Import/Export de configuration
- Reset des positions

**Fichier :** `src/hooks/use-desktop-storage-context.tsx`

### WallpaperPicker
Sélecteur de fond d'écran avec :
- Grille de prévisualisations
- Sélection visuelle avec check mark
- Persistance du choix
- Animations fluides

**Fichier :** `src/components/desktop/wallpaper-picker.tsx`

### Support Mobile Complet

#### Fenêtres Fullscreen
Sur mobile, les fenêtres s'ouvrent automatiquement en plein écran avec :
- Barre de titre style iOS avec bouton "Retour"
- Animation slide-up à l'ouverture/fermeture
- Pas de drag/resize (inutile sur mobile)

#### Long Press pour Menu Contextuel
Remplacement du clic droit par un appui long (500ms) :
- Vibration tactile au déclenchement
- Annulation si mouvement > 10px
- Support complet des événements touch

**Fichier :** `src/hooks/use-long-press.tsx`

#### TopBar Mobile (iOS Style)
Barre de statut inspirée d'iOS :
- Heure centrée
- Icônes signal, WiFi, batterie
- Design transparent avec texte blanc

#### Layout Mobile Optimisé
- Bento grid en haut de l'écran
- Desktop grid en dessous
- Grille 2x4 colonnes adaptée au mobile
- Cellules de 85px avec espacement réduit

#### Safe Areas iOS
Support complet des safe areas pour :
- Notch des iPhones récents
- Home indicator en bas d'écran
- Classes CSS utilitaires (pt-safe, pb-safe, etc.)

---

## 👤 Auteur

**Tchandikou U. Shalom**

---

## 📄 Licence

Ce projet est privé.
