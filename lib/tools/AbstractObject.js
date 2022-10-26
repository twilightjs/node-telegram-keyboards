import { BuildError } from "../exceptions/BuildExceptions.js";
import { generateDynamicKeyboardWithMap, generateDynamicKeyboardWithUse, generateStaticKeyboard } from "./generators.js";

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

    storage(callback) {
        this._storage = callback;
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

let KeyboardBuildSupport = {
    async _checkExceptionsAndKeyboardBuild() {
        if (!this._use && (!this._map || !this._data)) throw new BuildError("Build error use() method or map() and data() methods not implemented");
        //( && (!this._map || !this._data)) || this._use && this._map || this._data)
        if (this._use) return await generateDynamicKeyboardWithUse(
            this._layout,
            this._storage = async (storage, data) => { },
            this._use
        );

        if (!this._use && (this._map || this._data)) return await generateDynamicKeyboardWithMap(
            this._layout,
            this._data,
            this._dataStart,
            this._dataEnd,
            this._storage = async (storage, data) => { },
            this._map
        );
    }
};

export let StaticKeyboardCreator = {
    async build() {
        this._field.keyboard = await generateStaticKeyboard(this._layout, this._data);
        return this._field;
    }
}

export let DynamicKeyboardCreator = Object.assign({
    async build() {
        this._field.keyboard = await this._checkExceptionsAndKeyboardBuild();
        return this._field;
    }
}, KeyboardBuildSupport)

export let StaticInlineKeyboardCreator = {
    async build() {
        return {
            inline_keyboard: await generateStaticKeyboard(this._layout, this._data)
        };
    }
}

export let DynamicInlineKeyboardCreator = Object.assign({
    async build() {
        return {
            inline_keyboard: await this._checkExceptionsAndKeyboardBuild()
        };
    }
}, KeyboardBuildSupport)

export let LayoutBuilder = {
    layout(callback) {
        this._layout = callback;
        return this;
    }
}
