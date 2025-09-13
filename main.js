// Website Template Builder - Main JavaScript

class TemplateBuilder {
    constructor() {
    this.currentSection = 1;
    this.totalSections = 10;
    this.formData = {};
    this.requiredFields = {};
    this.uploadedFiles = {};
    
    this.init();
}

    init() {
    this.setupEventListeners();
    this.setupFormValidation();
    this.updateProgress();
    this.setupDynamicFields();
    this.setupImagePreviews();
    this.setupAnimationDemos();
    this.setupStyleAndIconSelections();
    this.setupThemeToggle();
    this.loadSavedData();
    this.setupServiceAreaMapping();
    this.setupProjectButtons();
}

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        prevBtn?.addEventListener('click', () => this.previousSection());
        nextBtn?.addEventListener('click', () => this.nextSection());
        submitBtn?.addEventListener('click', (e) => this.submitForm(e));

        // Section indicators
        document.querySelectorAll('.indicator-item').forEach(indicator => {
    indicator.addEventListener('click', (e) => {
        const section = parseInt(e.target.dataset.section);
        
        // Allow going to any section (remove validation restriction)
        this.goToSection(section);
        
        // Optional: Show a warning if jumping ahead with incomplete sections
        if (section > this.currentSection) {
            this.showNotification(`Jumped to section ${section}. You can return to complete previous sections anytime.`, 'info');
        }
 
    });
});

        // Form inputs - auto-save
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('change', () => this.saveFormData());
            input.addEventListener('input', () => this.saveFormData());
        });

        // FIXED: Industry selection listener for service trade fields
const industrySelect = document.getElementById('industry');
if (industrySelect) {
    industrySelect.addEventListener('change', () => {
        console.log('Industry changed to:', industrySelect.value);
        this.toggleServiceTradeFields();
    });
}

        // Dynamic form elements
        this.setupDynamicButtons();
        this.setupConditionalFields();
    }

    setupDynamicButtons() {
    // Add service button
    const addServiceBtn = document.querySelector('.add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', () => this.addServiceItem());
    }

    // Add testimonial button
    const addTestimonialBtn = document.querySelector('.add-testimonial-btn');
    if (addTestimonialBtn) {
        addTestimonialBtn.addEventListener('click', () => this.addTestimonialItem());
    }

    // Add project button
    const addProjectBtn = document.querySelector('.add-project-btn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => this.addProjectItem());
    }

    // Auto-populate services button
    const autoPopulateBtn = document.getElementById('autoPopulateServices');
    if (autoPopulateBtn) {
        autoPopulateBtn.addEventListener('click', () => this.autoPopulateServices());
    }
}

    setupConditionalFields() {
    // Industry selection - show/hide service trade fields
    const industrySelect = document.getElementById('industry');
    if (industrySelect) {
        industrySelect.addEventListener('change', () => this.toggleServiceTradeFields());
    }

    // Hero background type
    const heroBackgroundInputs = document.querySelectorAll('input[name="heroBackgroundType"]');
    heroBackgroundInputs.forEach(input => {
        input.addEventListener('change', () => this.toggleHeroBackgroundFields());
    });

    // Custom icons
    const iconStyleInputs = document.querySelectorAll('input[name="iconStyle"]');
    iconStyleInputs.forEach(input => {
        input.addEventListener('change', () => this.toggleCustomIconsField());
    });

    // Color inputs sync
    this.setupColorInputSync();
}

    setupColorInputSync() {
        const primaryColorPicker = document.getElementById('primaryColor');
        const secondaryColorPicker = document.getElementById('secondaryColor');
        
        primaryColorPicker?.addEventListener('change', (e) => {
            const textInput = e.target.parentNode.querySelector('.color-text');
            if (textInput) textInput.value = e.target.value;
        });

        secondaryColorPicker?.addEventListener('change', (e) => {
            const textInput = e.target.parentNode.querySelector('.color-text');
            if (textInput) textInput.value = e.target.value;
        });
    }

    setupFormValidation() {
        // Define required fields for each section
        this.requiredFields = {
            1: ['businessName', 'industry', 'brandPersonality', 'phone', 'email'],
            2: ['pages', 'navigationStyle'],
            3: ['headerLayout', 'headerBehavior', 'heroStyle', 'heroHeadline', 'ctaButtonText', 'ctaAction'],
            4: ['colorMood', 'fontStyle'],
            5: [], // Animations are optional
            6: [], // Forms are optional
            7: [], // Content is optional but recommended
            8: ['heroBackgroundType', 'imageStyle', 'iconStyle'],
            9: ['performanceRequirements'],
            10: ['primaryCTA']
        };
    }

    setupImagePreviews() {
    // Setup image upload previews - FIXED VERSION
    this.setupFileInputListeners();
}

setupDynamicFields() {
    // Setup dynamic form behavior
    this.setupDynamicButtons();
    this.setupConditionalFields();

    // Setup project button with delay to ensure DOM is ready
setTimeout(() => {
    const addProjectBtn = document.querySelector('.add-project-btn');
    console.log('Looking for add project button:', addProjectBtn);
    
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Project button clicked!');
            this.addProjectItem();
        });
        console.log('Project button listener added successfully');
    } else {
        console.log('Project button not found - checking again in 1 second');
        setTimeout(() => {
            const btn = document.querySelector('.add-project-btn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.addProjectItem();
                });
                console.log('Project button found and listener added on retry');
            }
        }, 1000);
    }
}, 100);
}

// Add this new method after setupDynamicFields
setupServiceAreaMapping() {
    const cityInput = document.getElementById('cityInput');
    const addCityBtn = document.getElementById('addCity');
    const selectedAreas = document.getElementById('selectedAreas');
    const serviceAreasInput = document.getElementById('serviceAreas');

    if (!cityInput || !addCityBtn || !selectedAreas || !serviceAreasInput) {
        console.log('Service area mapping elements not found');
        return;
    }

    function addArea(area) {
        const areaTag = document.createElement('div');
        areaTag.classList.add('area-tag');
        areaTag.textContent = area;
        areaTag.onclick = () => removeArea(area);
        selectedAreas.appendChild(areaTag);
        updateServiceAreasInput();
    }

    function removeArea(area) {
        const areaTag = Array.from(selectedAreas.children).find(tag => tag.textContent === area);
        if (areaTag) {
            areaTag.remove();
            updateServiceAreasInput();
        }
    }

    function updateServiceAreasInput() {
        const areas = Array.from(selectedAreas.children).map(tag => tag.textContent);
        serviceAreasInput.value = areas.join(', ');
    }

    addCityBtn.addEventListener('click', () => {
        const area = cityInput.value.trim();
        if (area) {
            addArea(area);
            cityInput.value = '';
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCityBtn.click();
        }
    });
}

setupProjectButtons() {
    // Setup add project button
    const addProjectBtn = document.querySelector('.add-project-btn');
    console.log('Add project button found:', addProjectBtn); // Debug log
    
    if (addProjectBtn) {
        // Remove any existing listeners first
        addProjectBtn.removeEventListener('click', this.addProjectHandler);
        
        // Create bound handler
        this.addProjectHandler = () => {
            console.log('Add project button clicked!'); // Debug log
            this.addProjectItem();
        };
        
        // Add the listener
        addProjectBtn.addEventListener('click', this.addProjectHandler);
        console.log('Add project button listener added'); // Debug log
    } else {
        console.log('Add project button not found!'); // Debug log
    }
}

setupDynamicButtons() {
    // Add service button
    const addServiceBtn = document.querySelector('.add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', () => this.addServiceItem());
    }

    // Add testimonial button
    const addTestimonialBtn = document.querySelector('.add-testimonial-btn');
    if (addTestimonialBtn) {
        addTestimonialBtn.addEventListener('click', () => this.addTestimonialItem());
    }
}

autoPopulateServices() {
    console.log('Auto-populating services...');
    
    // Get the selected industry
    const selectedIndustry = document.getElementById('industry')?.value;
    if (!selectedIndustry) {
        this.showNotification('Please select an industry first', 'error');
        return;
    }
    
    // Get the industry-specific services
    const services = this.getIndustryServices(selectedIndustry);
    if (services.length === 0) {
        this.showNotification('No service templates available for this industry', 'info');
        return;
    }
    
    console.log(`Found ${services.length} services for ${selectedIndustry}`);
    
    // Clear existing services first
    const existingServices = document.querySelectorAll('.service-card');
    existingServices.forEach(card => card.remove());
    
    // Add each service from the template
    services.forEach((service, index) => {
        this.addServiceItemWithData(service, index + 1);
    });
    
    this.showNotification(`Added ${services.length} ${selectedIndustry} services!`, 'success');
    this.saveFormData();
}

