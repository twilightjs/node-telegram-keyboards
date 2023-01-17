export namespace ButtonTypes {
  export interface Text {
    text: string;
  }

  export interface Contact {
    text: string;
    request_contact: boolean;
  }

  export interface Location {
    text: string;
    request_location: boolean;
  }

  export interface Poll {
    text: string;
    request_poll: string;
  }

  export interface Url {
    text: string;
    url: string;
  }

  export interface CallbackData {
    text: string;
    callback_data: string;
  }

  export interface WebApp {
    text: string;
    web_app: string;
  }

  export interface LoginUrl {
    text: string;
    login_url: object;
  }

  export interface SwitchInlineQuery {
    text: string;
    switch_inline_query: string;
  }

  export interface SwitchInlineQueryCurrentChat {
    text: string;
    switch_inline_query_current_chat: string;
  }

  export interface CallbackGame {
    text: string;
    callback_game: object;
  }

  export interface Pay {
    text: string;
    pay: boolean;
  }
}

// export interface KeyboardButtonPollType {
//   type: "quiz" | "regular";
// }
export type KeyboardButtonPollType = "quiz" | "regular";

// export interface WebAppInfo {
//   url: string;
// }
export type WebAppInfo = string;

export interface LoginUrl {
  url: string;
  forward_text: string;
  bot_username: string;
  request_write_access: boolean;
}

// export interface СallbackGameButton {
//   hide: boolean;
// }

export type CallbackGameButton = boolean;

export type ButtonType<T> = T extends ButtonTypes.Text
  ? ButtonTypes.Text
  : T extends ButtonTypes.Contact
  ? ButtonTypes.Contact
  : T extends ButtonTypes.Location
  ? ButtonTypes.Location
  : T extends ButtonTypes.Poll
  ? ButtonTypes.Poll
  : T extends ButtonTypes.Url
  ? ButtonTypes.Url
  : T extends ButtonTypes.CallbackData
  ? ButtonTypes.CallbackData
  : T extends ButtonTypes.WebApp
  ? ButtonTypes.WebApp
  : T extends ButtonTypes.LoginUrl
  ? ButtonTypes.LoginUrl
  : T extends ButtonTypes.SwitchInlineQuery
  ? ButtonTypes.SwitchInlineQuery
  : T extends ButtonTypes.SwitchInlineQueryCurrentChat
  ? ButtonTypes.SwitchInlineQueryCurrentChat
  : T extends ButtonTypes.CallbackGame
  ? ButtonTypes.CallbackGame
  : T extends ButtonTypes.Pay
  ? ButtonTypes.Pay
  : T extends ButtonTypes.Text
  ? ButtonTypes.Text
  : never;
