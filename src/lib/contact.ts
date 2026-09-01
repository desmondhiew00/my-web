// Web3Forms takes the POST straight from the browser, so there is no backend to
// deploy. The access key is a public form id, not a credential, hence PUBLIC_.
const ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORM_KEY;

const ENDPOINT = "https://api.web3forms.com/submit";

/** Bots submit instantly; a human filling three prompts never does. */
export const MIN_ELAPSED_MS = 3_000;
export const MAX_SUBMISSIONS = 3;

export interface ContactDraft {
	name: string;
	email: string;
	message: string;
}

export type ContactError = "empty" | "email" | "short";

/** Returns an error code the caller translates, or null when the value passes. */
export const validate = (field: keyof ContactDraft, value: string): ContactError | null => {
	const v = value.trim();
	if (field === "name") return v.length >= 1 ? null : "empty";
	if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : "email";
	return v.length >= 10 ? null : "short";
};

export const buildPayload = (draft: ContactDraft) => ({
	access_key: ACCESS_KEY,
	subject: `desmondhiew.com — ${draft.name.trim()}`,
	from_name: draft.name.trim(),
	name: draft.name.trim(),
	email: draft.email.trim(),
	message: draft.message.trim(),
	// Web3Forms' own honeypot: a bot fills every field it finds.
	botcheck: "",
});

export const send = async (draft: ContactDraft): Promise<boolean> => {
	try {
		const res = await fetch(ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json", Accept: "application/json" },
			body: JSON.stringify(buildPayload(draft)),
		});
		return res.ok;
	} catch {
		return false;
	}
};