addServiceItemWithData(serviceData, serviceNumber) {
    const servicesList = document.querySelector('.services-list');
    
    const serviceHTML = `
        <div class="service-card">
            <div class="service-header">
                <div class="service-number">
                    <i class="fas fa-star"></i>
                    <span>Service ${serviceNumber}</span>
                </div>
                <div class="service-optional">Optional</div>
            </div>
            
            <div class="service-content">
                <div class="service-basic-info">
                    <div class="input-group">
                        <label for="service${serviceNumber}Name">Service Name</label>
                        <input type="text" id="service${serviceNumber}Name" name="service${serviceNumber}Name" 
                               value="${serviceData.name}">
                    </div>
                    <div class="input-group price-input">
                        <label for="service${serviceNumber}Price">Price</label>
                        <input type="text" id="service${serviceNumber}Price" name="service${serviceNumber}Price" 
                               placeholder="e.g., $99.99">
                    </div>
                </div>
                
                <div class="service-description">
                    <label for="service${serviceNumber}Description">Service Description</label>
                    <textarea id="service${serviceNumber}Description" name="service${serviceNumber}Description" 
                              rows="3">${serviceData.description}</textarea>
                </div>
                
                <div class="service-image-section">
                    <div class="image-upload-wrapper">
                        <label>Service Image</label>
                        <div class="image-upload-area compact">
                            <input type="file" id="service${serviceNumber}Image" name="service${serviceNumber}Image" accept="image/*">
                            <div class="upload-placeholder">
                                <i class="fas fa-image"></i>
                                <span>Upload Image</span>
                            </div>
                        </div>
                    </div>
                    <div class="image-description-wrapper">
                        <label>Or describe the image you want</label>
                        <input type="text" id="service${serviceNumber}ImageDesc" name="service${serviceNumber}ImageDesc" 
                               placeholder="e.g., Before/after photos, team working" 
                               class="image-description-input">
                    </div>
                </div>
                
                <div class="service-actions">
                    <button type="button" class="remove-service-btn" onclick="this.closest('.service-card').remove()">
                        <i class="fas fa-trash"></i> Remove Service
                    </button>
                </div>
            </div>
        </div>
    `;

    const addButton = servicesList.querySelector('.add-service-btn');
    addButton.insertAdjacentHTML('beforebegin', serviceHTML);

    // Setup event listeners for new fields
    const newServiceCard = servicesList.querySelector('.service-card:nth-last-child(2)');
    newServiceCard.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('change', () => this.saveFormData());
        input.addEventListener('input', () => this.saveFormData());
    });

    // Setup file input for new service
    const newFileInput = newServiceCard.querySelector('input[type="file"]');
    this.setupSingleFileInput(newFileInput);
}

suggestCopywriting(buttonId) {
    console.log('Suggesting copywriting for:', buttonId);
    
    // Get the selected industry
    const selectedIndustry = document.getElementById('industry')?.value;
    if (!selectedIndustry) {
        this.showNotification('Please select an industry first', 'error');
        return;
    }
    
    // Get copywriting templates for this industry
    const templates = this.getCopywritingTemplates(selectedIndustry);
    
    // Determine which field to update and which template array to use
    let targetField, templateArray, fieldName;
    
    switch(buttonId) {
        case 'suggestHeadline':
            targetField = document.getElementById('heroHeadline');
            templateArray = templates.headlines;
            fieldName = 'headline';
            break;
        case 'suggestSubheadline':
            targetField = document.getElementById('heroSubheadline');
            templateArray = templates.subheadlines;
            fieldName = 'subheadline';
            break;
        case 'suggestCTA':
            targetField = document.getElementById('ctaButtonText');
            templateArray = templates.ctaButtons;
            fieldName = 'call-to-action';
            break;
        default:
            console.error('Unknown button ID:', buttonId);
            return;
    }
    
    if (!targetField || !templateArray || templateArray.length === 0) {
        this.showNotification('No suggestions available', 'error');
        return;
    }
    
    // Get current value or use first suggestion
    const currentValue = targetField.value;
    let currentIndex = templateArray.indexOf(currentValue);
    
    // Move to next suggestion (or first if current not found)
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % templateArray.length : 0;
    const suggestion = templateArray[nextIndex];
    
    // Update the field
    targetField.value = suggestion;
    
    // Show notification
    this.showNotification(`${fieldName} suggestion applied! Click again for more options.`, 'success');
    
    // Save form data
    this.saveFormData();
    
    console.log(`Applied ${fieldName} suggestion:`, suggestion);
}

setupConditionalFields() {
    // Hero background type
    const heroBackgroundInputs = document.querySelectorAll('input[name="heroBackgroundType"]');
    heroBackgroundInputs.forEach(input => {
        input.addEventListener('change', () => this.toggleHeroBackgroundFields());
    });

    // Custom icons
    const iconStyleInputs = document.querySelectorAll('input[name="iconStyle"]');
    iconStyleInputs.forEach(input => {
        input.addEventListener('change', () => this.toggleCustomIconsField());
    });

    // Color inputs sync
    this.setupColorInputSync();
}

setupColorInputSync() {
    const primaryColorPicker = document.getElementById('primaryColor');
    const secondaryColorPicker = document.getElementById('secondaryColor');
    
    if (primaryColorPicker) {
        primaryColorPicker.addEventListener('change', (e) => {
            const textInput = e.target.parentNode.querySelector('.color-text');
            if (textInput) textInput.value = e.target.value;
        });
    }

    if (secondaryColorPicker) {
        secondaryColorPicker.addEventListener('change', (e) => {
            const textInput = e.target.parentNode.querySelector('.color-text');
            if (textInput) textInput.value = e.target.value;
        });
    }
}

toggleHeroBackgroundFields() {
    const selectedType = document.querySelector('input[name="heroBackgroundType"]:checked')?.value;
    const imageUpload = document.getElementById('heroImageUpload');
    const videoUpload = document.getElementById('heroVideoUpload');

    if (imageUpload && videoUpload) {
        imageUpload.style.display = selectedType === 'image' ? 'block' : 'none';
        videoUpload.style.display = selectedType === 'video' ? 'block' : 'none';
    }
}

toggleCustomIconsField() {
    const selectedStyle = document.querySelector('input[name="iconStyle"]:checked')?.value;
    const customIconsUpload = document.getElementById('customIconsUpload');

    if (customIconsUpload) {
        customIconsUpload.style.display = selectedStyle === 'custom-icons' ? 'block' : 'none';
    }
}

toggleServiceTradeFields() {
    const selectedIndustry = document.getElementById('industry')?.value;
    const serviceTradeFields = document.getElementById('serviceTradeFields');
    
    // List of service trade industries that should show the extra fields
    const serviceTradeIndustries = [
        'electrical',
        'plumbing', 
        'construction',
        'landscaping',
        'hvac',
        'painting',
        'roofing'
    ];
    
    if (serviceTradeFields) {
        if (serviceTradeIndustries.includes(selectedIndustry)) {
    serviceTradeFields.style.display = 'block';
    console.log('Showing service trade fields for:', selectedIndustry);
    
    // Show auto-populate button for service trades
const autoPopulateSection = document.getElementById('autoPopulateSection');
if (autoPopulateSection) {
    autoPopulateSection.style.display = 'block';
    
    // Set up the button listener now that it's visible
    const autoPopulateBtn = document.getElementById('autoPopulateServices');
    if (autoPopulateBtn) {
        // Remove any existing listener first
        autoPopulateBtn.removeEventListener('click', this.autoPopulateHandler);
        
        // Create bound handler
        this.autoPopulateHandler = () => this.autoPopulateServices();
        
        // Add the listener
        autoPopulateBtn.addEventListener('click', this.autoPopulateHandler);
        console.log('Auto-populate button listener added');
    }
    // Show and setup copywriting suggest buttons
const suggestButtons = ['suggestHeadline', 'suggestSubheadline', 'suggestCTA'];
suggestButtons.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
        button.style.display = 'inline-flex';
        
        // Remove existing listener
        button.removeEventListener('click', button.suggestHandler);
        
        // Create bound handler
        button.suggestHandler = () => this.suggestCopywriting(buttonId);
        
        // Add listener
        button.addEventListener('click', button.suggestHandler);
    }
});
console.log('Copywriting suggest buttons activated');
}
} else {
    serviceTradeFields.style.display = 'none';
    console.log('Hiding service trade fields for:', selectedIndustry);
    
    // Hide auto-populate button for non-service trades
    const autoPopulateSection = document.getElementById('autoPopulateSection');
    if (autoPopulateSection) {
        autoPopulateSection.style.display = 'none';
    }
}
    }
}

