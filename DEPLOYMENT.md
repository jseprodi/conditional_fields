# Deployment Guide

This guide will help you deploy the Conditional Fields custom element to Kontent.ai.

## Prerequisites

- A Kontent.ai project
- A web server or hosting service
- Basic knowledge of Kontent.ai content types

## Deployment Options

### Option 1: Static Hosting (Recommended)

#### GitHub Pages
1. Create a new GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Use the GitHub Pages URL as your custom element URL

#### Netlify
1. Create a new site on Netlify
2. Upload the files or connect to a Git repository
3. Deploy the site
4. Use the Netlify URL as your custom element URL

#### Vercel
1. Create a new project on Vercel
2. Upload the files or connect to a Git repository
3. Deploy the project
4. Use the Vercel URL as your custom element URL

### Option 2: Traditional Web Hosting

1. Upload all files to your web server
2. Ensure the files are accessible via HTTPS
3. Note the URL where `index.html` is accessible

## Step-by-Step Deployment

### 1. Prepare Your Files

Ensure you have all required files:
- `index.html` - Main HTML file
- `script.js` - JavaScript functionality
- `styles.css` - CSS styling
- `README.md` - Documentation
- `package.json` - Project configuration

### 2. Host the Files

Choose one of the deployment options above and upload your files.

### 3. Test the Deployment

1. Open your hosted URL in a browser
2. Verify the form loads correctly
3. Test the conditional field functionality
4. Check that all styling is applied

### 4. Configure in Kontent.ai

#### Add Custom Element

1. Log in to your Kontent.ai project
2. Go to **Settings** → **Custom elements**
3. Click **Add custom element**
4. Fill in the details:
   - **Name**: `Conditional Fields`
   - **URL**: `https://your-domain.com/index.html`
   - **Description**: `Dynamic form with conditional field visibility`
   - **Configuration**: Leave empty for now

#### Create Content Type Elements

Create the following elements in your content type:

**Main Elements:**
- `fieldA` (Text) - Main trigger field
- `articleCategory` (Text) - Article category
- `articleLength` (Text) - Article length
- `authorName` (Text) - Author name
- `authorBio` (Text) - Author bio
- `productType` (Text) - Product type
- `price` (Number) - Price
- `weight` (Number) - Weight
- `dimensions` (Text) - Dimensions
- `fileSize` (Number) - File size
- `downloadFormat` (Text) - Download format
- `eventDate` (Date/Time) - Event date
- `eventType` (Text) - Event type
- `venue` (Text) - Venue
- `capacity` (Number) - Capacity
- `platform` (Text) - Platform
- `registrationUrl` (Text) - Registration URL
- `customType` (Text) - Custom type
- `customDescription` (Text) - Custom description

**Add Custom Element:**
- `conditionalFields` (Custom element) - Select your "Conditional Fields" element

### 5. Test in Kontent.ai

1. Create a new content item using your content type
2. Open the custom element
3. Test the conditional field functionality
4. Verify data is saved correctly

## Configuration

### Element Mapping

The custom element expects specific element codenames. If you need to change them:

1. Edit the `script.js` file
2. Update the element codenames in the `loadInitialData()` method
3. Update the `updateKontentElement()` calls
4. Redeploy the files

### Styling Customization

To customize the appearance:

1. Edit the `styles.css` file
2. Modify colors, fonts, and layout
3. Test the changes locally
4. Redeploy the files

### Adding New Fields

To add new conditional fields:

1. Add HTML structure in `index.html`
2. Add JavaScript logic in `script.js`
3. Add CSS styling in `styles.css`
4. Create corresponding elements in Kontent.ai
5. Redeploy the files

## Troubleshooting

### Common Issues

**Element not loading:**
- Check the URL is correct and accessible
- Verify HTTPS is enabled
- Check browser console for errors

**Fields not showing:**
- Verify element codenames match between HTML and Kontent.ai
- Check that all required elements are created in the content type

**Values not saving:**
- Ensure Custom Elements API is available
- Check browser console for JavaScript errors
- Verify element permissions in Kontent.ai

**Styling issues:**
- Check that CSS file is loading
- Verify file paths are correct
- Test in different browsers

### Debug Steps

1. Open browser developer tools
2. Check console for JavaScript errors
3. Verify network requests are successful
4. Test with different browsers
5. Check Kontent.ai element configuration

## Security Considerations

- Always use HTTPS for your custom element
- Validate all user inputs
- Implement proper error handling
- Consider content security policy headers

## Performance Optimization

- Minify CSS and JavaScript files
- Enable gzip compression
- Use a CDN for faster loading
- Optimize images if any

## Maintenance

- Regularly test the custom element
- Monitor for errors in production
- Keep documentation updated
- Consider versioning for updates

## Support

If you encounter issues:

1. Check this documentation
2. Review the README.md file
3. Check browser console for errors
4. Contact the development team
5. Create an issue in the repository

## Updates

To update the custom element:

1. Make your changes locally
2. Test thoroughly
3. Deploy the updated files
4. Test in Kontent.ai
5. Update documentation if needed

