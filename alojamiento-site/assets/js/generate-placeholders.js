// Script to generate placeholder images
const fs = require('fs');
const path = require('path');

const placeholders = [
  { path: 'assets/img/hero1.jpg', text: 'Hero 1 - Vista al mar' },
  { path: 'assets/img/hero2.jpg', text: 'Hero 2 - Atardecer' },
  { path: 'assets/img/hero3.jpg', text: 'Hero 3 - Terraza' },
  { path: 'assets/img/locacion-module.jpg', text: 'Locación' },
  { path: 'assets/img/amenidades.jpg', text: 'Amenidades' },
  { path: 'assets/img/alrededores.jpg', text: 'Alrededores' },
  { path: 'assets/img/footer-locacion.jpg', text: 'Footer - Locación' },
  { path: 'assets/img/matrimonial-cover.jpg', text: 'Matrimonial Cover' },
  { path: 'assets/img/matrimonial1.jpg', text: 'Matrimonial 1' },
  { path: 'assets/img/matrimonial2.jpg', text: 'Matrimonial 2' },
  { path: 'assets/img/doble-cover.jpg', text: 'Doble Cover' },
  { path: 'assets/img/doble1.jpg', text: 'Doble 1' },
  { path: 'assets/img/doble2.jpg', text: 'Doble 2' }
];

placeholders.forEach(placeholder => {
  const fullPath = path.join(__dirname, '../../', placeholder.path);
  
  if (!fs.existsSync(fullPath)) {
    const svg = `<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="#e5e7eb"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">
    Placeholder: ${placeholder.text}
  </text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="20" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
    ${path.basename(placeholder.path)}
  </text>
</svg>`;
    
    // Ensure directory exists
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, svg);
    console.warn(`⚠️  WARN Missing image -> created placeholder at: ${placeholder.path}`);
  }
});

console.log('✅ Placeholder generation complete');
