import { useRef, useState } from "preact/hooks";
import type { JSX } from "preact";

type Status = "idle" | "sending" | "success" | "error";

const initialValues = {
	name: "",
	email: "",
	interest: "muay-thai",
	"bot-field": "",
};

const fieldWrap = "flex flex-col gap-2";
const labelClass =
	"text-[#c0c7d1] text-[12px] tracking-[1.2px] uppercase leading-[16px]";
const inputBox = "relative bg-[#1c1b1b] border border-[rgba(64,72,80,0.3)]";
const inputClass =
	"w-full bg-transparent px-[17px] py-[18px] text-[#6b7280] text-[16px] uppercase outline-none placeholder:text-[#6b7280]";

export default function BookClassForm() {
	const [values, setValues] = useState(initialValues);
	const [status, setStatus] = useState<Status>("idle");
	const [size, setSize] = useState<{ w: number; h: number } | null>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	const update =
		(field: keyof typeof initialValues) =>
		(e: JSX.TargetedEvent<HTMLInputElement | HTMLSelectElement>) => {
			const value = e.currentTarget.value;
			setValues((prev) => ({ ...prev, [field]: value }));
		};

	const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
		e.preventDefault();
		setStatus("sending");

		try {
			const body = new URLSearchParams({
				"form-name": "trial-signup",
				...values,
			}).toString();

			const res = await fetch("/", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body,
			});
			if (!res.ok) throw new Error(`Status ${res.status}`);

			// Lock the card's size so it doesn't shrink when the content swaps
			const rect = cardRef.current?.getBoundingClientRect();
			if (rect) setSize({ w: rect.width, h: rect.height });

			setValues(initialValues);
			setStatus("success");
		} catch {
			setStatus("error");
		}
	};

	return (
		<div
			ref={cardRef}
			style={size ? { width: size.w, minHeight: size.h, maxWidth: "100%" } : undefined}
			class="relative bg-[#201f1f] border border-[rgba(64,72,80,0.2)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] px-14 max-md:px-4 py-10 flex flex-col justify-center">
			{status === "success" ? (
				<div
					role="status"
					aria-live="polite"
					class="flex flex-col items-center text-center gap-4 py-8">
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<circle cx="12" cy="12" r="11" stroke="#e9c349" stroke-width="1.5" />
						<path
							d="M7 12.5l3.2 3.2L17 9"
							stroke="#e9c349"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<h3 class="text-[#e5e2e1] font-bold text-[28px] uppercase tracking-[-0.5px]">
						You're on the list
					</h3>
					<p class="text-[#c0c7d1] text-[16px] leading-[24px]">
						We will reach out soon to book your first class.
					</p>
				</div>
			) : (
				<form
					name="trial-signup"
					method="POST"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					onSubmit={handleSubmit}
					class="flex flex-col gap-6">
					<input type="hidden" name="form-name" value="trial-signup" />

					{/* Honeypot */}
					<p hidden>
						<label>
							Don't fill this out:
							<input
								name="bot-field"
								value={values["bot-field"]}
								onInput={update("bot-field")}
							/>
						</label>
					</p>

					<div class={fieldWrap}>
						<label for="trial-name" class={labelClass}>Full Name</label>
						<div class={inputBox}>
							<input
								id="trial-name"
								type="text"
								name="name"
								required
								placeholder="John Doe"
								value={values.name}
								onInput={update("name")}
								class={inputClass}
							/>
						</div>
					</div>

					<div class={fieldWrap}>
						<label for="trial-email" class={labelClass}>Email Address</label>
						<div class={inputBox}>
							<input
								id="trial-email"
								type="email"
								name="email"
								required
								placeholder="email@domain.com"
								value={values.email}
								onInput={update("email")}
								class={inputClass}
							/>
						</div>
					</div>

					<div class={fieldWrap}>
						<label for="trial-interest" class={labelClass}>Primary Interest</label>
						<div class={`${inputBox} h-[58px] flex items-center`}>
							<select
								id="trial-interest"
								name="interest"
								value={values.interest}
								onChange={update("interest")}
								class="w-full bg-transparent px-[17px] py-0 text-white text-[16px] uppercase outline-none appearance-none cursor-pointer h-full">
								<option value="muay-thai" class="bg-[#1c1b1b]">Muay Thai</option>
								<option value="bjj" class="bg-[#1c1b1b]">BJJ</option>
								<option value="boxing" class="bg-[#1c1b1b]">Boxing</option>
								<option value="wrestling" class="bg-[#1c1b1b]">Wrestling</option>
								<option value="mma" class="bg-[#1c1b1b]">MMA</option>
								<option value="yoga" class="bg-[#1c1b1b]">Yoga</option>
							</select>
							<svg
								class="absolute right-[17px] top-1/2 -translate-y-1/2 pointer-events-none"
								width="12"
								height="8"
								viewBox="0 0 12 8"
								fill="none"
								aria-hidden="true">
								<path d="M1 1.5L6 6.5L11 1.5" stroke="#c0c7d1" stroke-width="2" />
							</svg>
						</div>
					</div>

					<div class="flex flex-col items-stretch w-full mt-4 gap-3">
						{/* Swap these classes for whatever CTAPrimary.astro uses */}
						<button
							type="submit"
							disabled={status === "sending"}
							class="font-bold text-center relative bg-[#2e86c1] px-16 py-6 shadow-[0_25px_50px_-12px_rgba(46,134,193,0.4)] cursor-pointer">
							<span className="text-white text-[18px] tracking-[1.8px] uppercase max-lg:text-[16px] max-lg:tracking-[1.6px]">{status === "sending" ? "Sending..." : "book first session"}</span>
						</button>
						{status === "error" && (
							<p role="alert" class="text-[#ff6b6b] text-[12px] text-center">
								Something went wrong. Please try again.
							</p>
						)}
					</div>

					<p class="text-[#c0c7d1] text-[10px] tracking-[1px] uppercase text-center leading-[15px] px-4">
						By submitting, you agree to receive communications regarding your trial.
					</p>
				</form>
			)}
		</div>
	);
}