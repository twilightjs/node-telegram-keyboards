import { StaticKeyboard } from "./AbstractKeyboards";
import { KeyboardType, KeyboardTypes } from "./KeyboardTypes";
import {
  DynamicReplyKeyboardMarkup,
  StaticReplyKeyboardMarkup,
} from "./ReplyKeyboardMarkup";

// export function getKeyboard(
//   keyboardType: KeyboardType
// ): StaticKeyboard  {
//   switch (keyboardType) {
//     case KeyboardTypes.STATIC:
//       return new StaticReplyKeyboardMarkup();
//     case KeyboardTypes.DYNAMIC:
//       return new DynamicReplyKeyboardMarkup();
//   }
// }

export function getInlineKeyboard(keyboardType: KeyboardType) {}
