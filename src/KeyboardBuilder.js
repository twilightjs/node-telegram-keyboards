import {InlineKeyboardSelector, InlineStaticKeyboard} from "./InlineKeyboard.js";
import {DynamicReplyKeyboard, ReplyKeyboardSelector, StaticReplyKeyboard} from "./ReplyKeyboard.js";
import * as fs from 'node:fs';
import {writeFile, readFile} from "node:fs";

export class KeyboardBuilder {
    static keyboard() {
        return new ReplyKeyboardSelector();
    }

    static inlineKeyboard() {
        return new InlineKeyboardSelector();
    }

    static assign(type, keyboards) {
        let finishedKeyboard = keyboards[0];
        for (let i = 1; i < keyboards.length; i++) {
            for (let j = 0; j < (keyboards.length - 1); j++) {
                finishedKeyboard[type].push(keyboards[i][type][j]);
            }
        }
        return finishedKeyboard;
    }

    static save(keyboard) {
        return this.#saveJSON(keyboard);
    }

    static async saveToJSON(keyboard, name) {
        await writeFile(`./${name}.json`, this.#saveJSON(keyboard), (err) => {
            if (err) throw err;
        });
    }

    static #saveJSON(keyboard) {
        let json = {
            format: keyboard._format,
            type: keyboard._type,
            layout: keyboard._layout,
        };
        if (keyboard._type === "static") json.data = keyboard._data;
        if (keyboard._format === "keyboard") json.field = keyboard._field;
        return JSON.stringify(json);
    }

    static template(json) {
        return this.#templateJSON(json);
    }

    static async templateFromJSON(pathToJSON) {
        return new Promise((resolve, reject) => {
            readFile(pathToJSON, (err, data) => {
                if (err) throw reject(err);
                resolve(this.#templateJSON(JSON.parse(data.toString())));
            });
        });
    }

    static #templateJSON(json) {
        const keyboard = KeyboardBuilder[json.format]()[json.type]().layout(json.layout);
        if (keyboard._type === "static") keyboard._data = json.data;
        if (keyboard._format === "keyboard") keyboard._field = json.field;
        if (json.function && keyboard._type === "dynamic") keyboard._map = new Function("element", "storage", "positionIndex", json.function);
        return keyboard;
    }

}