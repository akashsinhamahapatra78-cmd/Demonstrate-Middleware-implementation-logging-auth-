# 3D/AR Product Viewer

## Project Overview
This project is an interactive 3D/AR product viewer application that allows users to visualize products in three-dimensional space and augmented reality. The viewer provides an immersive shopping experience with real-time model manipulation, AR integration, and product information display.

## Features

### Core Features
- **3D Model Visualization**: Display interactive 3D product models with real-time rendering
- **360° Product Rotation**: Full 360-degree view of products with smooth rotation controls
- **Zoom & Pan Controls**: Interactive zoom in/out and pan functionality
- **AR Integration**: View products in augmented reality using device camera
- **Product Information Display**: Show specs, pricing, and details alongside 3D view
- **Model Switching**: Quick switching between different product variants

### Additional Features
- **Lighting & Material Control**: Adjust lighting and material properties for better visualization
- **Product Comparison**: Side-by-side 3D comparison of different products
- **Screenshot Capture**: Save product view screenshots
- **Animation Playback**: Play preset animations showcasing product features
- **Color Variants**: Interactive color selection with real-time model update

## Technology Stack

### Frontend
- **Three.js**: 3D graphics library for WebGL rendering
- **Babylon.js**: Alternative 3D engine (optional)
- **React/Vue/Angular**: Frontend framework for UI components
- **A-Frame**: WebXR framework for AR/VR capabilities
- **WebAR**: Browser-based AR implementation
- **Tailwind CSS**: UI styling

### Backend
- **Node.js/Express**: Server for model hosting and API
- **Three.js Viewer**: Model optimization and loading
- **Image optimization**: For texture and material assets

### 3D Assets
- **glTF/GLB Format**: Optimized 3D model format
- **USDZ**: For iOS AR support
- **Blender**: 3D modeling software for asset creation

## Project Structure

```
3d-ar-product-viewer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Viewer3D.jsx
│   │   │   ├── ARViewer.jsx
│   │   │   ├── ProductInfo.jsx
│   │   │   ├── Controls.jsx
│   │   │   └── LightingPanel.jsx
│   │   ├── services/
│   │   │   ├── modelLoader.js
│   │   │   ├── arHandler.js
│   │   │   └── cameraControls.js
│   │   ├── assets/
│   │   │   ├── models/
│   │   │   └── textures/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/
│   ├── routes/
│   │   ├── models.js
│   │   └── products.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── README.md
├── assets/
│   ├── models/
│   │   └── sample-product.glb
│   ├── textures/
│   └── README.md
├── docs/
│   ├── SETUP.md
│   ├── AR_IMPLEMENTATION.md
│   ├── 3D_OPTIMIZATION.md
│   └── API.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- A modern browser with WebGL support
- For AR: Mobile device with ARCore (Android) or ARKit (iOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akashsinhamahapatra78-cmd/Demonstrate-Middleware-implementation-logging-auth-.git
   cd 3d-ar-product-viewer
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

**Start Backend Server**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Start Frontend (in new terminal)**
```bash
cd frontend
npm start
# Application runs on http://localhost:3000
```

## Usage Guide

### 3D Viewer Controls
- **Mouse/Touch Drag**: Rotate model
- **Scroll/Pinch**: Zoom in/out
- **Right-click Drag/Two-finger Drag**: Pan
- **Double-click**: Reset view

### AR Mode
- Click "AR View" button to enter augmented reality mode
- Position model in your environment
- Use on-screen controls to scale and rotate
- Tap to place, rotate, and scale the product in real world

### Product Selection
- Browse products from dropdown menu
- Switch color variants with color picker
- View product details and specifications
- Compare with other products

## 3D Model Requirements

### Supported Formats
- **glTF/GLB**: Recommended (compressed, web-optimized)
- **USDZ**: For iOS AR support
- **OBJ + MTL**: Legacy support

### Model Specifications
- Polygon count: < 100k for smooth performance
- Texture resolution: 2K (2048x2048) or optimized
- File size: < 5MB for optimal loading
- Baked textures recommended for better performance

## AR Implementation

### WebAR Approach
- Uses WebARonXR polyfill and THREE.js
- Cross-platform support for iOS and Android
- No app installation required

### Native Approach (Alternative)
- React Native + Expo for mobile apps
- Native AR frameworks (ARKit, ARCore)
- Better performance on mobile devices

## Performance Optimization

- **Model Compression**: Use glTF with compression
- **Texture Optimization**: Use compressed textures (WebP, KTX2)
- **LOD (Level of Detail)**: Multiple model versions for different devices
- **Lazy Loading**: Load models on demand
- **Caching**: Browser cache and service workers
- **CDN Delivery**: Serve assets from CDN

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/:id/model` - Get 3D model

### Models
- `GET /api/models/:modelId` - Get 3D model metadata
- `GET /api/models/:modelId/download` - Download model file

## Browser Compatibility

| Browser | 3D Support | AR Support |
|---------|-----------|------------|
| Chrome  | ✅        | ✅         |
| Firefox | ✅        | ⚠️ (limited)|
| Safari  | ✅        | ✅         |
| Edge    | ✅        | ✅         |

## Troubleshooting

### Common Issues

1. **Model not loading**
   - Check model file path
   - Verify CORS headers on backend
   - Check browser console for errors

2. **AR not working**
   - Ensure device has AR capability
   - Check camera permissions
   - Try different browser/device

3. **Performance issues**
   - Reduce model polygon count
   - Optimize textures
   - Enable LOD switching

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Real-time collaboration (multiple users viewing same model)
- [ ] Advanced physics simulation
- [ ] AI-powered product recommendations
- [ ] Voice controls
- [ ] 360° product photography integration
- [ ] Desktop app versions (Electron)
- [ ] VR headset support (Meta Quest, HTC Vive)
- [ ] Advanced material editors
- [ ] Real-time lighting from environment
- [ ] Product customization preview

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact & Support

- **GitHub Issues**: Report bugs and request features
- **Email**: akashsinhamahapatra78@gmail.com
- **Project Owner**: Akash Sinha Mahapatra

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [WebAR Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [glTF Format Specification](https://www.khronos.org/gltf/)
- [AR Quick Look (iOS)](https://developer.apple.com/arkit/quick-look/)
- [Google AR Core](https://developers.google.com/ar)
