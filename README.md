# Conditional Fields Custom Element for Kontent.ai

A powerful custom element that demonstrates conditional field functionality in Kontent.ai. This element shows and hides form fields based on user selections, creating dynamic and intuitive content editing experiences.

## Features

- **Dynamic Field Visibility**: Fields appear and disappear based on user selections
- **Nested Conditionals**: Multi-level conditional logic for complex forms
- **Real-time Updates**: Instant feedback and summary generation
- **Native Kontent.ai Styling**: Uses official @kontent-ai/stylekit for consistent UI
- **Professional UI**: Modern, responsive design with smooth animations
- **Kontent.ai Integration**: Full integration with Custom Elements API
- **Accessibility**: Proper focus management and keyboard navigation

## Demo

The custom element includes several conditional field examples:

### Main Trigger Field
- **Content Type Selection**: Choose between Article, Product, Event, or Other

### Article Fields (appears when "Article" is selected)
- **Article Category**: News, Tutorial, or Review
- **Article Length**: Short, Medium, or Long
- **Author Fields**: Name and Bio (appears when "Tutorial" is selected)

### Product Fields (appears when "Product" is selected)
- **Product Type**: Physical, Digital, or Service
- **Price**: Numeric input
- **Physical Product Fields**: Weight and Dimensions (appears when "Physical" is selected)
- **Digital Product Fields**: File Size and Download Format (appears when "Digital" is selected)

### Event Fields (appears when "Event" is selected)
- **Event Date**: Date picker
- **Event Type**: Conference, Workshop, Webinar, or Meetup
- **Conference Fields**: Venue and Capacity (appears when "Conference" is selected)
- **Webinar Fields**: Platform and Registration URL (appears when "Webinar" is selected)

### Other Fields (appears when "Other" is selected)
- **Custom Type**: Free text input
- **Description**: Textarea for additional details

## Installation

### 1. Install Dependencies

```bash
npm install @kontent-ai/stylekit
```

### 2. Host the Files

Upload the following files to a web server or hosting service:
- `index.html`
- `script.js`
- `styles.css`
- `config.js`
- `node_modules/@kontent-ai/stylekit/` (or include the stylekit CSS directly)

### 3. Configure in Kontent.ai

1. Go to your Kontent.ai project
2. Navigate to **Settings** → **Custom elements**
3. Click **Add custom element**
4. Configure the element:
   - **Name**: "Conditional Fields"
   - **URL**: `https://your-domain.com/index.html`
   - **Description**: "Dynamic form with conditional field visibility"

### 4. Add to Content Type

1. Edit your content type
2. Add a new element
3. Select **Custom element** as the type
4. Choose your "Conditional Fields" element
5. Configure the element settings

## Configuration

### Kontent.ai Stylekit Integration

This custom element uses the official [@kontent-ai/stylekit](https://github.com/kontent-ai/stylesheet-generator) for consistent styling with the Kontent.ai interface. The stylekit provides:

- **Native UI Components**: Buttons, inputs, sections, and form elements
- **Color Palette**: Official Kontent.ai brand colors
- **Consistent Styling**: Matches the Kontent.ai application design
- **Accessibility**: Built-in accessibility features

The element automatically uses Kontent.ai's color scheme and component styles, ensuring a seamless integration with your content editing experience.

### Element Mapping

The custom element expects the following element codenames in your content type:

#### Main Elements
- `fieldA` - Main trigger field (text element)
- `articleCategory` - Article category (text element)
- `articleLength` - Article length (text element)
- `authorName` - Author name (text element)
- `authorBio` - Author bio (text element)
- `productType` - Product type (text element)
- `price` - Price (number element)
- `weight` - Weight (number element)
- `dimensions` - Dimensions (text element)
- `fileSize` - File size (number element)
- `downloadFormat` - Download format (text element)
- `eventDate` - Event date (date/time element)
- `eventType` - Event type (text element)
- `venue` - Venue (text element)
- `capacity` - Capacity (number element)
- `platform` - Platform (text element)
- `registrationUrl` - Registration URL (text element)
- `customType` - Custom type (text element)
- `customDescription` - Custom description (text element)

### Customization

#### Modifying Field Options

Edit the HTML in `index.html` to change available options:

```html
<select id="fieldA" name="fieldA" required>
    <option value="">Select an option...</option>
    <option value="article">Article</option>
    <option value="product">Product</option>
    <option value="event">Event</option>
    <option value="other">Other</option>
</select>
```

#### Adding New Conditional Groups

1. Add HTML structure in `index.html`
2. Add JavaScript logic in `script.js`
3. Update CSS styling in `styles.css`

#### Styling Customization

Modify `styles.css` to match your brand:
- Colors: Update CSS custom properties
- Fonts: Change font-family declarations
- Layout: Adjust container and grid properties

## API Integration

### Custom Elements API

The element uses Kontent.ai's Custom Elements API for integration:

```javascript
// Listen for element changes
CustomElementsAPI.onElementChanged('elementCodename', callback);

// Set element values
CustomElementsAPI.setElementValue('elementCodename', value);

// Get element values
CustomElementsAPI.getElementValue('elementCodename');

// Control element visibility
CustomElementsAPI.setElementVisibility('elementCodename', visible);
```

### Data Flow

1. **Load**: Element loads existing values from Kontent.ai
2. **Interact**: User interacts with form fields
3. **Update**: Values are sent back to Kontent.ai in real-time
4. **Conditional**: Fields show/hide based on selections
5. **Summary**: Configuration summary updates automatically

## Development

### Local Testing

1. Open `index.html` in a web browser
2. The element will run in "demo mode" with mock API
3. Test all conditional logic and interactions

### Debugging

Enable console logging to debug issues:

```javascript
// In script.js, set debug mode
const DEBUG = true;

if (DEBUG) {
    console.log('Debug information:', data);
}
```

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Common Issues

1. **Fields not showing**: Check element codenames match between HTML and Kontent.ai
2. **Values not saving**: Verify Custom Elements API is available
3. **Styling issues**: Ensure CSS is loading correctly
4. **JavaScript errors**: Check browser console for errors

### Debug Steps

1. Open browser developer tools
2. Check console for JavaScript errors
3. Verify network requests are successful
4. Test with different browsers
5. Check Kontent.ai element configuration

## Advanced Features

### Multi-language Support

The element can be extended to support multiple languages:

```javascript
// Add language detection
const currentLanguage = CustomElementsAPI.getLanguage();
// Adjust UI based on language
```

### Validation

Add client-side validation:

```javascript
// Validate required fields
function validateForm() {
    const requiredFields = ['fieldA'];
    // Add validation logic
}
```

### Analytics

Track user interactions:

```javascript
// Track field changes
function trackFieldChange(fieldName, value) {
    // Send analytics data
    analytics.track('field_changed', {
        field: fieldName,
        value: value
    });
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue in the repository
- Contact the development team
- Check Kontent.ai documentation

## Changelog

### Version 1.0.0
- Initial release
- Basic conditional field functionality
- Kontent.ai integration
- Professional UI design
- Responsive layout
- Accessibility features