// Industry-specific service templates
getIndustryServices(industry) {
    const serviceTemplates = {
        'electrical': [
            { name: 'Electrical Repairs', description: 'Fix faulty wiring, outlets, and electrical issues' },
            { name: 'Panel Upgrades', description: 'Upgrade electrical panels for modern power needs' },
            { name: 'Outlet Installation', description: 'Install new outlets and switches throughout your home' },
            { name: 'Lighting Installation', description: 'Install indoor and outdoor lighting fixtures' },
            { name: 'Emergency Electrical Service', description: '24/7 emergency electrical repairs and troubleshooting' }
        ],
        'plumbing': [
            { name: 'Drain Cleaning', description: 'Clear clogged drains and sewer lines' },
            { name: 'Pipe Repair & Replacement', description: 'Fix leaky pipes and replace old plumbing' },
            { name: 'Water Heater Service', description: 'Install, repair, and maintain water heaters' },
            { name: 'Emergency Plumbing', description: '24/7 emergency plumbing repairs' },
            { name: 'Leak Detection', description: 'Find and fix hidden water leaks' }
        ],
        'construction': [
            { name: 'Home Renovations', description: 'Complete home remodeling and renovation projects' },
            { name: 'Kitchen Remodeling', description: 'Custom kitchen design and renovation' },
            { name: 'Bathroom Remodeling', description: 'Complete bathroom renovation and upgrades' },
            { name: 'Home Additions', description: 'Add rooms, decks, and expand your living space' },
            { name: 'Custom Home Building', description: 'Build your dream home from the ground up' }
        ],
        'landscaping': [
            { name: 'Lawn Maintenance', description: 'Regular mowing, trimming, and lawn care' },
            { name: 'Garden Design & Installation', description: 'Create beautiful gardens and flower beds' },
            { name: 'Tree & Shrub Care', description: 'Pruning, trimming, and plant health services' },
            { name: 'Irrigation Systems', description: 'Install and maintain sprinkler systems' },
            { name: 'Seasonal Cleanup', description: 'Spring and fall yard cleanup services' }
        ],
        'hvac': [
            { name: 'AC Repair & Maintenance', description: 'Keep your air conditioning running efficiently' },
            { name: 'Heating System Service', description: 'Furnace and heating system repair and maintenance' },
            { name: 'HVAC Installation', description: 'Install new heating and cooling systems' },
            { name: 'Duct Cleaning', description: 'Clean air ducts for better air quality' },
            { name: 'Emergency HVAC Service', description: '24/7 heating and cooling emergency repairs' }
        ],
        'painting': [
            { name: 'Interior Painting', description: 'Professional interior house painting' },
            { name: 'Exterior Painting', description: 'Exterior house and building painting' },
            { name: 'Commercial Painting', description: 'Office and commercial building painting' },
            { name: 'Pressure Washing', description: 'Clean surfaces before painting' },
            { name: 'Color Consultation', description: 'Help choose the perfect colors for your space' }
        ],
        'roofing': [
            { name: 'Roof Repair', description: 'Fix leaks, damaged shingles, and roof issues' },
            { name: 'Roof Replacement', description: 'Complete roof replacement with quality materials' },
            { name: 'Roof Inspection', description: 'Thorough roof inspection and damage assessment' },
            { name: 'Gutter Installation', description: 'Install and repair gutters and downspouts' },
            { name: 'Emergency Roof Service', description: '24/7 emergency roof leak repairs' }
        ]
    };

    return serviceTemplates[industry] || [];
}

// Industry-specific copywriting templates
getCopywritingTemplates(industry) {
    const copyTemplates = {
        'electrical': {
            headlines: [
                "Licensed Electricians Serving [City] Since [Year]",
                "Professional Electrical Services You Can Trust",
                "Emergency Electrical Repairs - Available 24/7",
                "[City]'s Most Trusted Electrical Contractors"
            ],
            subheadlines: [
                "Fast, reliable electrical services for your home and business",
                "Licensed, bonded, and insured for your peace of mind",
                "Quality electrical work with a satisfaction guarantee",
                "Emergency service available when you need it most"
            ],
            ctaButtons: [
                "Get Free Electrical Quote",
                "Call for Emergency Service",
                "Schedule Electrical Inspection",
                "Contact Licensed Electrician"
            ]
        },
        'plumbing': {
            headlines: [
                "Professional Plumbers Serving [City] Area",
                "24/7 Emergency Plumbing Services",
                "Licensed Plumbing Contractors You Can Trust",
                "Fast, Reliable Plumbing Solutions"
            ],
            subheadlines: [
                "From leaky faucets to major repairs - we do it all",
                "Licensed and insured plumbing professionals",
                "Quick response times for all your plumbing needs",
                "Quality plumbing services at fair prices"
            ],
            ctaButtons: [
                "Get Free Plumbing Quote",
                "Call Emergency Plumber",
                "Schedule Plumbing Service",
                "Request Plumbing Estimate"
            ]
        },
        'construction': {
            headlines: [
                "Professional Construction Services in [City]",
                "Quality Home Renovations & Remodeling",
                "Licensed General Contractors",
                "Transform Your Home with Expert Construction"
            ],
            subheadlines: [
                "From small repairs to complete home renovations",
                "Licensed, bonded, and fully insured contractors",
                "Quality craftsmanship with attention to detail",
                "Bringing your vision to life with expert construction"
            ],
            ctaButtons: [
                "Get Free Construction Quote",
                "Schedule Consultation",
                "Request Project Estimate",
                "Start Your Project Today"
            ]
        },
        'landscaping': {
            headlines: [
                "Professional Landscaping Services in [City]",
                "Transform Your Outdoor Space",
                "Expert Lawn Care & Garden Design",
                "Beautiful Landscapes, Maintained Year-Round"
            ],
            subheadlines: [
                "Creating beautiful outdoor spaces for your home",
                "Professional lawn care and landscape maintenance",
                "From design to installation to ongoing care",
                "Enhance your property's beauty and value"
            ],
            ctaButtons: [
                "Get Free Landscape Quote",
                "Schedule Lawn Service",
                "Request Design Consultation",
                "Start Your Landscape Project"
            ]
        },
        'hvac': {
            headlines: [
                "Professional HVAC Services in [City]",
                "Keep Your Home Comfortable Year-Round",
                "Licensed Heating & Cooling Experts",
                "24/7 Emergency HVAC Repairs"
            ],
            subheadlines: [
                "Expert installation, repair, and maintenance services",
                "Licensed HVAC technicians you can trust",
                "Energy-efficient solutions for your comfort",
                "Fast response for heating and cooling emergencies"
            ],
            ctaButtons: [
                "Get Free HVAC Quote",
                "Schedule Service Call",
                "Call for Emergency Repair",
                "Request System Inspection"
            ]
        },
        'painting': {
            headlines: [
                "Professional Painting Services in [City]",
                "Quality Interior & Exterior Painting",
                "Licensed Painting Contractors",
                "Transform Your Space with Professional Painting"
            ],
            subheadlines: [
                "Quality painting services for homes and businesses",
                "Professional painters with attention to detail",
                "Licensed and insured painting contractors",
                "Beautiful, long-lasting paint finishes"
            ],
            ctaButtons: [
                "Get Free Painting Quote",
                "Schedule Color Consultation",
                "Request Painting Estimate",
                "Start Your Painting Project"
            ]
        },
        'roofing': {
            headlines: [
                "Professional Roofing Services in [City]",
                "Quality Roof Repairs & Replacements",
                "Licensed Roofing Contractors",
                "Protect Your Home with Expert Roofing"
            ],
            subheadlines: [
                "Quality roofing services you can depend on",
                "Licensed and insured roofing professionals",
                "From repairs to complete roof replacements",
                "Protecting your home with quality craftsmanship"
            ],
            ctaButtons: [
                "Get Free Roofing Quote",
                "Schedule Roof Inspection",
                "Call for Emergency Repair",
                "Request Roofing Estimate"
            ]
        }
    };

    return copyTemplates[industry] || {
        headlines: ["Professional Services You Can Trust"],
        subheadlines: ["Quality service with customer satisfaction guaranteed"],
        ctaButtons: ["Get Free Quote", "Contact Us Today", "Schedule Service"]
    };
}

setupAnimationDemos() {
    // Animation demos are handled by CSS animations
    // This could be extended for more complex demos
}

setupFileInputListeners() {
    // Setup listeners for existing file inputs
    document.querySelectorAll('input[type="file"]').forEach(input => {
        this.setupSingleFileInput(input);
    });

    // Setup observer for dynamically added file inputs
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    const fileInputs = node.querySelectorAll ? node.querySelectorAll('input[type="file"]') : [];
                    fileInputs.forEach(input => {
                        this.setupSingleFileInput(input);
                    });
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

setupSingleFileInput(input) {
    // Skip if already set up
    if (input.dataset.listenerAdded) return;
    
    // FIXED: Bind the context properly and store files correctly
    const boundHandler = (e) => {
        console.log('File input changed:', e.target.name);
        this.handleImageUpload(e);
    };
    
    // Add new listener
    input.addEventListener('change', boundHandler);
    input.dataset.listenerAdded = 'true';
    
    // Make the upload area clickable
    const uploadArea = input.closest('.image-upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('click', (e) => {
            if (e.target === uploadArea || e.target.closest('.upload-placeholder')) {
                input.click();
            }
        });
        
        // Add drag and drop functionality
        this.setupDragAndDrop(uploadArea, input);
    }
}

setupDragAndDrop(uploadArea, input) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            // Create a new FileList-like object
            const dt = new DataTransfer();
            Array.from(files).forEach(file => dt.items.add(file));
            input.files = dt.files;
            
            // Trigger change event
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
}

// FIXED: Image upload handler
handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    console.log('File selected:', file.name); // Debug log

    // Validate file type
    if (!file.type.startsWith('image/')) {
        this.showNotification('Please select an image file (JPG, PNG, GIF, etc.)', 'error');
        event.target.value = '';
        return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        this.showNotification('Image file size must be less than 10MB', 'error');
        event.target.value = '';
        return;
    }

    // Store file for ZIP generation
    const fieldName = event.target.name;
    if (!this.uploadedFiles) {
        this.uploadedFiles = {};
    }
    this.uploadedFiles[fieldName] = file;
    console.log('File stored:', fieldName, file.name); // Debug log

    // Create preview
    this.createImagePreview(event.target, file);
    this.showNotification(`Image "${file.name}" uploaded successfully!`, 'success');
    
    // Save form data
    this.saveFormData();
}

