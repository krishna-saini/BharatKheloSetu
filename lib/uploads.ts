import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";

const MAX_BYTES = 1024 * 1024;

export async function preparePhoto(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Profile photo must be an image");
  if (file.size <= MAX_BYTES) return file;
  const image = await createImageBitmap(file);
  let width = image.width;
  let height = image.height;
  for (let quality = 0.82; quality >= 0.42; quality -= 0.1) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
    const compressed = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (compressed && compressed.size <= MAX_BYTES) return new File([compressed], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" });
    width = Math.round(width * 0.75);
    height = Math.round(height * 0.75);
  }
  throw new Error("File must be under 1 MB");
}

export function validateIdentityProof(file: File) {
  const allowed = file.type.startsWith("image/") || ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type);
  if (!allowed) throw new Error("Identity Proof must be a PDF, document, or image");
  if (file.size > MAX_BYTES) throw new Error("File must be under 1 MB");
  return file;
}

export function uploadFile(file: File, path: string, onProgress: (progress: number) => void) {
  return new Promise<string>((resolve, reject) => {
    const task = uploadBytesResumable(ref(storage, path), file, { contentType: file.type });
    task.on("state_changed", snapshot => onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)), reject, async () => resolve(await getDownloadURL(task.snapshot.ref)));
  });
}
