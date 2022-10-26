import { LayoutError } from "../exceptions/LayoutExceptions.js";

export async function generateStaticKeyboard(callbackLayout, data) {
    return await generateKeyboardWithMap(callbackLayout, data, 0, data.length, async (storage, data) => { }, async (data, storage, counter) => data);
}

export async function generateDynamicKeyboardWithMap(callbackLayout, data, start, end, storage, map) {
    return await generateKeyboardWithMap(callbackLayout, data, start, end, storage, map);
}

async function generateKeyboardWithMap(callbackLayout, data, start, end, callbackStorage, callbackMap) {
    return await generateKeyboard(callbackLayout, data, start, end, callbackStorage, callbackMap);
}

export async function generateDynamicKeyboardWithUse(callbackLayout, callbackStorage, callbackUse) {
    return await generateKeyboardWithUse(callbackLayout, callbackStorage, callbackUse);
}

async function generateKeyboardWithUse(callbackLayout, callbackStorage, callbackUse) {
    const buttons = await callbackUse();
    return await generateKeyboard(callbackLayout, buttons, 0, buttons.length, callbackStorage, undefined);
}

async function generateKeyboard(callbackLayout, data, start, end, callbackStorage, callbackMap) {
    const dataOrButtons = data;
    const layout = (typeof callbackLayout) === "object" ? callbackLayout : await callbackLayout(dataOrButtons, new TemplateLayout(dataOrButtons));
    if (layout.length > dataOrButtons.length) throw new LayoutError("Cannot to make markup according to this layout");
    const keyboard = [];
    let storage = {};
    await callbackStorage(storage);
    let counter = start;
    const cutEnd = layout.reduce((previousValue, currentValue) => previousValue + currentValue, 0) - dataOrButtons.length;
    labelEnd: for (let i = 0; i < layout.length - cutEnd; i++) {
        let generatedButtons = [];
        for (let j = 0; j < layout[i]; j++) {
            if (counter === end) break labelEnd;
            const button = callbackMap ? await callbackMap(data[counter], storage, counter) : dataOrButtons[counter];
            if (!button) {
                counter++;
                continue;
            }
            generatedButtons.push(button);
            counter++;
        }
        if (!(generatedButtons.length === 0)) keyboard.push(generatedButtons);
    }
    return keyboard;
}

export class TemplateLayout {
    _data;

    constructor(data) {
        this._data = data;
    }

    leftToRight() {
        return [this._data.length];
    }

    topToBottom() {
        const layout = [];
        for (let i = 0; i < this._data.length; i++) {
            layout.push(1);
        }
        return layout;
    }
}
