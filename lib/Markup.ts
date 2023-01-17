import { InlineKeyboardMarkup } from "./InlineKeyboardMarkup";
import { ReplyKeyboardMarkup } from "./ReplyKeyboardMarkup";

export type Markup<T> = T extends ReplyKeyboardMarkup
  ? ReplyKeyboardMarkup
  : T extends InlineKeyboardMarkup
  ? InlineKeyboardMarkup
  : never;
