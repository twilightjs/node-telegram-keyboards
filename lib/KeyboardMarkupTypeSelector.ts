import { DynamicKeyboard, StaticKeyboard } from "./AbstractKeyboards";
import { InlineKeyboardMarkup } from "./InlineKeyboardMarkup";
import { Markup } from "./Markup";
import {
  ReplyKeyboardMarkup,
  DynamicReplyKeyboardMarkup,
  StaticReplyKeyboardMarkup,
} from "./ReplyKeyboardMarkup";
// extends ReplyKeyboardMarkup, InlineKeyboardMarkup

export abstract class KeyboardMarkupTypeSelector<
  T extends Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup>
> {
  abstract static(): StaticKeyboard<T>;
  abstract dynamic(): DynamicKeyboard<T>;
}

export class ReplyKeyboardMarkupTypeSelector<
  T extends Markup<ReplyKeyboardMarkup>
> extends KeyboardMarkupTypeSelector<T> {
  static(): StaticKeyboard<T> {
    return new StaticReplyKeyboardMarkup<T>();
  }
  dynamic(): DynamicKeyboard<T> {
    return new DynamicReplyKeyboardMarkup();
  }
}

export class InlineKeyboardMarkupTypeSelector<
  T extends Markup<InlineKeyboardMarkup>
> extends KeyboardMarkupTypeSelector<T> {
  static(): StaticKeyboard<T> {
    throw new Error("Method not implemented.");
  }
  dynamic(): DynamicKeyboard<T> {
    throw new Error("Method not implemented.");
  }
}
