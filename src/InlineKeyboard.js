import {
    StaticAbstractKeyboard,
    DynamicAbstractKeyboard,
    StaticInlineKeyboardCreator,
    DynamicInlineKeyboardCreator,
    LayoutBuilder
} from "./tools/AbstractObject.js";

export class InlineKeyboardSelector {
    static() {
        return new InlineStaticKeyboard();
    }

    dynamic() {
        return new InlineDynamicKeyboard();
    }
}

class InlineKeyboard {
    _format = "inlineKeyboard";
    _layout;
}

Object.assign(InlineKeyboard.prototype, LayoutBuilder);

export class InlineStaticKeyboard extends InlineKeyboard {
    _type = "static";
}

Object.assign(InlineStaticKeyboard.prototype, StaticAbstractKeyboard, StaticInlineKeyboardCreator);

export class InlineDynamicKeyboard extends InlineKeyboard {
    _type = "dynamic";
}

Object.assign(InlineDynamicKeyboard.prototype, DynamicAbstractKeyboard, DynamicInlineKeyboardCreator);

export class InlineKeyboardButton {
    static url(text, url) {
        return {
            text: text,
            url: url
        };
    }

    static callbackData(text, callbackData) {
        return {
            text: text,
            callback_data: callbackData
        };
    }

    static webApp(text, url) {
        return {
            text: text,
            web_app: url
        };
    }

    static loginUrl(text, url) {
        return {
            text: text,
            login_url: url
        };
    }

    static switchInlineQuery(text, query) {
        return {
            text: text,
            switch_inline_query: query
        };
    }

    static switchInlineQueryCurrentChat(text, query) {
        return {
            text: text,
            switch_inline_query_current_chat: query
        };
    }

    static callbackGame(text, callbackGame) {
        return {
            text: text,
            callback_game: callbackGame
        };
    }

    static pay(text) {
        return {
            text: text,
            pay: true
        };
    }
}