// FIXED: Create image preview
createImagePreview(input, file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const uploadArea = input.closest('.image-upload-area');
        if (!uploadArea) return;

        // Remove old preview
        const oldPreview = uploadArea.nextElementSibling;
        if (oldPreview && oldPreview.classList.contains('image-preview')) {
            oldPreview.remove();
        }

        // Truncate long filenames
        const displayName = file.name.length > 30 ? 
            file.name.substring(0, 27) + '...' : 
            file.name;

        // Create new preview with clean styling
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = `
            <div class="preview-container">
                <div class="preview-image-wrapper">
                    <img src="${e.target.result}" class="preview-image" alt="Preview">
                </div>
                <div class="preview-details">
                    <div class="preview-filename" title="${file.name}">${displayName}</div>
                    <div class="preview-filesize">${this.formatFileSize(file.size)}</div>
                    <div class="preview-status">✓ Uploaded successfully</div>
                </div>
                <button type="button" class="preview-remove-btn" title="Remove image">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Add remove functionality
        const removeBtn = preview.querySelector('.preview-remove-btn');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            input.value = '';
            preview.remove();
            
            // Reset upload area
            const placeholder = uploadArea.querySelector('.upload-placeholder p');
            if (placeholder) {
                placeholder.textContent = 'Click to upload your about image';
                placeholder.style.color = '';
            }
            
            if (window.templateBuilder) {
                window.templateBuilder.showNotification('Image removed', 'info');
                window.templateBuilder.saveFormData();
            }
        });

        // Insert preview after upload area
        uploadArea.parentNode.insertBefore(preview, uploadArea.nextSibling);

        // Update upload area text
        const placeholder = uploadArea.querySelector('.upload-placeholder p');
        if (placeholder) {
            placeholder.textContent = '✓ Image uploaded successfully';
            placeholder.style.color = '#10b981';
        }
    };

    reader.onerror = () => {
        if (window.templateBuilder) {
            window.templateBuilder.showNotification('Error reading file', 'error');
        }
    };

    reader.readAsDataURL(file);
}

formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add this method to your TemplateBuilder class
setupStyleAndIconSelections() {
    // Handle image style selections
    document.querySelectorAll('input[name="imageStyle"]').forEach(input => {
        input.addEventListener('change', function() {
            // Remove selected class from all image style options
            document.querySelectorAll('.style-example').forEach(example => {
                example.classList.remove('selected');
            });
            
            // Add selected class to checked option
            if (this.checked) {
                const container = this.closest('.style-example');
                if (container) {
                    container.classList.add('selected');
                }
            }
        });
    });

    // Handle icon style selections
    document.querySelectorAll('input[name="iconStyle"]').forEach(input => {
        input.addEventListener('change', function() {
            // Remove selected class from all icon style options
            document.querySelectorAll('.icon-example').forEach(example => {
                example.classList.remove('selected');
            });
            
            // Add selected class to checked option
            if (this.checked) {
                const container = this.closest('.icon-example');
                if (container) {
                    container.classList.add('selected');
                }
            }
        });
    });
}

    setupAnimationDemos() {
        // Start animation demos when section becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAnimationDemos(entry.target);
                }
            });
        });

        document.querySelectorAll('.animation-demo').forEach(demo => {
            observer.observe(demo);
        });
    }

    startAnimationDemos(section) {
        // Animation demos are handled by CSS animations
        // This could be extended for more complex demos
    }

    // Navigation Methods
    nextSection() {
        if (this.validateCurrentSection()) {
            if (this.currentSection < this.totalSections) {
                this.currentSection++;
                this.showSection(this.currentSection);
                this.updateProgress();
                this.updateNavigation();
                this.scrollToTop();
            }
        }
    }

    previousSection() {
        if (this.currentSection > 1) {
            this.currentSection--;
            this.showSection(this.currentSection);
            this.updateProgress();
            this.updateNavigation();
            this.scrollToTop();
        }
    }

    goToSection(sectionNumber) {
        if (sectionNumber >= 1 && sectionNumber <= this.totalSections) {
            this.currentSection = sectionNumber;
            this.showSection(this.currentSection);
            this.updateProgress();
            this.updateNavigation();
            this.scrollToTop();
        }
    }

    showSection(sectionNumber) {
        // Hide all sections
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show current section
        const currentSection = document.querySelector(`[data-section="${sectionNumber}"]`);
        if (currentSection) {
            currentSection.classList.add('active');
        }

        // Update section indicators
        document.querySelectorAll('.indicator-item').forEach(indicator => {
            indicator.classList.remove('active');
            if (parseInt(indicator.dataset.section) === sectionNumber) {
                indicator.classList.add('active');
            }
            if (parseInt(indicator.dataset.section) < sectionNumber) {
                indicator.classList.add('completed');
            } else {
                indicator.classList.remove('completed');
            }
        });
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progress = (this.currentSection / this.totalSections) * 100;
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        // Previous button
        if (prevBtn) {
            prevBtn.disabled = this.currentSection === 1;
        }

        // Next/Submit button
        if (this.currentSection === this.totalSections) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'flex';
        } else {
            if (nextBtn) nextBtn.style.display = 'flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Validation Methods
    validateCurrentSection() {
        const requiredFields = this.requiredFields[this.currentSection] || [];
        let isValid = true;
        const errors = [];

        requiredFields.forEach(fieldName => {
            const field = document.querySelector(`[name="${fieldName}"]`);
            if (!field) return;

            // Handle different input types
            if (field.type === 'radio') {
                const radioGroup = document.querySelectorAll(`[name="${fieldName}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    isValid = false;
                    errors.push(this.getFieldLabel(fieldName));
                    this.markFieldAsError(radioGroup[0]);
                } else {
                    this.markFieldAsValid(radioGroup[0]);
                }
            } else if (field.type === 'checkbox') {
                const checkboxGroup = document.querySelectorAll(`[name="${fieldName}"]`);
                const isChecked = Array.from(checkboxGroup).some(checkbox => checkbox.checked);
                if (!isChecked) {
                    isValid = false;
                    errors.push(this.getFieldLabel(fieldName));
                    this.markFieldAsError(checkboxGroup[0]);
                } else {
                    this.markFieldAsValid(checkboxGroup[0]);
                }
            } else {
                if (!field.value.trim()) {
                    isValid = false;
                    errors.push(this.getFieldLabel(fieldName));
                    this.markFieldAsError(field);
                } else {
                    this.markFieldAsValid(field);
                }
            }
        });

        if (!isValid) {
            this.showValidationErrors(errors);
        }

        return isValid;
    }

    getFieldLabel(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (!field) return fieldName;

        const label = field.closest('.form-group')?.querySelector('label');
        return label ? label.textContent.replace('*', '').trim() : fieldName;
    }

    markFieldAsError(field) {
        const formGroup = field.closest('.form-group') || field.closest('.checkbox-grid');
        if (formGroup) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
        }
    }

    markFieldAsValid(field) {
        const formGroup = field.closest('.form-group') || field.closest('.checkbox-grid');
        if (formGroup) {
            formGroup.classList.add('success');
            formGroup.classList.remove('error');
        }
    }

    showValidationErrors(errors) {
        // Remove existing error messages
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());

        // Show new error messages
        errors.forEach(error => {
            this.showNotification(`Please fill in: ${error}`, 'error');
        });

        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    isSectionCompleted(sectionNumber) {
        const requiredFields = this.requiredFields[sectionNumber] || [];
        return requiredFields.every(fieldName => {
            const field = document.querySelector(`[name="${fieldName}"]`);
            if (!field) return true;

            if (field.type === 'radio' || field.type === 'checkbox') {
                const group = document.querySelectorAll(`[name="${fieldName}"]`);
                return Array.from(group).some(input => input.checked);
            }
            return field.value.trim() !== '';
        });
    }

    // Dynamic Content Methods
    addServiceItem() {
    const servicesList = document.querySelector('.services-list');
    const serviceCount = servicesList.querySelectorAll('.service-card').length;
    const newServiceNumber = serviceCount + 1;

    const serviceHTML = `
        <div class="service-card">
            <div class="service-header">
                <div class="service-number">
                    <i class="fas fa-star"></i>
                    <span>Service ${newServiceNumber}</span>
                </div>
                <div class="service-optional">Optional</div>
            </div>
            
            <div class="service-content">
                <div class="service-basic-info">
                    <div class="input-group">
                        <label for="service${newServiceNumber}Name">Service Name</label>
                        <input type="text" id="service${newServiceNumber}Name" name="service${newServiceNumber}Name" 
                               placeholder="e.g., Premium Service">
                    </div>
                    <div class="input-group price-input">
                        <label for="service${newServiceNumber}Price">Price</label>
                        <input type="text" id="service${newServiceNumber}Price" name="service${newServiceNumber}Price" 
                               placeholder="e.g., $99.99">
                    </div>
                </div>
                
                <div class="service-description">
                    <label for="service${newServiceNumber}Description">Service Description</label>
                    <textarea id="service${newServiceNumber}Description" name="service${newServiceNumber}Description" 
                              placeholder="Describe what this service includes and what makes it special..." 
                              rows="3"></textarea>
                </div>
                
                <div class="service-image-section">
                    <div class="image-upload-wrapper">
                        <label>Service Image</label>
                        <div class="image-upload-area compact">
                            <input type="file" id="service${newServiceNumber}Image" name="service${newServiceNumber}Image" accept="image/*">
                            <div class="upload-placeholder">
                                <i class="fas fa-image"></i>
                                <span>Upload Image</span>
                            </div>
                        </div>
                    </div>
                    <div class="image-description-wrapper">
                        <label>Or describe the image you want</label>
                        <input type="text" id="service${newServiceNumber}ImageDesc" name="service${newServiceNumber}ImageDesc" 
                               placeholder="e.g., Before/after photos, team working" 
                               class="image-description-input">
                    </div>
                </div>
                
                <div class="service-actions">
                    <button type="button" class="remove-service-btn" onclick="this.closest('.service-card').remove()">
                        <i class="fas fa-trash"></i> Remove Service
                    </button>
                </div>
            </div>
        </div>
    `;

    const addButton = servicesList.querySelector('.add-service-btn');
    addButton.insertAdjacentHTML('beforebegin', serviceHTML);

    // Setup event listeners for new fields
    const newServiceCard = servicesList.querySelector('.service-card:nth-last-child(2)');
    newServiceCard.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('change', () => this.saveFormData());
        input.addEventListener('input', () => this.saveFormData());
    });

    // Setup file input for new service
    const newFileInput = newServiceCard.querySelector('input[type="file"]');
    this.setupSingleFileInput(newFileInput);

    this.showNotification('New service added!', 'success');
    
    // Scroll to new service
    newServiceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

    addTestimonialItem() {
        const testimonialsList = document.querySelector('.testimonials-list');
        const testimonialCount = testimonialsList.querySelectorAll('.testimonial-item').length;
        const newTestimonialNumber = testimonialCount + 1;

        const testimonialHTML = `
            <div class="testimonial-item">
                <h5>Testimonial ${newTestimonialNumber}</h5>
                <div class="form-group">
                    <label for="testimonial${newTestimonialNumber}Quote">Customer Quote</label>
                    <textarea id="testimonial${newTestimonialNumber}Quote" name="testimonial${newTestimonialNumber}Quote" placeholder="What did the customer say about your service?"></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="testimonial${newTestimonialNumber}Name">Customer Name</label>
                        <input type="text" id="testimonial${newTestimonialNumber}Name" name="testimonial${newTestimonialNumber}Name" placeholder="e.g., Jane Doe">
                    </div>
                    <div class="form-group">
                        <label for="testimonial${newTestimonialNumber}Title">Customer Title/Company</label>
                        <input type="text" id="testimonial${newTestimonialNumber}Title" name="testimonial${newTestimonialNumber}Title" placeholder="e.g., CEO, XYZ Company">
                    </div>
                </div>
                <div class="form-group">
                    <label for="testimonial${newTestimonialNumber}Photo">Customer Photo</label>
                    <input type="file" id="testimonial${newTestimonialNumber}Photo" name="testimonial${newTestimonialNumber}Photo" accept="image/*">
                    <small class="help-text">Optional - leave blank for placeholder</small>
                </div>
                <button type="button" class="remove-testimonial-btn" onclick="this.closest('.testimonial-item').remove()">
                    <i class="fas fa-trash"></i> Remove Testimonial
                </button>
            </div>
        `;

        const addButton = testimonialsList.querySelector('.add-testimonial-btn');
        addButton.insertAdjacentHTML('beforebegin', testimonialHTML);

        // Setup event listeners for new fields
        const newTestimonialItem = testimonialsList.querySelector('.testimonial-item:nth-last-child(2)');
        newTestimonialItem.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('change', () => this.saveFormData());
            input.addEventListener('input', () => this.saveFormData());
        });

        this.showNotification('New testimonial added!', 'success');
    }

    addProjectItem() {
    const projectsList = document.querySelector('.before-after-projects');
    const projectCount = projectsList.querySelectorAll('.project-card').length;
    const newProjectNumber = projectCount + 1;

    const projectHTML = `
        <div class="project-card">
            <div class="project-header">
                <div class="project-number">
                    <i class="fas fa-hammer"></i>
                    <span>Project ${newProjectNumber}</span>
                </div>
                <div class="project-optional">Optional</div>
            </div>
            
            <div class="project-content">
                <div class="project-basic-info">
                    <div class="input-group">
                        <label for="project${newProjectNumber}Name">Project Name</label>
                        <input type="text" id="project${newProjectNumber}Name" name="project${newProjectNumber}Name" 
                               placeholder="e.g., Kitchen Renovation, Bathroom Remodel">
                    </div>
                    <div class="input-group">
                        <label for="project${newProjectNumber}Category">Project Category</label>
                        <select id="project${newProjectNumber}Category" name="project${newProjectNumber}Category">
                            <option value="">Select category</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="bathroom">Bathroom</option>
                            <option value="exterior">Exterior</option>
                            <option value="landscaping">Landscaping</option>
                            <option value="electrical">Electrical Work</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="hvac">HVAC</option>
                            <option value="painting">Painting</option>
                            <option value="roofing">Roofing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div class="project-description">
                    <label for="project${newProjectNumber}Description">Project Description</label>
                    <textarea id="project${newProjectNumber}Description" name="project${newProjectNumber}Description" 
                              placeholder="Describe what was done in this project..." 
                              rows="3"></textarea>
                </div>
                
                <div class="before-after-images">
                    <div class="image-pair">
                        <div class="before-image">
                            <label>Before Image</label>
                            <div class="image-upload-area compact">
                                <input type="file" id="project${newProjectNumber}Before" name="project${newProjectNumber}Before" accept="image/*">
                                <div class="upload-placeholder">
                                    <i class="fas fa-image"></i>
                                    <span>Before</span>
                                </div>
                            </div>
                        </div>
                        <div class="after-image">
                            <label>After Image</label>
                            <div class="image-upload-area compact">
                                <input type="file" id="project${newProjectNumber}After" name="project${newProjectNumber}After" accept="image/*">
                                <div class="upload-placeholder">
                                    <i class="fas fa-image"></i>
                                    <span>After</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="project-actions">
                    <button type="button" class="remove-project-btn" onclick="this.closest('.project-card').remove()">
                        <i class="fas fa-trash"></i> Remove Project
                    </button>
                </div>
            </div>
        </div>
    `;

    const addButton = projectsList.querySelector('.add-project-btn');
    addButton.insertAdjacentHTML('beforebegin', projectHTML);

    // Setup event listeners for new fields
    const newProjectCard = projectsList.querySelector('.project-card:nth-last-child(2)');
    newProjectCard.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('change', () => this.saveFormData());
        input.addEventListener('input', () => this.saveFormData());
    });

    // Setup file inputs for new project
    const beforeFileInput = newProjectCard.querySelector(`input[name="project${newProjectNumber}Before"]`);
    const afterFileInput = newProjectCard.querySelector(`input[name="project${newProjectNumber}After"]`);
    this.setupSingleFileInput(beforeFileInput);
    this.setupSingleFileInput(afterFileInput);

    this.showNotification('New project added!', 'success');
    
    // Scroll to new project
    newProjectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

    toggleHeroBackgroundFields() {
        const selectedType = document.querySelector('input[name="heroBackgroundType"]:checked')?.value;
        const imageUpload = document.getElementById('heroImageUpload');
        const videoUpload = document.getElementById('heroVideoUpload');

        if (imageUpload && videoUpload) {
            imageUpload.style.display = selectedType === 'image' ? 'block' : 'none';
            videoUpload.style.display = selectedType === 'video' ? 'block' : 'none';
        }
    }

    toggleCustomIconsField() {
        const selectedStyle = document.querySelector('input[name="iconStyle"]:checked')?.value;
        const customIconsUpload = document.getElementById('customIconsUpload');

        if (customIconsUpload) {
            customIconsUpload.style.display = selectedStyle === 'custom-icons' ? 'block' : 'none';
        }
    }

    // File Upload Methods
    handleImageUpload(event) {
    console.log('=== HANDLE IMAGE UPLOAD CALLED ===');
    console.log('Event target:', event.target);
    console.log('Field name:', event.target.name);
    console.log('Files:', event.target.files);
    
    const file = event.target.files[0];
    if (!file) {
        console.log('No file selected');
        return;
    }

    console.log('File selected:', file.name);

    // Validate file type
    if (!file.type.startsWith('image/')) {
        this.showNotification('Please select an image file', 'error');
        event.target.value = '';
        return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
        this.showNotification('Image too large (max 10MB)', 'error');
        event.target.value = '';
        return;
    }

    // FIXED: Properly store file for ZIP generation
    const fieldName = event.target.name;
    if (!this.uploadedFiles) {
        this.uploadedFiles = {};
    }
    
    // Store the actual file object
    this.uploadedFiles[fieldName] = file;
    console.log('File stored in uploadedFiles:', fieldName, file.name);
    console.log('Current uploadedFiles:', Object.keys(this.uploadedFiles));

    // Create preview
    this.createImagePreview(event.target, file);
    this.showNotification(`Image "${file.name}" uploaded successfully!`, 'success');
    this.saveFormData();
}

    createImagePreview(input, file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const uploadArea = input.closest('.image-upload-area');
        if (!uploadArea) return;

        // Check if this input supports multiple files
        const isMultiple = input.hasAttribute('multiple');
        
        if (isMultiple) {
            this.createMultipleImagePreview(uploadArea, input, file, e.target.result);
        } else {
            this.createSingleImagePreview(uploadArea, input, file, e.target.result);
        }
    };

    reader.onerror = () => {
        if (window.templateBuilder) {
            window.templateBuilder.showNotification('Error reading file', 'error');
        }
    };

    reader.readAsDataURL(file);
}

