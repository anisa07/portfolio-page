import { defaultLocale, locales, type Locale } from "./i18n/config";

export const onRequest = (
  {
    request,
    redirect,
  }: {
    request: Request;
    redirect: (
      to: string,
      code: number,
      options?: Record<string, string>
    ) => void;
  },
  next: () => void
) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Extract the potential locale from the path
  const segments = pathname.split("/").filter(Boolean); // Remove empty strings
  const maybeLocale = segments[0];

  // If we already have a valid locale in the URL, continue
  if (maybeLocale && locales.includes(maybeLocale as Locale)) {
    return next();
  }

  // If we're on the root path or have no locale, redirect to appropriate locale
  if (
    pathname === "/" ||
    !maybeLocale ||
    !locales.includes(maybeLocale as Locale)
  ) {
    const cookie = request.headers.get("cookie") ?? "";
    const seen = cookie.includes("i18n_seen=1");

    // Determine the preferred locale
    const accept = request.headers.get("accept-language") ?? "";
    const preferred =
      locales.find((l) => accept.toLowerCase().startsWith(l)) ?? defaultLocale;

    // Always redirect to the locale-specific path
    const to = `/${preferred}${pathname === "/" ? "" : pathname}`;

    return redirect(to, 302, {
      "Set-Cookie": "i18n_seen=1; Path=/; Max-Age=31536000; SameSite=Lax",
    });
  }

  return next();
};
