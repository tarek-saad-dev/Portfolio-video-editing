# Organization Logos

## How to Add Logos

1. Add your organization logo images (PNG, JPG, SVG) to this folder
2. Open `index.js` and import the logo:
   ```js
   import brainGymLogo from './brain-gym.png';
   ```
3. Add it to the `orgLogos` mapping:
   ```js
   export const orgLogos = {
     "brain-gym.png": brainGymLogo,
   };
   ```

## Naming Convention

- Use the same key name that your backend sends in `organizationLogoKey`
- Example: if backend sends `"brain-gym.png"`, name your file `brain-gym.png`

## Supported Formats

- PNG (recommended for logos with transparency)
- JPG/JPEG
- SVG (vector, best for scaling)
- WebP

## Recommended Logo Specs

- Size: 200x200px minimum
- Format: PNG with transparent background
- File size: < 100KB
