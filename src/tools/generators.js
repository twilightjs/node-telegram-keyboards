import {LayoutError} from "../exceptions/Layout.js";

export async function generateStaticKeyboard(callbackLayout, data) {
    return await generateKeyboard(callbackLayout, data, 0, data.length, async (data) => {
    }, async (data, storage, counter) => data);
}

export async function generateDynamicKeyboard(callbackLayout, data, start, end, use, map) {
    return await generateKeyboard(callbackLayout, data, start, end, use, map);
}

async function generateKeyboard(callbackLayout, data, start, end, callbackUse, callbackMap) {
    const layout = callbackLayout(data, new TemplateLayout(data));
    console.log(layout);
    if (layout.length > data.length) throw new LayoutError("Cannot to make markup according to this layout");
    const keyboard = [];
    let storage = {};
    await callbackUse(storage, data);
    let counter = start;
    const cutEnd = layout.reduce((previousValue, currentValue) => previousValue + currentValue) - data.length;
    labelEnd: for (let i = 0; i < layout.length - cutEnd; i++) {
        let generateButtons = [];
        for (let j = 0; j < layout[i]; j++) {
            if (counter === end) break labelEnd;
            const button = await callbackMap(data[counter], storage, counter);
            if (!button) {
                counter++;
                continue;
            }
            generateButtons.push(button);
            counter++;
        }
        if (!(generateButtons.length === 0)) keyboard.push(generateButtons);
    }
    return keyboard;
}

class TemplateLayout {
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
