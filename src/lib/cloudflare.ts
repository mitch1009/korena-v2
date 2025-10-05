import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareEnv } from "./types";

export function getCloudflareBindings(): CloudflareEnv {
  const { env } = getCloudflareContext();
  return env as CloudflareEnv;
}

export async function getKVValue<T>(key: string, defaultValue?: T): Promise<T | null> {
  try {
    const { KORENA_SETTINGS } = getCloudflareBindings();
    const value = await KORENA_SETTINGS.get(key);
    return value ? JSON.parse(value) : defaultValue || null;
  } catch (error) {
    console.error(`Error getting KV value for key ${key}:`, error);
    return defaultValue || null;
  }
}

export async function setKVValue<T>(key: string, value: T, ttl?: number): Promise<void> {
  try {
    const { KORENA_SETTINGS } = getCloudflareBindings();
    await KORENA_SETTINGS.put(key, JSON.stringify(value), ttl ? { expirationTtl: ttl } : undefined);
  } catch (error) {
    console.error(`Error setting KV value for key ${key}:`, error);
    throw error;
  }
}

export async function deleteKVValue(key: string): Promise<void> {
  try {
    const { KORENA_SETTINGS } = getCloudflareBindings();
    await KORENA_SETTINGS.delete(key);
  } catch (error) {
    console.error(`Error deleting KV value for key ${key}:`, error);
    throw error;
  }
}

export function isCloudflareRuntime(): boolean {
  try {
    getCloudflareContext();
    return true;
  } catch {
    return false;
  }
}