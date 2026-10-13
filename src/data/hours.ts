// Opening hours. Shown in the footer and published in the JSON-LD, so edit them here only.
export const hours = [
	{ label: "Mon-Fri", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "21:30" },
	{ label: "Sat", days: ["Saturday"], opens: "09:00", closes: "12:30" },
	{ label: "Sun", days: ["Sunday"], opens: "10:00", closes: "15:30" },
];

// "21:30" -> "9:30 PM", "06:00" -> "6 AM"
export function formatTime(time: string) {
	const [h, m] = time.split(":").map(Number);
	const minutes = m ? `:${String(m).padStart(2, "0")}` : "";
	return `${h % 12 || 12}${minutes} ${h < 12 ? "AM" : "PM"}`;
}
