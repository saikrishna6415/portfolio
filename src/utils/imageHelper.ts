/**
 * Image Helper Utility
 * 
 * This file provides guidance for image optimization in your portfolio project.
 * 
 * Image Requirements:
 * 
 * 1. Profile Image:
 *    - Recommended size: 800x800 pixels (1:1 aspect ratio)
 *    - Format: JPG or WebP (preferred)
 *    - Save as: /public/images/profile.jpg
 * 
 * 2. Workspace Images:
 *    - Landscape image: 1920x1080 pixels (16:9 aspect ratio)
 *      - Save as: /public/images/workspace-1.jpg
 *    - Portrait images: 1080x1920 pixels (9:16 aspect ratio)
 *      - Save as: /public/images/workspace-2.jpg
 *      - Save as: /public/images/workspace-3.jpg
 * 
 * Optimization Tips:
 * 1. Compress images using tools like ImageOptim, TinyPNG, or Squoosh
 * 2. Target file sizes:
 *    - Profile photo: 100-200KB
 *    - Workspace photos: 200-500KB each
 * 3. Use good lighting and clear composition
 * 4. Remove any sensitive information from workspace images
 * 
 * Next.js automatically optimizes images at runtime using the Image component,
 * but starting with properly optimized source images is important.
 */

export const imageGuidelines = {
  profile: {
    path: '/public/images/profile.jpg',
    size: '800x800 px',
    format: 'JPG or WebP',
    maxFileSize: '200KB'
  },
  workspace: [
    {
      path: '/public/images/workspace-1.jpg',
      size: '1920x1080 px (landscape)',
      format: 'JPG or WebP',
      maxFileSize: '500KB'
    },
    {
      path: '/public/images/workspace-2.jpg',
      size: '1920x1080 px (landscape)',
      format: 'JPG or WebP',
      maxFileSize: '500KB'
    },
    {
      path: '/public/images/workspace-3.jpg',
      size: '1920x1080 px (landscape)',
      format: 'JPG or WebP',
      maxFileSize: '500KB'
    }
  ]
}; 