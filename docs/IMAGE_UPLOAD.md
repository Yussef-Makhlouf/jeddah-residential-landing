# Image Upload System

This document describes the image upload functionality implemented in the admin control panel.

## Components

### ImageUpload Component (`components/ui/image-upload.tsx`)

A reusable React component that provides:
- Drag and drop file upload
- File validation (type and size)
- Image preview
- URL input fallback
- Progress indicators
- Error handling

#### Props

- `value`: Current image URL
- `onChange`: Callback function when image changes
- `label`: Label for the upload field
- `placeholder`: Placeholder text
- `className`: Additional CSS classes
- `accept`: Accepted file types (default: "image/*")
- `maxSize`: Maximum file size in MB (default: 5)
- `showPreview`: Whether to show image preview (default: true)
- `aspectRatio`: CSS aspect ratio class for preview

### API Endpoint (`app/api/upload-image/route.ts`)

Handles file uploads with:
- File validation
- Unique filename generation
- File storage in `/public/uploads/`
- Error handling
- CORS support

## Usage

### In Admin Control Panel

The ImageUpload component is integrated in three main areas:

1. **Hero Background Image**: Used for the main hero section background
2. **Apartment Images**: Used for individual apartment photos
3. **Gallery Images**: Used for the image carousel/gallery section

### Example Usage

```tsx
import { ImageUpload } from "@/components/ui/image-upload"

<ImageUpload
  label="صورة الشقة"
  value={apartment.image}
  onChange={(url) => setApartmentImage(url)}
  aspectRatio="aspect-[4/3]"
  placeholder="اسحب وأفلت صورة الشقة هنا أو انقر للاختيار"
/>
```

## File Storage

- Uploaded images are stored in `/public/uploads/`
- Files are renamed with timestamp and random string for uniqueness
- Original file extensions are preserved
- The uploads directory is gitignored to prevent committing user uploads

## Security

- File type validation (images only)
- File size limits (5MB default)
- Unique filename generation prevents conflicts
- Server-side validation in API endpoint

## Error Handling

The component handles various error scenarios:
- Invalid file types
- File size exceeded
- Upload failures
- Network errors
- Image loading errors

## Browser Support

- Modern browsers with File API support
- Drag and drop functionality
- File input fallback for older browsers
