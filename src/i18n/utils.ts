import { en } from './en';
import { es } from './es';
export type { Translations } from './types';

export type Lang = 'en' | 'es';
export const SUPPORTED_LANGS: Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

/** Extract the locale from an Astro URL object. */
export function getLang(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'es') return 'es';
  return 'en';
}

/** Return the translations object for a given locale. */
export function useTranslations(lang: Lang) {
  return lang === 'es' ? es : en;
}

/** Given a current URL and a target locale, return the equivalent URL in that locale. */
export function getLocalizedUrl(url: URL, targetLang: Lang): string {
  const parts = url.pathname.split('/').filter(Boolean);
  // Replace or prepend the locale segment
  if (SUPPORTED_LANGS.includes(parts[0] as Lang)) {
    parts[0] = targetLang;
  } else {
    parts.unshift(targetLang);
  }
  return '/' + parts.join('/') + url.search;
}

/** Returns true if the given lang is the currently active one. */
export function isActiveLang(url: URL, lang: Lang): boolean {
  return getLang(url) === lang;
}