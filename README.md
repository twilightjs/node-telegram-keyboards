
![Logo](https://lh5.googleusercontent.com/8YzpahcymCLVF1pJALOwHistg1-d-FCpihg86CVy8I7XgbfdP2g4ooI-85OLilMQMscYVgPKgakKrKJhXSoo=w100-h100-rw)


# Twilight.js telegram-keyboards

Twilight.js telegram-keyboards is an asynchronous library that allows you to generate dynamic and static keyboards and allows you to save the finished keyboard template in json and return the keyboard back from the json templater


## Features

- Template
- Asynchronous
- Handy
- Cross platform


## Examples

```javascript
import { InlineKeyboardButton } from "./InlineKeyboard.js";
import { ReplyKeyboardButton } from "./ReplyKeyboard.js";
import { KeyboardBuilder } from "./KeyboardBuilder.js";

async function replyKeyboardStatic() {
    const keyboard = await KeyboardBuilder.keyboard().static()
        .buttons([
            ReplyKeyboardButton.text("example"),
            ReplyKeyboardButton.contact("example"),
            ReplyKeyboardButton.location("example"),
            ReplyKeyboardButton.poll("example", "quiz"),
            ReplyKeyboardButton.webApp("example", "https://example.site/")
        ])
        .layout([1, 1, 1, 1, 1])
        .build();
}

async function replyKeyboardDynamic() {
    const keyboard = await KeyboardBuilder.keyboard().dynamic()
        .data([1, 2, 3, 4, 5])
        .use(async (storage, data) => {
            storage.counter = 0;
        })
        .map(async (element, storage, positionIndex) => {
            console.log(storage.counter);
            if (positionIndex % 2 == 0) {
                storage.counter = + positionIndex;
                return ReplyKeyboardButton.text(storage.counter);
            }
            storage.counter = + positionIndex;
            return ReplyKeyboardButton.text(element);
        })
        .layout([1, 1, 1, 1, 1])
        .build();
}

async function inlineKeyboardStatic() {
    const inlineKeyboard = await KeyboardBuilder.inlineKeyboard().static()
        .buttons([
            InlineKeyboardButton.url("example", "https://example.site/"),
            InlineKeyboardButton.callbackData("example", "exampleData"),
            InlineKeyboardButton.webApp("example", "https://example.site/"),
            InlineKeyboardButton.loginUrl("example", "https://example.site/"),
            InlineKeyboardButton.switchInlineQuery("example", "query"),
            InlineKeyboardButton.switchInlineQueryCurrentChat("example", "query"),
            InlineKeyboardButton.callbackGame("example", "callbackGame"),
            InlineKeyboardButton.pay("example")
        ])
        .layout([4, 4])
        .build();
}

async function inlineKeyboardDynamic() {
    const inlineKeyboard = await KeyboardBuilder.inlineKeyboard().dynamic()
        .data([1, 2, 3, 4, 5, 6, 7, 8])
        .use(async (storage, data) => {
            storage.counter = 0;
        })
        .map(async (element, storage, positionIndex) => {
            console.log(storage.counter);
            if (positionIndex % 2 == 0) {
                storage.counter = + positionIndex;
                return InlineKeyboardButton.callbackData(element, storage.counter);
            }
            storage.counter = + positionIndex;
            return InlineKeyboardButton.callbackData(element, positionIndex);
        })
        .layout([4, 4])
        .build();
}
```


## Tech Stack

**Node.js**

## Authors

- [@SeRzZzJ](https://github.com/SeRzZzJ)


## Support

- [@SeRzZzJ](https://github.com/SeRzZzJ)

