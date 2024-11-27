async function loadPDF({ PSPDFKit, container, document }) {
  try {
    // Log the environment base URL to verify it's set correctly
    const baseUrl = `${window.location.protocol}//${window.location.host}${
      import.meta.env.BASE_URL || '/'
    }`;
    console.log('Base URL:', baseUrl);

    // Load PSPDFKit instance
    const instance = await PSPDFKit.load({
      container, // Container where PSPDFKit will mount
      document, // Document to open
      baseUrl, // Base URL for resolving assets
    });

    console.log('PSPDFKit instance successfully loaded:', instance);
    return instance;
  } catch (error) {
    console.error('Error loading PSPDFKit:', error);
    throw error; // Re-throw the error for upstream handling if needed
  }
}

export { loadPDF }; // Export this method for use in your project
