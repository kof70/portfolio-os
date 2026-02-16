// Réutilise la même image que l'OpenGraph.
// Next.js 16 n'accepte pas la réexport de `runtime` depuis un autre fichier.
export const runtime = "edge";
export { default, alt, size, contentType } from "./opengraph-image";
