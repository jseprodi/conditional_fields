/**
 * Configuration file for Conditional Fields Custom Element
 * Modify these settings to customize the element behavior
 */

const CONFIG_DATA = {
    // Element codenames - update these to match your Kontent.ai content type
    ELEMENTS: {
        // Main trigger field
        FIELD_A: 'fieldA',
        
        // Article fields
        ARTICLE_CATEGORY: 'articleCategory',
        ARTICLE_LENGTH: 'articleLength',
        AUTHOR_NAME: 'authorName',
        AUTHOR_BIO: 'authorBio',
        
        // Product fields
        PRODUCT_TYPE: 'productType',
        PRICE: 'price',
        WEIGHT: 'weight',
        DIMENSIONS: 'dimensions',
        FILE_SIZE: 'fileSize',
        DOWNLOAD_FORMAT: 'downloadFormat',
        
        // Event fields
        EVENT_DATE: 'eventDate',
        EVENT_TYPE: 'eventType',
        VENUE: 'venue',
        CAPACITY: 'capacity',
        PLATFORM: 'platform',
        REGISTRATION_URL: 'registrationUrl',
        
        // Other fields
        CUSTOM_TYPE: 'customType',
        CUSTOM_DESCRIPTION: 'customDescription'
    },
    
    // Animation settings
    ANIMATION: {
        DURATION: 300, // milliseconds
        EASING: 'ease-out'
    },
    
    // UI settings
    UI: {
        SHOW_SUMMARY: true,
        SUMMARY_POSITION: 'bottom', // 'top' or 'bottom'
        ENABLE_ANIMATIONS: true,
        DEBUG_MODE: false
    },
    
    // Validation settings
    VALIDATION: {
        REQUIRED_FIELDS: ['fieldA'],
        VALIDATE_ON_CHANGE: true,
        SHOW_ERRORS: true
    },
    
    // Custom field options - modify these to change available choices
    FIELD_OPTIONS: {
        CONTENT_TYPES: [
            { value: 'article', label: 'Article' },
            { value: 'product', label: 'Product' },
            { value: 'event', label: 'Event' },
            { value: 'other', label: 'Other' }
        ],
        
        ARTICLE_CATEGORIES: [
            { value: 'news', label: 'News' },
            { value: 'tutorial', label: 'Tutorial' },
            { value: 'review', label: 'Review' }
        ],
        
        ARTICLE_LENGTHS: [
            { value: 'short', label: 'Short (300-500 words)' },
            { value: 'medium', label: 'Medium (500-1000 words)' },
            { value: 'long', label: 'Long (1000+ words)' }
        ],
        
        PRODUCT_TYPES: [
            { value: 'physical', label: 'Physical Product' },
            { value: 'digital', label: 'Digital Product' },
            { value: 'service', label: 'Service' }
        ],
        
        EVENT_TYPES: [
            { value: 'conference', label: 'Conference' },
            { value: 'workshop', label: 'Workshop' },
            { value: 'webinar', label: 'Webinar' },
            { value: 'meetup', label: 'Meetup' }
        ],
        
        DOWNLOAD_FORMATS: [
            { value: 'pdf', label: 'PDF' },
            { value: 'zip', label: 'ZIP' },
            { value: 'exe', label: 'EXE' },
            { value: 'other', label: 'Other' }
        ],
        
        PLATFORMS: [
            { value: 'zoom', label: 'Zoom' },
            { value: 'teams', label: 'Microsoft Teams' },
            { value: 'webex', label: 'Webex' },
            { value: 'other', label: 'Other' }
        ]
    },
    
    // Conditional logic rules
    CONDITIONAL_RULES: {
        // Show article fields when content type is 'article'
        'article': ['articleFields'],
        
        // Show product fields when content type is 'product'
        'product': ['productFields'],
        
        // Show event fields when content type is 'event'
        'event': ['eventFields'],
        
        // Show other fields when content type is 'other'
        'other': ['otherFields'],
        
        // Show tutorial fields when article category is 'tutorial'
        'tutorial': ['tutorialFields'],
        
        // Show physical product fields when product type is 'physical'
        'physical': ['physicalProductFields'],
        
        // Show digital product fields when product type is 'digital'
        'digital': ['digitalProductFields'],
        
        // Show conference fields when event type is 'conference'
        'conference': ['conferenceFields'],
        
        // Show webinar fields when event type is 'webinar'
        'webinar': ['webinarFields']
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG_DATA;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG_DATA;
}
