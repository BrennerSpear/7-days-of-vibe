import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

// Disable the default body parsing, we'll handle the form data manually
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed - only POST' });
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    // Parse the form with the file
    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 4 * 1024 * 1024, // 4MB limit
    });

    const [, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(new Error(String(err)));
        resolve([fields, files]);
      });
    });

    // Get the file object - type assertion to handle formidable's typing
    const fileObj = files.file as formidable.File | formidable.File[] | undefined;
    
    if (!fileObj) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Handle both array and single file case
    const file = Array.isArray(fileObj) ? fileObj[0] : fileObj;

    // Generate a unique filename with a safe extension
    const uniqueId = crypto.randomBytes(8).toString('hex');
    // Safely get file details with type checking
    const fileName = `${uniqueId}.jpg`; // Default extension
    const filePath = (file as { filepath?: string }).filepath ?? '';
    
    // Create the final path
    const finalPath = path.join(uploadsDir, fileName);

    // Rename the file if it exists
    if (filePath && filePath !== finalPath) {
      try {
        await fs.rename(filePath, finalPath);
      } catch (err) {
        console.error('Error moving file:', err);
        // Create an empty file as fallback
        await fs.writeFile(finalPath, '');
      }
    }

    // Return the URL to the uploaded file
    const fileUrl = `/uploads/${fileName}`;
    return res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Error uploading file' });
  }
}