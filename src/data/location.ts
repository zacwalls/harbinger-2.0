// Google links for the gym. Used by the footer, the contact page and the JSON-LD.
const query = encodeURIComponent("Harbinger MMA, 2626 S Corbett Ave, Portland, OR 97201");

// Google Business Profile (knowledge graph entity)
export const googleProfileUrl = "https://www.google.com/search?kgmid=/g/11yc0685l4";
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
export const mapEmbedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${query}`;
