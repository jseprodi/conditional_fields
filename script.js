/**
 * Conditional Fields Custom Element for Kontent.ai
 * This script handles conditional field visibility and data management
 */

// Load configuration - use window.CONFIG if available, otherwise use fallback
const CONFIG = (typeof window !== 'undefined' && window.CONFIG) ? window.CONFIG : {
    ELEMENTS: {
        FIELD_A: 'fieldA',
        ARTICLE_CATEGORY: 'articleCategory',
        ARTICLE_LENGTH: 'articleLength',
        AUTHOR_NAME: 'authorName',
        AUTHOR_BIO: 'authorBio',
        PRODUCT_TYPE: 'productType',
        PRICE: 'price',
        WEIGHT: 'weight',
        DIMENSIONS: 'dimensions',
        FILE_SIZE: 'fileSize',
        DOWNLOAD_FORMAT: 'downloadFormat',
        EVENT_DATE: 'eventDate',
        EVENT_TYPE: 'eventType',
        VENUE: 'venue',
        CAPACITY: 'capacity',
        PLATFORM: 'platform',
        REGISTRATION_URL: 'registrationUrl',
        CUSTOM_TYPE: 'customType',
        CUSTOM_DESCRIPTION: 'customDescription'
    }
};

class ConditionalFieldsElement {
    constructor() {
        this.customElementsAPI = null;
        this.formData = {};
        this.initializeAPI();
        this.setupEventListeners();
        this.loadInitialData();
    }

    /**
     * Initialize the Kontent.ai Custom Elements API
     */
    initializeAPI() {
        // Check if we're running in Kontent.ai environment
        if (typeof CustomElementsAPI !== 'undefined') {
            this.customElementsAPI = CustomElementsAPI;
            console.log('Custom Elements API loaded successfully');
        } else {
            console.warn('Custom Elements API not available - running in demo mode');
            this.customElementsAPI = this.createMockAPI();
        }
    }

    /**
     * Create a mock API for testing outside of Kontent.ai
     */
    createMockAPI() {
        return {
            onElementChanged: (elementCodename, callback) => {
                console.log(`Mock: Listening for changes to ${elementCodename}`);
            },
            setElementValue: (elementCodename, value) => {
                console.log(`Mock: Setting ${elementCodename} to ${value}`);
            },
            getElementValue: (elementCodename) => {
                console.log(`Mock: Getting value for ${elementCodename}`);
                return '';
            },
            setElementVisibility: (elementCodename, visible) => {
                console.log(`Mock: Setting ${elementCodename} visibility to ${visible}`);
            }
        };
    }

    /**
     * Set up all event listeners for form interactions
     */
    setupEventListeners() {
        // Main trigger field (Field A)
        const fieldA = document.getElementById('fieldA');
        if (fieldA) {
            fieldA.addEventListener('change', (e) => this.handleFieldAChange(e.target.value));
        }

        // Article category change
        const articleCategory = document.getElementById('articleCategory');
        if (articleCategory) {
            articleCategory.addEventListener('change', (e) => this.handleArticleCategoryChange(e.target.value));
        }

        // Product type change
        const productType = document.getElementById('productType');
        if (productType) {
            productType.addEventListener('change', (e) => this.handleProductTypeChange(e.target.value));
        }

        // Event type change
        const eventType = document.getElementById('eventType');
        if (eventType) {
            eventType.addEventListener('change', (e) => this.handleEventTypeChange(e.target.value));
        }

        // Listen to all form changes for data collection
        const form = document.getElementById('conditionalForm');
        if (form) {
            form.addEventListener('input', (e) => this.handleFormChange(e));
            form.addEventListener('change', (e) => this.handleFormChange(e));
        }
    }

