
![Logo](https://user-images.githubusercontent.com/64698297/175831179-01c8beda-1c18-4f96-8a84-1452c58206f5.png)


# Twilight.js telegram-keyboards

Twilight.js telegram-keyboards is an asynchronous library that allows you to generate dynamic and static keyboards and allows you to save the finished keyboard template in json and return the keyboard back from the json templater


## Features

- Template
- Asynchronous
- Handy
- Cross platform


## Examples

```javascript
async function replyKeyboardStatic() {
    const keyboard = await KeyboardBuilder.keyboard().static()
        .buttons([
            ReplyKeyboardButton.text("example"),
            ReplyKeyboardButton.contact("example"),
            ReplyKeyboardButton.location("example"),
            ReplyKeyboardButton.poll("example", "quiz"),
            ReplyKeyboardButton.webApp("example", "https://example.site/")
        ])
        .layout((data, template) => template.topToBottom())
        .build();
}

async function replyKeyboardDynamic() {
    const keyboard = await KeyboardBuilder.keyboard().dynamic()
        .data([1, 2, 3, 4, 5])
        .use(async (storage, data) => {
            storage.counter = 0;
        })
        .map(async (element, storage, positionIndex) => {
            if (positionIndex % 2 == 0) {
                storage.counter = + positionIndex;
                return ReplyKeyboardButton.text(storage.counter);
            }
            storage.counter = + positionIndex;
            return ReplyKeyboardButton.text(element);
        })
        .layout((data, template) => template.topToBottom())
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
        .layout((data, template) => template.topToBottom())
        .build();
}

async function inlineKeyboardDynamic() {
    const inlineKeyboard = await KeyboardBuilder.inlineKeyboard().dynamic()
        .data([1, 2, 3, 4, 5, 6, 7, 8])
        .use(async (storage, data) => {
            storage.counter = 0;
        })
        .map(async (element, storage, positionIndex) => {
            if (positionIndex % 2 == 0) {
                storage.counter = + positionIndex;
                return InlineKeyboardButton.callbackData(element, storage.counter);
            }
            storage.counter = + positionIndex;
            return InlineKeyboardButton.callbackData(element, positionIndex);
        })
        .layout((data, template) => template.topToBottom())
        .build();
}
```


## Tech Stack

**Node.js**

## Authors

- [@SeRzZzJ](https://github.com/SeRzZzJ)


## Support

- [@SeRzZzJ](https://github.com/SeRzZzJ)

