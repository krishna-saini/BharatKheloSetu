const MAX_BYTES = 1_048_576;
const TOO_LARGE_MESSAGE = "File must be 1 MB or smaller — please choose a smaller image.";
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const IDENTITY_TYPES = [...PHOTO_TYPES, "application/pdf"];

export async function preparePhoto(file: File) {
  if (!PHOTO_TYPES.includes(file.type)) throw new Error("Profile photo must be a JPG, PNG, or WebP image.");
  if (file.size > MAX_BYTES) throw new Error(TOO_LARGE_MESSAGE);
  return file;
}

export function validateIdentityProof(file: File) {
  if (!IDENTITY_TYPES.includes(file.type)) throw new Error("Identity proof must be a JPG, PNG, WebP image, or PDF.");
  if (file.size > MAX_BYTES) throw new Error(TOO_LARGE_MESSAGE);
  return file;
}

export function uploadFile(file: File, onProgress: (progress: number) => void) {
  return new Promise<string>((resolve, reject) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      reject(new Error("Uploads are not configured. Please try again later."));
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onerror = () => reject(new Error("Upload failed. Please check your connection and retry."));
    xhr.onload = () => {
      let response: { secure_url?: string; error?: { message?: string } };
      try {
        response = JSON.parse(xhr.responseText);
      } catch {
        reject(new Error("Upload failed. Please check your connection and retry."));
        return;
      }
      if (xhr.status >= 200 && xhr.status < 300 && response.secure_url) {
        resolve(response.secure_url);
        return;
      }
      reject(new Error(response.error?.message || "Upload failed. Please check your connection and retry."));
    };
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", uploadPreset);
    xhr.send(body);
  });
}
