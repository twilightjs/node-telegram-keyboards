import { ButtonTypes, WebAppInfo, CallbackGameButton } from "./ButtonTypes";

export class InlineKeyboardMarkup {}

export class InlineKeyboardButton {
  public static url(text: string, url: string): ButtonTypes.Url {
    return {
      text: text,
      url: url,
    };
  }

  public static callbackData(
    text: string,
    callbackData: string
  ): ButtonTypes.CallbackData {
    return {
      text: text,
      callback_data: callbackData,
    };
  }

  public static webApp(
    text: string,
    webAppInfo: WebAppInfo
  ): ButtonTypes.WebApp {
    return {
      text: text,
      web_app: webAppInfo,
    };
  }

  public static loginUrl(
    text: string,
    loginUrl: ButtonTypes.LoginUrl
  ): ButtonTypes.LoginUrl {
    return {
      text: text,
      login_url: loginUrl.login_url,
    };
  }

  public static switchInlineQuery(
    text: string,
    query: string
  ): ButtonTypes.SwitchInlineQuery {
    return {
      text: text,
      switch_inline_query: query,
    };
  }

  public static switchInlineQueryCurrentChat(
    text: string,
    query: string
  ): ButtonTypes.SwitchInlineQueryCurrentChat {
    return {
      text: text,
      switch_inline_query_current_chat: query,
    };
  }

  public static callbackGame(
    text: string,
    hide: CallbackGameButton
  ): ButtonTypes.CallbackGame {
    return {
      text: text,
      callback_game: { hide: hide },
    };
  }

  public static pay(text: string): ButtonTypes.Pay {
    return {
      text: text,
      pay: true,
    };
  }
}
