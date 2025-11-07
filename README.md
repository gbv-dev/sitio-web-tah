# 🏨 Alojamiento Site - Andes Suite

Sitio web estático de dos páginas (landing) para alojamiento turístico, construido con HTML, Tailwind CSS CDN y JavaScript vanilla.

## 📁 Estructura del Proyecto

```
alojamiento-site/
├── index.html              # Página principal
├── piezas.html             # Página de habitaciones
├── /assets/
│   ├── /css/
│   │   └── styles.css      # Estilos personalizados
│   ├── /js/
│   │   ├── main.js         # JavaScript principal
│   │   ├── header-footer.js # Inyección de header/footer
│   │   └── slider.js       # Carrusel de imágenes
│   └── /img/               # Imágenes del sitio
├── /partials/
│   ├── header.html         # Header reutilizable
│   └── footer.html         # Footer reutilizable
├── /data/
│   └── site.json           # ⭐ Configuración principal del sitio
├── favicon.ico             # Ícono del sitio
├── robots.txt              # Configuración para motores de búsqueda
├── sitemap.xml             # Mapa del sitio
└── README.md               # Este archivo
```

## 🚀 Inicio Rápido

### 1. Servidor Local

Para visualizar el sitio, necesitas un servidor web local. Las opciones más simples son:

#### Opción A: Live Server (VSCode)
1. Instala la extensión **Live Server** en Visual Studio Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"
4. El sitio se abrirá en `http://localhost:5500` (o puerto similar)

#### Opción B: Python
```bash
# Python 3
cd alojamiento-site
python3 -m http.server 8000
# Abrir http://localhost:8000
```

#### Opción C: Node.js
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar
cd alojamiento-site
http-server
# Abrir http://localhost:8080
```

### 2. Navegación

- **Inicio**: `index.html` - Página principal con carrusel y módulos informativos
- **Piezas**: `piezas.html` - Galería de habitaciones con lightbox

## ⚙️ Configuración del Sitio

### Editar Contenido: `data/site.json`

Todo el contenido del sitio se gestiona desde **`data/site.json`**. Aquí puedes cambiar:

#### 📌 Información de la Marca
```json
{
  "brand": "Andes Suite",
  "contact": {
    "address": "Ebro 2799, Las Condes. Santiago de Chile",
    "email": "andessuite@andessuite.cl",
    "phone": "+562 22320627",
    "bookingLink": "mailto:andessuite@andessuite.cl"
  }
}
```

#### 🖼️ Imágenes del Banner (Hero Slider)

Las imágenes del carrusel principal se definen en el array `heroSlides`. **El orden importa**:

```json
{
  "heroSlides": [
    { "src": "assets/img/hero1.jpg", "alt": "Vista al mar" },
    { "src": "assets/img/hero2.jpg", "alt": "Atardecer en la costa" },
    { "src": "assets/img/hero3.jpg", "alt": "Terraza con áreas verdes" }
  ]
}
```

**Para agregar o cambiar imágenes:**
1. Coloca las imágenes en `assets/img/`
2. Actualiza las rutas en `heroSlides`
3. Asegúrate de incluir un `alt` descriptivo para accesibilidad

#### 📍 Módulos Informativos (Locación, Amenidades, Alrededores)

Cada módulo tiene su imagen y texto asociado:

```json
{
  "sections": {
    "location": {
      "title": "Locación",
      "text": "A pasos de la playa...",
      "image": "assets/img/locacion-module.jpg",
      "alt": "Mapa / entorno del alojamiento"
    },
    "amenities": {
      "title": "Amenidades",
      "text": "Wi-Fi rápido...",
      "image": "assets/img/amenidades.jpg",
      "alt": "Amenidades del alojamiento"
    },
    "around": {
      "title": "Alrededores",
      "text": "Restaurantes, cafés...",
      "image": "assets/img/alrededores.jpg",
      "alt": "Atractivos cercanos"
    }
  }
}
```

#### 🏠 Habitaciones (Rooms)

Cada habitación incluye:
- **cover**: Imagen principal de la tarjeta
- **gallery**: Array de imágenes para el lightbox
- **features**: Lista de características
- **price**: Precio desde

```json
{
  "rooms": [
    {
      "name": "Pieza Matrimonial Vista Mar",
      "shortDescription": "Amplia, luminosa y con balcón.",
      "features": ["Baño privado", "Smart TV", "Calefacción"],
      "capacity": 2,
      "bedSetup": "1 cama king",
      "priceFrom": "$75.000 / noche",
      "cta": "mailto:reservas@costaazul.cl",
      "cover": {
        "src": "assets/img/matrimonial-cover.jpg",
        "alt": "Pieza matrimonial con vista al mar"
      },
      "gallery": [
        { "src": "assets/img/matrimonial1.jpg", "alt": "Dormitorio 1" },
        { "src": "assets/img/matrimonial2.jpg", "alt": "Dormitorio 2" }
      ]
    }
  ]
}
```

#### 🖼️ Imagen del Footer

```json
{
  "footer": {
    "locationImage": {
      "src": "assets/img/footer-locacion.jpg",
      "alt": "Foto de la locación en el footer"
    }
  }
}
```

### 🎨 Reemplazar Imágenes Placeholder

El sitio viene con placeholders SVG. Para usar imágenes reales:

1. **Coloca tus imágenes** en `assets/img/` (formato JPG, PNG o WebP)
2. **Actualiza `data/site.json`** con las rutas correctas
3. **Recarga el navegador**

Si una imagen no existe, el sitio:
- Mostrará el placeholder
- Registrará un aviso en la consola del navegador: `⚠️ WARN Missing image -> using placeholder at: <ruta>`

### 🔍 Verificar Imágenes Faltantes

Abre la **Consola del Navegador** (F12 → Console) para ver qué imágenes faltan.

## 🎯 Características del Sitio

### ✨ Funcionalidades

- ✅ **Carrusel automático**: Avanza cada 5 segundos
- ✅ **Navegación por teclado**: Flechas izquierda/derecha
- ✅ **Soporte táctil**: Swipe en móviles
- ✅ **Lightbox**: Galería de imágenes en habitaciones
- ✅ **Responsive**: Diseño adaptable a móviles y tablets
- ✅ **Menú móvil**: Hamburger menu con animación
- ✅ **Scroll suave**: Navegación fluida a secciones
- ✅ **Accesibilidad**: ARIA labels, focus visible, contraste

### 📱 Responsive Design

El sitio utiliza Tailwind CSS con breakpoints estándar:
- `sm`: ≥640px
- `md`: ≥768px
- `lg`: ≥1024px
- `xl`: ≥1280px

## 🛠️ Personalización Avanzada

### Colores

Los colores principales están definidos con clases de Tailwind:
- **Primario**: `bg-blue-600`, `text-blue-600` (azul)
- **Gris**: `bg-gray-900`, `text-gray-600`

Para cambiar el esquema de colores, edita las clases en los archivos HTML o en `assets/css/styles.css`.

### Tipografía

El sitio usa la fuente del sistema por defecto de Tailwind. Para cambiar:

```html
<!-- En <head> de index.html y piezas.html -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
        }
      }
    }
  }
