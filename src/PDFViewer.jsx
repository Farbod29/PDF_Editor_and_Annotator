import { useEffect, useRef } from 'react';
import { loadPDF } from './helperfunction'; // Import the loadPDF function

function PDFViewer(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    let PSPDFKit;
    const container = containerRef.current;

    (async function () {
      try {
        // Dynamically import PSPDFKit
        PSPDFKit = await import('pspdfkit');

        // Unload any existing PSPDFKit instance in the container
        PSPDFKit.unload(container);

        // Load the PDF using your helper function
        const instance = await loadPDF({
          PSPDFKit,
          container,
          document: props.document, // Document path passed as a prop
        });

        // Log the PSPDFKit instance to debug and ensure it was created successfully
        console.log('PSPDFKit instance:', instance);
      } catch (error) {
        console.error('Error loading PSPDFKit:', error);
      }
    })();

    // Cleanup on component unmount
    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]); // Re-run effect when the document prop changes

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        border: '1px solid red', // Debugging border
        backgroundColor: '#ffffff', // Explicit white background
      }}
    />
  );
}

export default PDFViewer;
