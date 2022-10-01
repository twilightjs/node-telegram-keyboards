
![Logo](https://user-images.githubusercontent.com/64698297/175831179-01c8beda-1c18-4f96-8a84-1452c58206f5.png)


# twilightjs

node-telegram-keyboards is an asynchronous library that allows you to generate dynamic and static keyboards and allows you to save the finished keyboard template in json and return the keyboard back from the json templater

## Table of Contents

- [Features](#features)
- [Installing](#installing)
- [Examples](#examples)
- [API reference](#api-reference)
	- [KeyboardBuilder](#keyboardbuilder)
	- [Static and Dynamic Keyboard or InlineKeyboard reference](#static-and-dynamic-keyboard-or-inlinekeyboard-reference)
		- [Keyboard](#keyboard)
		- [KeyboardButtons](#keyboardbuttons)
		- [InlineKeyboard](#inlinekeyboard)
		- [InlineKeyboardButtons](#inlinekeyboardbutton)
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
| -------- | -------------- |
| static keyboard() |Returns a static or dynamic ReplyKeyboard keyboard selector|
| static inlineKeyboard() |Returns a static or dynamic InlineKeyboard keyboard selector|
| static assign(type, keyboards) |Connects all keyboards into one|
| static save(keyboard) |Converts ReplyKeyboard or InlineKeyboard objects to JSON object suitable for telegram|
| static async saveToJSON(keyboard, filename) |Converts and saves ReplyKeyboard or InlineKeyboard objects to a JSON file that can be used as ready-made keyboard template|
| static template(json) |Based on the keyboard template, builds a new ReplyKeyboard or InlineKeyboard object|
| static async templateFromJSON(pathToJSON) |Reads a JSON file and creates a new ReplyKeyboard or InlineKeyboard object based on the keyboard template|

### Static and Dynamic Keyboard or InlineKeyboard reference
Common methods that both keyboards have.

In static implementation:

| Method| Parameters  | Description |
| ------ | ---------- | ------------------ |
| buttons(buttons) |buttons: array, array of KeyboardButtons or InlineKeyboardButtons|An array of buttons to which you need to pass KeyboardButtons or InlineKeyboardButtons objects, depending on which keyboard you are building Keyboard or InlineKeyboard|

In dynamic implementation:

| Method| Parameters  | Description |
| --------- | --------------------- | -------------------- |
| data(array, start, end) |array: array, start: number, end: number |It takes an array of data as input, which it then converts to KeyboardButtons or InlineKeyboardButtons, the start and end parameters are needed to indicate from which position to take elements for buttons, by default the entire array is taken, they can be omitted |
| use(callbackfn) |async/sync (storage: object, data: array) => storage|It accepts a callback function as input, which initializes the store, which is passed to the callback function in the map method, in this store you can pass data between KeyboardButtons or InlineKeyboardButtons|
| map(callbackfn) |async/sync (element: the type is equal to the type of the element retrieved from the data , storage: object, positionIndex: number) => KeyboardButtons or InlineKeyboardButtons |It accepts a callback function as input, which is called for each element from the data array and converts it to KeyboardButtons or InlineKeyboardButtons |

For all implementations:

| Method| Parameters  | Description |
| --------- | ---------------------- | ------------------------------------------- |
| layout(callbackfn) |async/sync (data: array, template: TemplateLayout) => array|It takes a callback function as input, which should return an array with markup, the markup looks like this, you specify how many buttons will be in a row and how many lines there will be. For example: [5] - 5 buttons will be placed in a row, [1, 1, 1, 1, 1] - there will be 5 buttons in 5 lines, [2, 3] - buttons will be located on two lines, on the first 2, on the second 3 respectively. *In the markup, you must specify the exact number of buttons or specify the markup calculation algorithm in the callback function, otherwise there will be an error|
| async build() |-|Returns a finished keyboard that can be sent to Telegram|

### Keyboard
### KeyboardButtons
### InlineKeyboard
### InlineKeyboardButtons
### TemplateLayout

## Tech Stack

**Node.js**

## Authors

- [@SeRzZzJ](https://github.com/SeRzZzJ)

## Support

- [@SeRzZzJ](https://github.com/SeRzZzJ)
