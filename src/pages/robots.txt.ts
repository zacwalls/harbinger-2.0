import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
	const isProduction = site?.hostname.endsWith("harbingermma.com");
	const body = isProduction
		? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`
		: `User-agent: *\nDisallow: /\n`;

	return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
