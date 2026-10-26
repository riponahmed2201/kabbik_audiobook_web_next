import 'server-only'
 
const dictionaries = {
  en: () => import('@/locales/en/common.json').then((module) => module.default),
  bn: () => import('@/locales/bn/common.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en' | 'bn') =>
  dictionaries[locale]()