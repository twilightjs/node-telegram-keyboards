import {generateDynamicKeyboard, generateStaticKeyboard} from "./generators.js";

export let StaticAbstractKeyboard = {
    _type: "static",
    buttons(buttons) {
        this._data = buttons;
        return this;
    }
}

export let DynamicAbstractKeyboard = {
    _type: "dynamic",
    data(array, start = 0, end = array.length) {
        this._data = array;
        this._dataStart = start;
        this._dataEnd = end;
        return this;
    },

    use(callback) {
        this._use = callback;
        return this;
    },

    map(callback) {
        this._map = callback;
        return this;
    }
};

export let StaticReplyKeyboardCreator = {
    async build() {
        this._field.keyboard = await generateStaticKeyboard(this._layout, this._data);
        return this._field;
    }
}

export let DynamicReplyKeyboardCreator = {
    async build() {
        this._field.keyboard = await generateDynamicKeyboard(this._layout, this._data, this._dataStart, this._dataEnd, this._use, this._map);
        return this._field;
    }
}

export let StaticInlineKeyboardCreator = {
    async build() {
        return {
            inline_keyboard: await generateStaticKeyboard(this._layout, this._data)
        };
    }
}

export let DynamicInlineKeyboardCreator = {
    async build() {
        return {
            inline_keyboard: await generateDynamicKeyboard(this._layout, this._data, this._dataStart, this._dataEnd, this._use, this._map)
        };
    }
}

export let LayoutBuilder = {
    layout(callback) {
        this._layout = callback;
        return this;
    }
}
