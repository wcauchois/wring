import { validateWebRingConfig } from "@wcauchois/wring-schema";
import axios from "axios";

let uniqueIdNonce = 1;

export function uniqueId(prefix = "id-") {
  return `${prefix}${uniqueIdNonce++}`;
}

export function configUrlForSite(siteUrl: string) {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(siteUrl);
  } catch (err) {
    return "";
  }
  return `${parsedUrl.origin}/web-ring.json`;
}

export async function fetchSiteConfig(configUrl: string) {
  if (!configUrl) {
    throw new Error(`Invalid URL`);
  }
  let data: any;
  try {
    const response = await axios.get(configUrl);
    data = response.data;
  } catch (err) {
    throw new Error(`Error retrieving web ring config: ${err.message}`);
  }
  validateWebRingConfig(data);
  return data;
}
