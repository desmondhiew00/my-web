"use server";

import { cookies } from "next/headers";

type Locale = "en" | "ja" | "zh-cn";

export const changeLocale = (locale: Locale) => {
	cookies().set("locale", locale);
};

export const getLocaleFromCookie = () => {
	const cookieStore = cookies();
	return cookieStore.get("locale") || "en";
};