    /**
     * Load initial data from Kontent.ai elements
     */
    loadInitialData() {
        if (!this.customElementsAPI) return;

        // Load values from existing Kontent.ai elements
        const elementsToLoad = [
            'fieldA', 'articleCategory', 'articleLength', 'authorName', 'authorBio',
            'productType', 'price', 'weight', 'dimensions', 'fileSize', 'downloadFormat',
            'eventDate', 'eventType', 'venue', 'capacity', 'platform', 'registrationUrl',
            'customType', 'customDescription'
        ];

        elementsToLoad.forEach(elementCodename => {
            try {
                const value = this.customElementsAPI.getElementValue(elementCodename);
                if (value) {
                    const element = document.getElementById(elementCodename);
                    if (element) {
                        element.value = value;
                        // Trigger change events to show conditional fields
                        element.dispatchEvent(new Event('change'));
                    }
                }
            } catch (error) {
                console.warn(`Could not load value for ${elementCodename}:`, error);
            }
        });
    }

    /**
     * Handle changes to the main trigger field (Field A)
     */
    handleFieldAChange(value) {
        console.log('Field A changed to:', value);
        
        // Hide all conditional groups first
        this.hideAllConditionalGroups();
        
        // Show appropriate conditional group based on selection
        switch (value) {
            case 'article':
                this.showConditionalGroup('articleFields');
                break;
            case 'product':
                this.showConditionalGroup('productFields');
                break;
            case 'event':
                this.showConditionalGroup('eventFields');
                break;
            case 'other':
                this.showConditionalGroup('otherFields');
                break;
            default:
                this.hideAllConditionalGroups();
        }

        // Update Kontent.ai element
        this.updateKontentElement('fieldA', value);
        
        // Update summary
        this.updateSummary();
    }

    /**
     * Handle changes to article category
     */
    handleArticleCategoryChange(value) {
        console.log('Article category changed to:', value);
        
        // Hide nested conditionals
        this.hideNestedConditional('tutorialFields');
        
        // Show tutorial fields if category is tutorial
        if (value === 'tutorial') {
            this.showNestedConditional('tutorialFields');
        }

        this.updateKontentElement('articleCategory', value);
        this.updateSummary();
    }

    /**
     * Handle changes to product type
     */
    handleProductTypeChange(value) {
        console.log('Product type changed to:', value);
        
        // Hide all product nested conditionals
        this.hideNestedConditional('physicalProductFields');
        this.hideNestedConditional('digitalProductFields');
        
        // Show appropriate nested conditional
        if (value === 'physical') {
            this.showNestedConditional('physicalProductFields');
        } else if (value === 'digital') {
            this.showNestedConditional('digitalProductFields');
        }

        this.updateKontentElement('productType', value);
        this.updateSummary();
    }

    /**
     * Handle changes to event type
     */
    handleEventTypeChange(value) {
        console.log('Event type changed to:', value);
        
        // Hide all event nested conditionals
        this.hideNestedConditional('conferenceFields');
        this.hideNestedConditional('webinarFields');
        
        // Show appropriate nested conditional
        if (value === 'conference') {
            this.showNestedConditional('conferenceFields');
        } else if (value === 'webinar') {
            this.showNestedConditional('webinarFields');
        }

        this.updateKontentElement('eventType', value);
        this.updateSummary();
    }

    /**
     * Handle general form changes for data collection
     */
    handleFormChange(event) {
        const element = event.target;
        const name = element.name;
        const value = element.value;

        if (name) {
            this.formData[name] = value;
            this.updateKontentElement(name, value);
            this.updateSummary();
        }
    }