</script>
```

### JavaScript Personalizado

- **`main.js`**: Lógica general (scroll suave, lazy loading)
- **`header-footer.js`**: Inyección de partials y población de datos
- **`slider.js`**: Carrusel del hero

## 🔒 SEO y Accesibilidad

### SEO

- ✅ Meta tags (title, description) por página
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Alt text en todas las imágenes
- ✅ URLs semánticas

### Accesibilidad (WCAG 2.1)

- ✅ ARIA labels en carrusel e indicadores
- ✅ Navegación por teclado
- ✅ Focus visible en elementos interactivos
- ✅ Contraste de colores adecuado
- ✅ Skip to content link

## 📊 Rendimiento

- ✅ **Tailwind CDN**: Carga rápida sin build process
- ✅ **Lazy loading**: Imágenes cargadas bajo demanda
- ✅ **Sin dependencias**: JavaScript vanilla puro
- ✅ **Optimizado**: Código minimalista

## 🐛 Solución de Problemas

### Las imágenes no se muestran
1. Verifica que las rutas en `data/site.json` sean correctas
2. Revisa la consola del navegador para ver errores
3. Asegúrate de usar un servidor web (no abrir archivos directamente)

### El carrusel no funciona
1. Verifica que `assets/js/slider.js` esté cargado
2. Revisa la consola para errores de JavaScript
3. Asegúrate de que `data/site.json` tenga al menos una imagen en `heroSlides`

### El header/footer no aparecen
1. Verifica que estés usando un servidor web local
2. Los archivos en `partials/` solo se cargan vía fetch (requieren servidor)

### Estilos no se aplican
1. Verifica la conexión a internet (Tailwind CDN requiere internet)
2. Revisa que `assets/css/styles.css` esté cargado

## 📝 Mantenimiento

### Actualizar Contenido
1. Edita `data/site.json`
2. Recarga el navegador
3. Verifica cambios

### Agregar Nueva Habitación
1. Añade un nuevo objeto al array `rooms` en `data/site.json`
2. Incluye cover y gallery con las rutas correctas
3. El sitio la mostrará automáticamente

### Cambiar Información de Contacto
1. Edita la sección `contact` en `data/site.json`
2. Los cambios se reflejan en header y footer automáticamente

## 🌐 Despliegue

Para publicar el sitio:

1. **Opción 1: GitHub Pages**
   - Sube el directorio `alojamiento-site/` a un repositorio
   - Activa GitHub Pages en Settings

2. **Opción 2: Netlify**
   - Arrastra la carpeta `alojamiento-site/` a Netlify Drop

3. **Opción 3: Hosting tradicional**
   - Sube vía FTP todos los archivos
   - Asegúrate de mantener la estructura de carpetas

## 📞 Soporte

Para dudas o problemas:
- Revisa la consola del navegador (F12)
- Verifica que todas las rutas en `site.json` sean correctas
- Asegúrate de usar un servidor web local

## 📄 Licencia

Este proyecto es un sitio estático personalizado para alojamiento turístico.

---

**Hecho con ❤️ usando HTML, Tailwind CSS y JavaScript Vanilla**
