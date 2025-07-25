// src/utils/getAvatarUrl.ts

const CLOUDINARY_BASE = "https://res.cloudinary.com/dzvnr8lux/image/upload/";
const DEFAULT_AVATAR = `${CLOUDINARY_BASE}v1750528670/avatar_default_wlur9w.png`;

/**
 * Retorna la URL del avatar completo en Cloudinary.
 * Si no hay public_id, retorna la imagen por defecto.
 */
export function getAvatarUrl(public_id?: string): string {
  if (!public_id) return DEFAULT_AVATAR;
  return `${CLOUDINARY_BASE}${public_id}.jpg`;
}
