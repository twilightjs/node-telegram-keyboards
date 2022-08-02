import {
    StaticAbstractKeyboard,
    DynamicAbstractKeyboard,
    StaticReplyKeyboardCreator,
    DynamicReplyKeyboardCreator,
    LayoutBuilder
} from "./tools/AbstractObject.js";

export class ReplyKeyboardSelector {
    static() {
        return new StaticReplyKeyboard();
    }

    dynamic() {
        return new DynamicReplyKeyboard();
    }
}

class ReplyKeyboard {
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

Object.assign(ReplyKeyboard.prototype, LayoutBuilder);

export class StaticReplyKeyboard extends ReplyKeyboard {
    _type = "static";
}

Object.assign(StaticReplyKeyboard.prototype, StaticAbstractKeyboard, StaticReplyKeyboardCreator);

export class DynamicReplyKeyboard extends ReplyKeyboard {
    _type = "dynamic";
}

Object.assign(DynamicReplyKeyboard.prototype, DynamicAbstractKeyboard, DynamicReplyKeyboardCreator);

export class ReplyKeyboardButton {
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

