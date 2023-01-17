import { DynamicKeyboard, StaticKeyboard } from "./AbstractKeyboards";
import {
  ButtonType,
  ButtonTypes,
  KeyboardButtonPollType,
  WebAppInfo,
} from "./ButtonTypes";
import { generateStaticKeyboard } from "./keyboardGenerators";
// export abstract class ReplyKeyboardMarkup {
//   protected fields: IReplyKeboardFields;

//   constructor() {
//     this.fields = {
//       resize_keyboard: false,
//       one_time_keyboard: false,
//       input_field_placeholder: "",
//       selective: false,
//     };
//   }

//   public resize(): ReplyKeyboardMarkup {
//     this.fields.resize_keyboard = true;
//     return this;
//   }

//   public oneTime(): ReplyKeyboardMarkup {
//     this.fields.one_time_keyboard = true;
//     return this;
//   }

//   public inputFieldPlaceholder(value: string): ReplyKeyboardMarkup {
//     this.fields.input_field_placeholder = value;
//     return this;
//   }

//   public selective(): ReplyKeyboardMarkup {
//     this.fields.selective = true;
//     return this;
//   }
// }
export interface IReplyKeyboardMarkup {
  keyboard: ButtonType<any>[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
}

export type ReplyKeyboardMarkup = IReplyKeyboardMarkup;

export interface ReplyKeyboardMarkupMethods {
  trueResize(): ReplyKeyboardMarkupMethods;

  trueOneTime(): ReplyKeyboardMarkupMethods;

  trueInputFieldPlaceholder(value: string): ReplyKeyboardMarkupMethods;

  trueSelective(): ReplyKeyboardMarkupMethods;
}

export class StaticReplyKeyboardMarkup<
    ReplyKeyboardMarkup extends IReplyKeyboardMarkup
  >
  extends StaticKeyboard<ReplyKeyboardMarkup>
  implements IReplyKeyboardMarkup, ReplyKeyboardMarkupMethods
{
  keyboard: ButtonType<any>[][] = [];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
  constructor() {
    super(<ReplyKeyboardMarkup><unknown>{
      keyboard: [],
      resize_keyboard: false,
      one_time_keyboard: false,
      selective: false,
    });
    this.resize_keyboard = false;
    this.one_time_keyboard = false;
    this.selective = false;
  }
  public trueResize(): ReplyKeyboardMarkupMethods {
    this.resize_keyboard = true;
    return this;
  }

  public trueOneTime(): ReplyKeyboardMarkupMethods {
    this.one_time_keyboard = true;
    return this;
  }

  public trueInputFieldPlaceholder(value: string): ReplyKeyboardMarkupMethods {
    this.input_field_placeholder = value;
    return this;
  }

  public trueSelective(): ReplyKeyboardMarkupMethods {
    this.selective = true;
    return this;
  }
}

export class DynamicReplyKeyboardMarkup<
    ReplyKeyboardMarkup extends IReplyKeyboardMarkup
  >
  extends DynamicKeyboard<ReplyKeyboardMarkup>
  implements IReplyKeyboardMarkup, ReplyKeyboardMarkupMethods
{
  keyboard: ButtonType<any>[][] = [];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
  constructor() {
    super(<ReplyKeyboardMarkup><unknown>{
      keyboard: [],
      resize_keyboard: false,
      one_time_keyboard: false,
      selective: false,
    });
  }
  public trueResize(): ReplyKeyboardMarkupMethods {
    this.resize_keyboard = true;
    return this;
  }

  public trueOneTime(): ReplyKeyboardMarkupMethods {
    this.one_time_keyboard = true;
    return this;
  }

  public trueInputFieldPlaceholder(value: string): ReplyKeyboardMarkupMethods {
    this.input_field_placeholder = value;
    return this;
  }

  public trueSelective(): ReplyKeyboardMarkupMethods {
    this.selective = true;
    return this;
  }
}

export class KeyboardButtons {
  public static text(text: string): ButtonTypes.Text {
    return {
      text: text,
    };
  }

  public static contact(text: string): ButtonTypes.Contact {
    return {
      text: text,
      request_contact: true,
    };
  }

  public static location(text: string): ButtonTypes.Location {
    return {
      text: text,
      request_location: true,
    };
  }

  public static poll(
    text: string,
    keyboardButtonPollType: KeyboardButtonPollType
  ): ButtonTypes.Poll {
    return {
      text: text,
      request_poll: keyboardButtonPollType,
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
}
