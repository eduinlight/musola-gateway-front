import { Action, createReducer } from "../../core/classes/redux-actions-helper";
import { ChangeState } from "../../core/classes/redux-actions-helper/ChangeStateAction";
import { getService } from "../../core/services";
import { HttpService } from "../../core/services/http.service";
import { StorageService } from "../../core/services/storage.service";

const storageService = getService<StorageService>(StorageService);

const httpService = getService<HttpService>(HttpService);

export const LANG_STORAGE_KEY = "lang";

export const AUTH_STORAGE_KEY = "auth";

const authSavedData = storageService.load(AUTH_STORAGE_KEY);
if (authSavedData) {
  httpService.setRequestToken(authSavedData.token);
}

type LanguageType = "en" | "es";

export interface AppState {
  lang: LanguageType;
}

const initialState = {
  lang: storageService.load(LANG_STORAGE_KEY) || "en"
} as AppState;

class SetLanguage extends Action<AppState, LanguageType> {
  callReducer(state: AppState, payload: LanguageType): void {
    state.lang = payload;
    storageService.save(LANG_STORAGE_KEY, state.lang);
  }
}

export const appActions = {
  change: new ChangeState("APP_CHANGE_STATE"),
  setLanguage: new SetLanguage("APP_SET_LANGUAGE")
};

export const appReducer = createReducer(appActions, initialState);
