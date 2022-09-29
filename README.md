
![Logo](https://user-images.githubusercontent.com/64698297/175831179-01c8beda-1c18-4f96-8a84-1452c58206f5.png)


# Twilight.js telegram-keyboards

Twilight.js telegram-keyboards is an asynchronous library that allows you to generate dynamic and static keyboards and allows you to save the finished keyboard template in json and return the keyboard back from the json templater

## Table of Contents

- [Features](#features)
- [Installing](#installing)
- [Examples](#examples)
- [API reference](#api-reference)
	- [KeyboardBuilder](#keyboardbuilder)
	- [ReplyKeyboard reference](#replykeyboard-reference)
		- [ReplyKeyboardSelector](#replykeyboard-selector)
		- [StaticReplyKeyboard](#staticreplykeyboard)
		- [DynamicReplyKeyboard](#dynamicreplykeyboard)
		- [ReplyKeyboardButton](#replykeyboardbutton)
	- [InlineKeyboard reference](#inlinekeyboard-reference)
		- [InlineKeyboardSelector](#inlinekeyboardselector)
		- [StaticInlineKeyboard](#staticinlinekeyboard)
		- [DynamicInlineKeyboard](#dynamicinlinekeyboard)
		- [InlineKeyboardButton](#inlinekeyboardbutton)
    - [TemplateLayout](#templatelayout)


## Features

- Easy to generate keyboards of any complexity
- Easily save, create and use keyboard templates
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API

## Installing

Using npm:

```bash
$ npm i node-telegram-keyboards
```

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
## API reference
### KeyboardBuilder
| Method |Description|
| --------- | ------------ |
| static keyboard() |Returns a static or dynamic ReplyKeyboard keyboard selector|
| static inlineKeyboard() |Returns a static or dynamic InlineKeyboard keyboard selector|
| static assign(type, keyboards) |Connects all keyboards into one|
| static save(keyboard) |Converts ReplyKeyboard or InlineKeyboard objects to JSON object suitable for telegram|
| static async saveToJSON(keyboard, filename) |Converts and saves ReplyKeyboard or InlineKeyboard objects to a JSON file that can be used as ready-made keyboard template|
| static template(json) |Based on the keyboard template, builds a new ReplyKeyboard or InlineKeyboard object|
| static async templateFromJSON(pathToJSON) |Reads a JSON file and creates a new ReplyKeyboard or InlineKeyboard object based on the keyboard template|

### ReplyKeyboard reference
### ReplyKeyboardSelector
### StaticReplyKeyboard
### DynamicReplyKeyboard
### ReplyKeyboardButton
### InlineKeyboard reference
### InlineKeyboardSelector
### StaticInlineKeyboard
### DynamicInlineKeyboard
### InlineKeyboardButton
### TemplateLayout

## Tech Stack

**Node.js**

## Authors

- [@SeRzZzJ](https://github.com/SeRzZzJ)

## Support

- [@SeRzZzJ](https://github.com/SeRzZzJ)
