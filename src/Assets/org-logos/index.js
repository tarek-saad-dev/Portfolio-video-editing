// Organization Logos Mapping
// Add your organization logos here and import them

// Example imports (uncomment and add your actual logo files):
// import brainGymLogo from './brain-gym.png';
// import companyXLogo from './company-x.png';

// Logo mapping object
export const orgLogos = {
  // Map organizationLogoKey to imported logo
  // Example:
  // "brain-gym.png": brainGymLogo,
  // "company-x.png": companyXLogo,
};

// Helper function to get logo or return null
export const getOrgLogo = (logoKey) => {
  if (!logoKey) return null;
  return orgLogos[logoKey] || null;
};

export default orgLogos;
