import { addTemplate } from './template-registry';

// Initialize with some new templates
export function initializeTemplates() {
  try {
    // Add a finance template
    addTemplate('professional', 'finance', 'Finance Professional', 'Clean design for finance professionals', {
      primaryColor: '#059669'
    });

    // Add a tech template
    addTemplate('modern', 'developer', 'Developer', 'Modern design for developers', {
      primaryColor: '#dc2626'
    });

    // Add a creative template
    addTemplate('creative', 'designer', 'Designer', 'Creative designer portfolio', {
      primaryColor: '#ec4899'
    });

    // Add an executive template
    addTemplate('professional', 'executive', 'Executive', 'Professional executive design with premium styling', {
      primaryColor: '#1f2937'
    });
    
    console.log('✅ Custom templates initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing templates:', error);
  }
}

// Auto-initialize templates when this module is imported
initializeTemplates();