    /**
     * Show a conditional group
     */
    showConditionalGroup(groupId) {
        const group = document.getElementById(groupId);
        if (group) {
            group.style.display = 'block';
            group.classList.add('visible');
            
            // Animate the appearance
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, 10);
        }
    }

    /**
     * Hide all conditional groups
     */
    hideAllConditionalGroups() {
        const groups = ['articleFields', 'productFields', 'eventFields', 'otherFields'];
        groups.forEach(groupId => {
            this.hideConditionalGroup(groupId);
        });
    }

    /**
     * Hide a conditional group
     */
    hideConditionalGroup(groupId) {
        const group = document.getElementById(groupId);
        if (group) {
            group.style.opacity = '0';
            group.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                group.style.display = 'none';
                group.classList.remove('visible');
            }, 300);
        }
    }

    /**
     * Show a nested conditional
     */
    showNestedConditional(conditionalId) {
        const conditional = document.getElementById(conditionalId);
        if (conditional) {
            conditional.style.display = 'block';
            conditional.classList.add('visible');
            
            setTimeout(() => {
                conditional.style.opacity = '1';
                conditional.style.transform = 'translateY(0)';
            }, 10);
        }
    }

    /**
     * Hide a nested conditional
     */
    hideNestedConditional(conditionalId) {
        const conditional = document.getElementById(conditionalId);
        if (conditional) {
            conditional.style.opacity = '0';
            conditional.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                conditional.style.display = 'none';
                conditional.classList.remove('visible');
            }, 300);
        }
    }

    /**
     * Update a Kontent.ai element value
     */
    updateKontentElement(elementCodename, value) {
        if (!this.customElementsAPI) return;

        try {
            this.customElementsAPI.setElementValue(elementCodename, value);
        } catch (error) {
            console.warn(`Could not update ${elementCodename}:`, error);
        }
    }

    /**
     * Update the summary section
     */
    updateSummary() {
        const summary = document.getElementById('summary');
        const summaryContent = document.getElementById('summaryContent');
        
        if (!summary || !summaryContent) return;

        // Only show summary if we have some data
        const hasData = Object.keys(this.formData).some(key => this.formData[key]);
        
        if (hasData) {
            summary.style.display = 'block';
            summaryContent.innerHTML = this.generateSummaryHTML();
        } else {
            summary.style.display = 'none';
        }
    }

    /**
     * Generate summary HTML
     */
    generateSummaryHTML() {
        let html = '<div class="summary-grid">';
        
        // Main selection
        if (this.formData.fieldA) {
            html += `<div class="summary-item"><strong>Content Type:</strong> ${this.formData.fieldA}</div>`;
        }

        // Article-specific data
        if (this.formData.fieldA === 'article') {
            if (this.formData.articleCategory) {
                html += `<div class="summary-item"><strong>Category:</strong> ${this.formData.articleCategory}</div>`;
            }
            if (this.formData.articleLength) {
                html += `<div class="summary-item"><strong>Length:</strong> ${this.formData.articleLength}</div>`;
            }
            if (this.formData.authorName) {
                html += `<div class="summary-item"><strong>Author:</strong> ${this.formData.authorName}</div>`;
            }
        }

        // Product-specific data
        if (this.formData.fieldA === 'product') {
            if (this.formData.productType) {
                html += `<div class="summary-item"><strong>Product Type:</strong> ${this.formData.productType}</div>`;
            }
            if (this.formData.price) {
                html += `<div class="summary-item"><strong>Price:</strong> $${this.formData.price}</div>`;
            }
            if (this.formData.weight) {
                html += `<div class="summary-item"><strong>Weight:</strong> ${this.formData.weight} kg</div>`;
            }
            if (this.formData.fileSize) {
                html += `<div class="summary-item"><strong>File Size:</strong> ${this.formData.fileSize} MB</div>`;
            }
        }

        // Event-specific data
        if (this.formData.fieldA === 'event') {
            if (this.formData.eventDate) {
                html += `<div class="summary-item"><strong>Date:</strong> ${this.formData.eventDate}</div>`;
            }
            if (this.formData.eventType) {
                html += `<div class="summary-item"><strong>Event Type:</strong> ${this.formData.eventType}</div>`;
            }
            if (this.formData.venue) {
                html += `<div class="summary-item"><strong>Venue:</strong> ${this.formData.venue}</div>`;
            }
            if (this.formData.platform) {
                html += `<div class="summary-item"><strong>Platform:</strong> ${this.formData.platform}</div>`;
            }
        }

        // Other-specific data
        if (this.formData.fieldA === 'other') {
            if (this.formData.customType) {
                html += `<div class="summary-item"><strong>Custom Type:</strong> ${this.formData.customType}</div>`;
            }
        }

        html += '</div>';
        return html;
    }
}

// Initialize the conditional fields element when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConditionalFieldsElement();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConditionalFieldsElement;
}
