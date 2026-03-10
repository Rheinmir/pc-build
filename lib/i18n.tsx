"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Lang, Translations } from './translations';

type LangContextType = { lang: Lang; setLang: (l: Lang) => void; t: Translations };
const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('pc-builder-lang') as Lang | null;
    if (saved === 'en' || saved === 'vi') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('pc-builder-lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  return useContext(LangContext);
}
