import { LayoutError } from "../exceptions/Layout.js";

export async function generateStaticKeyboard(layout, data) {
    return await generateKeyboard(layout, data, 0, data.length, async (data) => { }, async (data, storage, counter) => data);
}

export async function generateDynamicKeyboard(layout, data, start, end, use, map) {
    return await generateKeyboard(layout, data, start, end, use, map);
}

async function generateKeyboard(layout, data, start, end, callbackUse, callbackMap) {
    if (layout.length > data.length) throw new LayoutError("Cannot to make markup according to this layout");
    const keyboard = [];
    let storage = {};
    await callbackUse(storage, data);
    let counter = start;
    const cutEnd = layout.reduce((previousValue, currentValue) => previousValue + currentValue) - data.length;
    labelEnd: for (let i = 0; i < layout.length - cutEnd; i++) {
        let generateButtons = [];
        for (let j = 0; j < layout[i]; j++) {
            if (counter == end) break labelEnd;
            generateButtons.push(await callbackMap(data[counter], storage, counter));
            counter++;
        }
        keyboard.push(generateButtons);
    }
    return keyboard;
}