createSingleImagePreview(uploadArea, input, file, imageSrc) {
    // Remove old preview
    const oldPreview = uploadArea.nextElementSibling;
    if (oldPreview && oldPreview.classList.contains('image-preview')) {
        oldPreview.remove();
    }

    // Create clean single image preview
    const preview = document.createElement('div');
    preview.className = 'image-preview single';
    preview.innerHTML = `
        <div class="image-card">
            <div class="image-thumbnail">
                <img src="${imageSrc}" alt="Preview">
            </div>
            <div class="image-info">
                <div class="image-name">${this.truncateFilename(file.name)}</div>
                <div class="image-size">${this.formatFileSize(file.size)}</div>
            </div>
            <button type="button" class="remove-image" title="Remove image">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add remove functionality
    const removeBtn = preview.querySelector('.remove-image');
    removeBtn.addEventListener('click', () => {
        input.value = '';
        preview.remove();
        this.resetUploadArea(uploadArea);
        if (window.templateBuilder) {
            window.templateBuilder.showNotification('Image removed', 'info');
            window.templateBuilder.saveFormData();
        }
    });

    // Insert preview after upload area
    uploadArea.parentNode.insertBefore(preview, uploadArea.nextSibling);
    
    // Update upload area to show success state
    uploadArea.classList.add('has-files');
}

createMultipleImagePreview(uploadArea, input, file, imageSrc) {
    // Find or create gallery container
    let gallery = uploadArea.nextElementSibling;
    if (!gallery || !gallery.classList.contains('image-gallery')) {
        gallery = document.createElement('div');
        gallery.className = 'image-gallery';
        uploadArea.parentNode.insertBefore(gallery, uploadArea.nextSibling);
    }

    // Create image card
    const imageCard = document.createElement('div');
    imageCard.className = 'gallery-item';
    imageCard.innerHTML = `
        <div class="gallery-thumbnail">
            <img src="${imageSrc}" alt="Preview">
        </div>
        <div class="gallery-info">
            <div class="gallery-name">${this.truncateFilename(file.name)}</div>
            <div class="gallery-size">${this.formatFileSize(file.size)}</div>
        </div>
        <button type="button" class="remove-gallery-item" title="Remove image">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add remove functionality
    const removeBtn = imageCard.querySelector('.remove-gallery-item');
    removeBtn.addEventListener('click', () => {
        imageCard.remove();
        // If no more images, remove gallery
        if (gallery.children.length === 0) {
            gallery.remove();
            this.resetUploadArea(uploadArea);
        }
        if (window.templateBuilder) {
            window.templateBuilder.showNotification('Image removed', 'info');
            window.templateBuilder.saveFormData();
        }
    });

    gallery.appendChild(imageCard);
    this.updateUploadAreaSuccess(uploadArea);
}

