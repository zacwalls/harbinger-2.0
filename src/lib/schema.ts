// JSON-LD helpers. Only describe what is visible on the site.
import { hours } from "../data/hours";
import { googleProfileUrl, mapsUrl } from "../data/location";

export const gymId = (site: URL) => new URL("/#gym", site).href;
export const membershipsId = (site: URL) => new URL("/pricing/#memberships", site).href;

export function siteGraph(site: URL) {
	const url = new URL("/", site).href;

	return [
		{
			"@type": "ExerciseGym",
			"@id": gymId(site),
			name: "Harbinger MMA",
			url,
			logo: new URL("/logo.png", site).href,
			image: new URL("/og-image.jpg", site).href,
			slogan: "Here to win",
			description:
				"Elite martial arts instruction for those who demand excellence. From Day 1 beginners to professional fighters.",
			telephone: "+1-503-310-5001",
			email: "contact@harbingermma.com",
			priceRange: "$18-$105",
			address: {
				"@type": "PostalAddress",
				streetAddress: "2626 S Corbett Ave",
				addressLocality: "Portland",
				addressRegion: "OR",
				postalCode: "97201",
				addressCountry: "US",
			},
			openingHoursSpecification: hours.map(({ days, opens, closes }) => ({
				"@type": "OpeningHoursSpecification",
				dayOfWeek: days,
				opens,
				closes,
			})),
			hasMap: mapsUrl,
			hasOfferCatalog: { "@id": membershipsId(site) },
			sameAs: [
				googleProfileUrl,
				"https://www.instagram.com/harbinger_mma",
				"https://www.facebook.com/p/Harbingermma-61570838121312/",
				"https://www.tiktok.com/@harbingermma",
			],
		},
		{
			"@type": "WebSite",
			"@id": new URL("/#website", site).href,
			url,
			name: "Harbinger MMA",
			publisher: { "@id": gymId(site) },
		},
	];
}

export function breadcrumbs(site: URL, items: { name: string; path: string }[]) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: new URL(item.path, site).href,
		})),
	};
}
