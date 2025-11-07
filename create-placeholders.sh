#!/bin/bash

# Script to create placeholder SVG images
cd "$(dirname "$0")"

# Create assets/img directory
mkdir -p assets/img

# Array of placeholders
declare -a placeholders=(
  "hero1.jpg:Hero 1 - Vista al mar"
  "hero2.jpg:Hero 2 - Atardecer"
  "hero3.jpg:Hero 3 - Terraza"
  "locacion-module.jpg:Locación"
  "amenidades.jpg:Amenidades"
  "alrededores.jpg:Alrededores"
  "footer-locacion.jpg:Footer - Locación"
  "matrimonial-cover.jpg:Matrimonial Cover"
  "matrimonial1.jpg:Matrimonial 1"
  "matrimonial2.jpg:Matrimonial 2"
  "doble-cover.jpg:Doble Cover"
  "doble1.jpg:Doble 1"
  "doble2.jpg:Doble 2"
)

# Create each placeholder
for item in "${placeholders[@]}"; do
  filename="${item%%:*}"
  text="${item#*:}"
  filepath="assets/img/$filename"
  
  if [ ! -f "$filepath" ]; then
    cat > "$filepath" << EOF
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="#e5e7eb"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">Placeholder: $text</text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="20" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">$filename</text>
</svg>
EOF
    echo "⚠️  WARN Missing image -> created placeholder at: $filepath"
  else
    echo "✓ Image exists: $filepath"
  fi
done

echo "✅ Placeholder generation complete"
