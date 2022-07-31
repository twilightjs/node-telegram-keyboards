import {KeyboardBuilder} from "./KeyboardBuilder.js";
import {ReplyKeyboardButton} from "./ReplyKeyboard.js";

(async () => {
    const keyboard = await KeyboardBuilder.keyboard().static().buttons([ReplyKeyboardButton.text("Text")]).layout([1]);
    await KeyboardBuilder.saveToJSON(keyboard, "template");
    const template = await KeyboardBuilder.templateFromJSON("./template.json");
    console.log(await template.build());
})();
