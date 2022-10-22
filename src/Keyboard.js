import {
    StaticAbstractKeyboard,
    DynamicAbstractKeyboard,
    StaticKeyboardCreator,
    DynamicKeyboardCreator,
    LayoutBuilder
} from "./tools/AbstractObject.js";

export class KeyboardSelector {
    static() {
        return new StaticKeyboard();
    }

    dynamic() {
        return new DynamicKeyboard();
    }
}

class Keyboard {
    _format = "keyboard";
    _field = {};

    resize() {
        this._field.resize_keyboard = true;
        return this;
    }

    oneTime() {
        this._field.one_time_keyboard = true;
        return this;
    }

    inputFieldPlaceholder(value) {
        this._field.input_field_placeholder = value;
        return this;
    }

    selective() {
        this._field.selective = true;
        return this;
    }
}

Object.assign(Keyboard.prototype, LayoutBuilder);

export class StaticKeyboard extends Keyboard {
    _type = "static";
}

Object.assign(StaticKeyboard.prototype, StaticAbstractKeyboard, StaticKeyboardCreator);

export class DynamicKeyboard extends Keyboard {
    _type = "dynamic";
}

Object.assign(DynamicKeyboard.prototype, DynamicAbstractKeyboard, DynamicKeyboardCreator);

export class KeyboardButtons {
    static text(text) {
        return {
            text: text
        };
    }

    static contact(text) {
        return {
            text: text,
            request_contact: true
        };
    }

    static location(text) {
        return {
            text: text,
            request_location: true
        };
    }

    static poll(text, type) {
        return {
            text: text,
            request_poll: type
        };
    }

    static webApp(text, url) {
        return {
            text: text,
            web_app: url
        };
    }
}