truncateFilename(filename) {
    if (filename.length <= 25) return filename;
    
    const extension = filename.split('.').pop();
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(0, 20);
    
    return `${truncatedName}...${extension}`;
}

updateUploadAreaSuccess(uploadArea) {
    uploadArea.classList.add('has-files');
    const placeholder = uploadArea.querySelector('.upload-placeholder');
    if (placeholder) {
        placeholder.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Image uploaded!</span>
        `;
    }
}

resetUploadArea(uploadArea) {
    uploadArea.classList.remove('has-files');
    const placeholder = uploadArea.querySelector('.upload-placeholder');
    if (placeholder) {
        placeholder.innerHTML = `
            <i class="fas fa-image"></i>
            <span>Upload Image</span>
        `;
    }
}

    // Data Management Methods
    saveFormData() {
    const formData = new FormData(document.getElementById('websiteTemplate'));
    const data = {};

    // Convert FormData to regular object
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }

    // FIXED: Preserve uploaded files - don't lose them during form data save
    if (this.uploadedFiles && Object.keys(this.uploadedFiles).length > 0) {
        console.log('Preserving uploaded files during save:', Object.keys(this.uploadedFiles));
        // Files are kept in this.uploadedFiles separately from form data
        // This prevents them from being lost during form serialization
    }

    // Save to localStorage (excluding file objects)
    const dataToSave = { ...data };
    // Remove file objects from localStorage data (they can't be serialized)
    Object.keys(dataToSave).forEach(key => {
        if (dataToSave[key] instanceof File) {
            delete dataToSave[key];
        }
    });
    
    localStorage.setItem('websiteTemplateData', JSON.stringify(dataToSave));
    this.formData = data;
}

    loadSavedData() {
        const savedData = localStorage.getItem('websiteTemplateData');
        if (!savedData) return;

        try {
            this.formData = JSON.parse(savedData);
            this.populateForm(this.formData);
            this.showNotification('Previous data loaded', 'success');
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }

    populateForm(data) {
        Object.keys(data).forEach(key => {
            const field = document.querySelector(`[name="${key}"]`);
            if (!field) return;

            if (field.type === 'radio') {
                const radioButton = document.querySelector(`[name="${key}"][value="${data[key]}"]`);
                if (radioButton) radioButton.checked = true;
            } else if (field.type === 'checkbox') {
                const values = Array.isArray(data[key]) ? data[key] : [data[key]];
                values.forEach(value => {
                    const checkbox = document.querySelector(`[name="${key}"][value="${value}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            } else {
                field.value = data[key];
            }
        });
    }

    clearSavedData() {
        localStorage.removeItem('websiteTemplateData');
        this.formData = {};
        document.getElementById('websiteTemplate').reset();
        this.showNotification('Form data cleared', 'success');
    }

    // Form Submission
    async submitForm(event) {
    event.preventDefault();

    if (!this.validateCurrentSection()) {
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Package...';
    submitBtn.disabled = true;

    try {
        // Collect all form data
        this.saveFormData();
        const templateData = this.prepareTemplateData();

        // Generate ZIP package
        await this.generateZipPackage(templateData);

        this.showNotification('Website package downloaded successfully!', 'success');

    } catch (error) {
        console.error('Error creating package:', error);
        this.showNotification('Error creating package. Please try again.', 'error');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

    prepareTemplateData() {
        // Process and organize the form data for template generation
        const data = { ...this.formData };
        
        // Add metadata
        data.timestamp = new Date().toISOString();
        data.version = '1.0';
        
        // Process services
        data.services = this.extractServices();
        
        // Process testimonials
        data.testimonials = this.extractTestimonials();
        
        // Process selected pages
        data.selectedPages = this.extractSelectedPages();
        
        // Process animations
        data.selectedAnimations = this.extractSelectedAnimations();
        
        return data;
    }

    extractServices() {
        const services = [];
        let serviceIndex = 1;
        
        while (this.formData[`service${serviceIndex}Name`]) {
            services.push({
                name: this.formData[`service${serviceIndex}Name`],
                price: this.formData[`service${serviceIndex}Price`] || '',
                description: this.formData[`service${serviceIndex}Description`] || '',
                image: this.formData[`service${serviceIndex}Image`] || null
            });
            serviceIndex++;
        }
        
        return services;
    }

    extractTestimonials() {
        const testimonials = [];
        let testimonialIndex = 1;
        
        while (this.formData[`testimonial${testimonialIndex}Quote`]) {
            testimonials.push({
                quote: this.formData[`testimonial${testimonialIndex}Quote`],
                name: this.formData[`testimonial${testimonialIndex}Name`] || '',
                title: this.formData[`testimonial${testimonialIndex}Title`] || '',
                photo: this.formData[`testimonial${testimonialIndex}Photo`] || null
            });
            testimonialIndex++;
        }
        
        return testimonials;
    }

    extractSelectedPages() {
        const pages = this.formData.pages;
        return Array.isArray(pages) ? pages : (pages ? [pages] : []);
    }

    extractSelectedAnimations() {
        const animations = this.formData.scrollAnimations;
        return Array.isArray(animations) ? animations : (animations ? [animations] : []);
    }

    showTemplateResults(templateData) {
        // Create results modal or new section
        const resultsHTML = `
            <div class="template-results-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2><i class="fas fa-check-circle"></i> Template Generated Successfully!</h2>
                        <button class="close-modal" onclick="this.closest('.template-results-modal').remove()">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="results-summary">
                            <h3>Your Website Template Summary:</h3>
                            <div class="summary-grid">
                                <div class="summary-item">
                                    <strong>Business:</strong> ${templateData.businessName}
                                </div>
                                <div class="summary-item">
                                    <strong>Industry:</strong> ${templateData.industry}
                                </div>
                                <div class="summary-item">
                                    <strong>Style:</strong> ${templateData.brandPersonality}
                                </div>
                                <div class="summary-item">
                                    <strong>Pages:</strong> ${this.extractSelectedPages().join(', ')}
                                </div>
                                <div class="summary-item">
                                    <strong>Services:</strong> ${templateData.services.length} services
                                </div>
                                <div class="summary-item">
                                    <strong>Color Scheme:</strong> ${templateData.colorMood}
                                </div>
                            </div>
                        </div>
                        <div class="next-steps">
                            <h3>Next Steps:</h3>
                            <ol>
                                <li>Download your template data</li>
                                <li>Send the data to your developer</li>
                                <li>Review the generated website</li>
                                <li>Request any modifications</li>
                            </ol>
                        </div>
                        <div class="action-buttons">
                            <button class="download-btn" onclick="templateBuilder.downloadTemplateData()">
                                <i class="fas fa-download"></i> Download Template Data
                            </button>
                            <button class="copy-btn" onclick="templateBuilder.copyTemplateData()">
                                <i class="fas fa-copy"></i> Copy to Clipboard
                            </button>
                            <button class="email-btn" onclick="templateBuilder.emailTemplateData()">
                                <i class="fas fa-envelope"></i> Email Template
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', resultsHTML);
        
        // Store template data for download
        this.finalTemplateData = templateData;
    }

    downloadTemplateData() {
        const dataStr = JSON.stringify(this.finalTemplateData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `${this.formData.businessName || 'website'}-template-${Date.now()}.json`;
        link.click();
        
        this.showNotification('Template data downloaded!', 'success');
    }

    copyTemplateData() {
        const dataStr = JSON.stringify(this.finalTemplateData, null, 2);
        navigator.clipboard.writeText(dataStr).then(() => {
            this.showNotification('Template data copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy data', 'error');
        });
    }

    emailTemplateData() {
        const subject = encodeURIComponent(`Website Template for ${this.formData.businessName}`);
        const body = encodeURIComponent(`Hi,

Please find my website template specifications below:

Business: ${this.formData.businessName}
Industry: ${this.formData.industry}
Style: ${this.formData.brandPersonality}

Full template data is attached/included below.

Thanks!`);
        
        window.open(`mailto:?subject=${subject}&body=${body}`);
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentNode.parentNode.remove()">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

   sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Theme Toggle Methods
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('templateBuilderTheme') || 'light';
        this.setTheme(savedTheme);
        
        // Theme toggle click handler
        themeToggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            
            // Save preference
            localStorage.setItem('templateBuilderTheme', newTheme);
            
            // Show notification
            this.showNotification(`Switched to ${newTheme} mode`, 'success');
        });
    }

    setTheme(theme) {
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-lightbulb';
            themeIcon.parentElement.title = 'Switch to light mode';
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
            themeIcon.parentElement.title = 'Switch to dark mode';
        }
    }
}
// ZIP Package Generation
async generateZipPackage(templateData) {
    const zip = new JSZip();
    const businessName = templateData.businessName || 'website';
    const cleanBusinessName = businessName.toLowerCase().replace(/[^a-z0-9]/g, '-');

    // Debug: Check what files we have
    console.log('Uploaded files:', this.uploadedFiles);
    console.log('Template data:', templateData);

    // Create organized template data with file paths
    const organizedData = await this.organizeTemplateData(templateData, zip);

    // Add the organized JSON file
    zip.file('template-data.json', JSON.stringify(organizedData, null, 2));

    // Add instructions file
    const instructions = this.generateInstructions(organizedData);
    zip.file('instructions.txt', instructions);

    // Add README file
    const readme = this.generateReadme(organizedData);
    zip.file('README.md', readme);

    // Generate and download the ZIP
    const content = await zip.generateAsync({ type: 'blob' });
    this.downloadFile(content, `${cleanBusinessName}-website-package.zip`);
}

async organizeTemplateData(templateData, zip) {
    console.log('=== ORGANIZING TEMPLATE DATA ===');
    console.log('Available uploaded files:', Object.keys(this.uploadedFiles || {}));
    const organized = { ...templateData };
    let filesAdded = 0;
    const imageFolder = zip.folder('images');

    // FIXED: Process logo with better error handling
if (this.uploadedFiles && this.uploadedFiles.logoUpload) {
    try {
        const logoFile = this.uploadedFiles.logoUpload;
        console.log('Processing logo:', logoFile.name);
        const logoExtension = this.getFileExtension(logoFile.name);
        const logoFileName = `logo${logoExtension}`;
        
        // Add file to ZIP
        imageFolder.file(logoFileName, logoFile);
        organized.logoUpload = `images/${logoFileName}`;
        filesAdded++;
        console.log('✓ Logo added to ZIP:', logoFileName);
    } catch (error) {
        console.error('Error processing logo:', error);
    }
}

    // FIXED: Process hero background with better error handling
if (this.uploadedFiles && this.uploadedFiles.heroImage) {
    try {
        const heroFile = this.uploadedFiles.heroImage;
        console.log('Processing hero image:', heroFile.name);
        const heroExtension = this.getFileExtension(heroFile.name);
        const heroFileName = `hero-background${heroExtension}`;
        
        // Add file to ZIP
        imageFolder.file(heroFileName, heroFile);
        organized.heroImage = `images/${heroFileName}`;
        filesAdded++;
        console.log('✓ Hero image added to ZIP:', heroFileName);
    } catch (error) {
        console.error('Error processing hero image:', error);
    }
}

    // FIXED: Process about image with better error handling
if (this.uploadedFiles && this.uploadedFiles.aboutImage) {
    try {
        const aboutFile = this.uploadedFiles.aboutImage;
        console.log('Processing about image:', aboutFile.name);
        const aboutExtension = this.getFileExtension(aboutFile.name);
        const aboutFileName = `about-us${aboutExtension}`;
        
        // Add file to ZIP
        imageFolder.file(aboutFileName, aboutFile);
        organized.aboutImage = `images/${aboutFileName}`;
        filesAdded++;
        console.log('✓ About image added to ZIP:', aboutFileName);
    } catch (error) {
        console.error('Error processing about image:', error);
    }
}

    // FIXED: Process service images with better error handling
if (organized.services && organized.services.length > 0) {
    organized.services.forEach((service, index) => {
        const serviceKey = `service${index + 1}Image`;
        if (this.uploadedFiles && this.uploadedFiles[serviceKey]) {
            try {
                const serviceFile = this.uploadedFiles[serviceKey];
                console.log(`Processing service ${index + 1} image:`, serviceFile.name);
                const serviceExtension = this.getFileExtension(serviceFile.name);
                const serviceName = (service.name || 'service').toLowerCase().replace(/[^a-z0-9]/g, '-');
                const serviceFileName = `service-${index + 1}-${serviceName}${serviceExtension}`;
                
                // Add file to ZIP
                imageFolder.file(serviceFileName, serviceFile);
                service.image = `images/${serviceFileName}`;
                organized[serviceKey] = `images/${serviceFileName}`;
                filesAdded++;
                console.log(`✓ Service ${index + 1} image added to ZIP:`, serviceFileName);
            } catch (error) {
                console.error(`Error processing service ${index + 1} image:`, error);
            }
        }
    });
}

    // FIXED: Process testimonial photos with better error handling
if (organized.testimonials && organized.testimonials.length > 0) {
    organized.testimonials.forEach((testimonial, index) => {
        const testimonialKey = `testimonial${index + 1}Photo`;
        if (this.uploadedFiles && this.uploadedFiles[testimonialKey]) {
            try {
                const testimonialFile = this.uploadedFiles[testimonialKey];
                console.log(`Processing testimonial ${index + 1} photo:`, testimonialFile.name);
                const testimonialExtension = this.getFileExtension(testimonialFile.name);
                const customerName = (testimonial.name || 'customer').toLowerCase().replace(/[^a-z0-9]/g, '-');
                const testimonialFileName = `testimonial-${index + 1}-${customerName}${testimonialExtension}`;
                
                // Add file to ZIP
                imageFolder.file(testimonialFileName, testimonialFile);
                testimonial.photo = `images/${testimonialFileName}`;
                organized[testimonialKey] = `images/${testimonialFileName}`;
                filesAdded++;
                console.log(`✓ Testimonial ${index + 1} photo added to ZIP:`, testimonialFileName);
            } catch (error) {
                console.error(`Error processing testimonial ${index + 1} photo:`, error);
            }
        }
    });
}

    // FIXED: Process gallery images with better error handling
if (this.uploadedFiles && this.uploadedFiles.galleryImages) {
    try {
        const galleryFiles = Array.isArray(this.uploadedFiles.galleryImages) 
            ? this.uploadedFiles.galleryImages 
            : [this.uploadedFiles.galleryImages];
        
        organized.galleryImages = [];
        galleryFiles.forEach((file, index) => {
            if (file && file.name) {
                try {
                    console.log(`Processing gallery image ${index + 1}:`, file.name);
                    const galleryExtension = this.getFileExtension(file.name);
                    const galleryFileName = `gallery-${index + 1}${galleryExtension}`;
                    
                    // Add file to ZIP
                    imageFolder.file(galleryFileName, file);
                    organized.galleryImages.push(`images/${galleryFileName}`);
                    filesAdded++;
                    console.log(`✓ Gallery image ${index + 1} added to ZIP:`, galleryFileName);
                } catch (error) {
                    console.error(`Error processing gallery image ${index + 1}:`, error);
                }
            }
        });
    } catch (error) {
        console.error('Error processing gallery images:', error);
    }
}

console.log(`=== ORGANIZATION COMPLETE ===`);
console.log(`Total files added to ZIP: ${filesAdded}`);
console.log('Organized data keys:', Object.keys(organized));

return organized;
}

getFileExtension(filename) {
    return filename.substring(filename.lastIndexOf('.'));
}

generateInstructions(templateData) {
    const businessName = templateData.businessName || 'Your Business';
    let instructions = `${businessName.toUpperCase()} WEBSITE PACKAGE\n`;
    instructions += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    instructions += `CONTENTS:\n`;
    instructions += `- template-data.json (all your website configuration)\n`;
    instructions += `- images/ folder (all uploaded images)\n`;
    instructions += `- README.md (how to use this package)\n\n`;
    instructions += `IMAGE FILES:\n\n`;

    if (templateData.logoUpload && templateData.logoUpload !== '{}') {
        instructions += `Logo: ${templateData.logoUpload}\n`;
        instructions += `- Use this as your website logo\n\n`;
    }

    if (templateData.heroImage && templateData.heroImage !== '{}') {
        instructions += `Hero Background: ${templateData.heroImage}\n`;
        instructions += `- Use this as the main banner background image\n\n`;
    }

    if (templateData.aboutImage && templateData.aboutImage !== '{}') {
        instructions += `About Section: ${templateData.aboutImage}\n`;
        instructions += `- Use this in the "${templateData.aboutHeadline || 'About'}" section\n\n`;
    }

    if (templateData.services && templateData.services.length > 0) {
        instructions += `Services:\n`;
        templateData.services.forEach((service, index) => {
            if (service.image && service.image !== '{}') {
                instructions += `- ${service.image} (for "${service.name}" service)\n`;
            }
        });
        instructions += `\n`;
    }

    if (templateData.testimonials && templateData.testimonials.length > 0) {
        instructions += `Testimonials:\n`;
        templateData.testimonials.forEach((testimonial, index) => {
            if (testimonial.photo && testimonial.photo !== '{}') {
                instructions += `- ${testimonial.photo} (photo of ${testimonial.name})\n`;
            }
        });
        instructions += `\n`;
    }

    if (templateData.galleryImages && templateData.galleryImages.length > 0) {
        instructions += `Gallery/Portfolio:\n`;
        templateData.galleryImages.forEach((image, index) => {
            if (image && image !== '{}') {
                instructions += `- ${image}\n`;
            }
        });
    }

    return instructions;
}

generateReadme(templateData) {
    const businessName = templateData.businessName || 'Your Business';
    return `# ${businessName} Website Package

This package contains everything needed to create a professional website for ${businessName}.

## Contents

- **template-data.json** - Complete website configuration and content
- **images/** - All uploaded images with descriptive filenames  
- **instructions.txt** - Detailed breakdown of what each image is for

## How to Use with AI

1. Upload this entire ZIP file to an AI chat (Claude, ChatGPT, etc.)
2. Ask the AI to create a complete website using this template data
3. The AI will have access to all your content, images, and preferences
4. Receive production-ready website code

## Template Summary

- **Business**: ${businessName}
- **Industry**: ${templateData.industry}
- **Style**: ${templateData.brandPersonality}
- **Color Scheme**: ${templateData.colorMood}
- **Pages**: ${templateData.selectedPages ? templateData.selectedPages.join(', ') : 'Multiple pages'}
- **Services**: ${templateData.services ? templateData.services.length : 0} services listed

## Next Steps

Send this package to your web developer or AI assistant with the message:
"Please create a complete, professional website using this template data and images."

Generated by Website Template Builder
${new Date().toLocaleDateString()}
`;
}

downloadFile(content, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
}

// Initialize the template builder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.templateBuilder = new TemplateBuilder();
});

// Add notification styles
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    animation: slideInRight 0.3s ease;
}

.notification-success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
}

.notification-error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
}

.notification-info {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
}

.notification-content {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 12px;
}

.notification-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 18px;
    cursor: pointer;
    margin-left: auto;
    opacity: 0.8;
}

.notification-close:hover {
    opacity: 1;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.template-results-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    margin: 20px;
}

.modal-header {
    padding: 24px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-header h2 {
    color: #10b981;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.close-modal {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6b7280;
}

.modal-body {
    padding: 24px;
}

.summary-grid {
    display: grid;
    gap: 12px;
    margin: 16px 0;
}

.summary-item {
    padding: 12px;
    background: #f9fafb;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
}

.next-steps {
    margin: 24px 0;
}

.next-steps ol {
    padding-left: 20px;
}

.next-steps li {
    margin: 8px 0;
}

.action-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 24px;
}

.download-btn, .copy-btn, .email-btn {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.download-btn {
    background: #10b981;
    color: white;
}

.copy-btn {
    background: #3b82f6;
    color: white;
}

.email-btn {
    background: #f59e0b;
    color: white;
}

.download-btn:hover, .copy-btn:hover, .email-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.remove-service-btn, .remove-testimonial-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.remove-service-btn:hover, .remove-testimonial-btn:hover {
    background: #dc2626;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Global function for adding projects
function addNewProject() {
    console.log('addNewProject called!');
    
    // Try multiple selectors to find the projects container
let projectsList = document.querySelector('.before-after-projects');
if (!projectsList) {
    projectsList = document.querySelector('#beforeAfterProjects');
}
if (!projectsList) {
    projectsList = document.querySelector('.before-after-gallery');
}

console.log('Projects container found:', projectsList);

if (!projectsList) {
    console.error('Could not find projects container!');
    alert('Error: Could not find projects container');
    return;
}

const projectCount = projectsList.querySelectorAll('.project-card').length;
const newProjectNumber = projectCount + 1;

    const projectHTML = `
        <div class="project-card">
            <div class="project-header">
                <div class="project-number">
                    <i class="fas fa-hammer"></i>
                    <span>Project ${newProjectNumber}</span>
                </div>
                <div class="project-optional">Optional</div>
            </div>
            
            <div class="project-content">
                <div class="project-basic-info">
                    <div class="input-group">
                        <label for="project${newProjectNumber}Name">Project Name</label>
                        <input type="text" id="project${newProjectNumber}Name" name="project${newProjectNumber}Name" 
                               placeholder="e.g., Kitchen Renovation, Bathroom Remodel">
                    </div>
                    <div class="input-group">
                        <label for="project${newProjectNumber}Category">Project Category</label>
                        <select id="project${newProjectNumber}Category" name="project${newProjectNumber}Category">
                            <option value="">Select category</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="bathroom">Bathroom</option>
                            <option value="exterior">Exterior</option>
                            <option value="landscaping">Landscaping</option>
                            <option value="electrical">Electrical Work</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="hvac">HVAC</option>
                            <option value="painting">Painting</option>
                            <option value="roofing">Roofing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div class="project-description">
                    <label for="project${newProjectNumber}Description">Project Description</label>
                    <textarea id="project${newProjectNumber}Description" name="project${newProjectNumber}Description" 
                              placeholder="Describe what was done in this project..." 
                              rows="3"></textarea>
                </div>
                
                <div class="before-after-images">
                    <div class="image-pair">
                        <div class="before-image">
                            <label>Before Image</label>
                            <div class="image-upload-area compact">
                                <input type="file" id="project${newProjectNumber}Before" name="project${newProjectNumber}Before" accept="image/*">
                                <div class="upload-placeholder">
                                    <i class="fas fa-image"></i>
                                    <span>Before</span>
                                </div>
                            </div>
                        </div>
                        <div class="after-image">
                            <label>After Image</label>
                            <div class="image-upload-area compact">
                                <input type="file" id="project${newProjectNumber}After" name="project${newProjectNumber}After" accept="image/*">
                                <div class="upload-placeholder">
                                    <i class="fas fa-image"></i>
                                    <span>After</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="project-actions">
                    <button type="button" class="remove-project-btn" onclick="this.closest('.project-card').remove()">
                        <i class="fas fa-trash"></i> Remove Project
                    </button>
                </div>
            </div>
        </div>
    `;

    // Insert the new project at the end of the projects container
projectsList.insertAdjacentHTML('beforeend', projectHTML);

    // Setup file inputs for new project
    const newProjectCard = projectsList.querySelector('.project-card:nth-last-child(2)');
    const beforeFileInput = newProjectCard.querySelector(`input[name="project${newProjectNumber}Before"]`);
    const afterFileInput = newProjectCard.querySelector(`input[name="project${newProjectNumber}After"]`);
    
    // Setup file input listeners
    if (window.templateBuilder) {
        window.templateBuilder.setupSingleFileInput(beforeFileInput);
        window.templateBuilder.setupSingleFileInput(afterFileInput);
    }

    // Show success message
    if (window.templateBuilder) {
        window.templateBuilder.showNotification('New project added!', 'success');
    }
    
    // Scroll to new project
    newProjectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    console.log('New project added successfully!');
}
