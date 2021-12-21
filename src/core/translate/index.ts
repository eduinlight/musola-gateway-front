import translations from "./locales";
import { store } from "../../redux/store";

export interface TranslationParam {
  replace: RegExp;
  text: string;
}

export type LocalesType = keyof typeof translations;

export const translate = (
  key: LocalesType,
  params: TranslationParam[] = []
) => {
  try {
    const lang = store.getState().app.lang;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let text = translations[key][lang];
    for (const param of params) {
      text = text.replace(param.replace, param.text);
    }
    return text;
  } catch (e) {
    return "";
  }
};
