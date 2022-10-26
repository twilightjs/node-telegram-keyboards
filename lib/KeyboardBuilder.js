import {InlineKeyboardSelector} from "./InlineKeyboard.js";
import {KeyboardSelector} from "./Keyboard.js";
import {TemplateLayout} from "./tools/generators.js";
import {writeFile, readFile} from "node:fs";
import * as path from "path";

export class KeyboardBuilder {
    /**
     * @static
     * @returns {KeyboardSelector} returns a static or dynamic ReplyKeyboard keyboard selector
    */
    static keyboard() {
        return new KeyboardSelector();
    }

    /**
     * @static
     * @returns {InlineKeyboardSelector} returns a static or dynamic InlineKeyboard keyboard selector
     */
    static inlineKeyboard() {
        return new InlineKeyboardSelector();
    }

    /**
     * @static
     * @param {string} type keyboard or inline_keyboard
     * @param {Array} keyboards Keyboards array
     * @returns {Object} Returns the final keyboard as an object suitable for telegram
     * @description Connects all keyboards into one
     */
    static assign(type, keyboards) {
        let finishedKeyboard = keyboards[0];
        for (let i = 1; i < keyboards.length; i++) {
            for (let j = 0; j <= keyboards.length; j++) {
                if (!(keyboards[i][type][j])) break;
                finishedKeyboard[type].push(keyboards[i][type][j]);
            }
        }
        return finishedKeyboard;
    }

    /**
     * @static
     * @param {(ReplyKeyboard|InlineKeyboard)} keyboard object ReplyKeyboard or object InlineKeyboard
     * @returns {Object} returns keyboard object suitable for telegram
     * @description Converts ReplyKeyboard or InlineKeyboard objects to JSON object suitable for telegram
     */
    static save(keyboard) {
        return this.#saveJSON(keyboard);
    }

    /**
     * @static
     * @async asynchronously writes to json file
     * @param {(ReplyKeyboard|InlineKeyboard)} keyboard object ReplyKeyboard or object InlineKeyboard
     * @param {string} filename filename
     * @description Converts and saves ReplyKeyboard or InlineKeyboard objects to a JSON file that can be used as ready-made keyboard template
     */
    static async saveToJSON(keyboard, filename) {
        await writeFile(path.join(process.mainModule.path, `./${filename}.json`), this.#saveJSON(keyboard), (err) => {
            if (err) throw err;
        });
    }

    /**
     * @access private
     */
    static #saveJSON(keyboard) {
        let json = {
            format: keyboard._format,
            type: keyboard._type,
            layout: keyboard._layout(keyboard._data, new TemplateLayout(keyboard._data)),
        };
        if (keyboard._type === "static") json.data = keyboard._data;
        if (keyboard._format === "keyboard") json.field = keyboard._field;
        return JSON.stringify(json);
    }

    /**
     * @static
     * @param {Object} json JSON keyboard template object
     * @returns {(ReplyKeyboard|InlineKeyboard)} returns a new ReplyKeyboard or InlineKeyboard object
     * @description Based on the keyboard template, builds a new ReplyKeyboard or InlineKeyboard object
     */
    static template(json) {
        return this.#templateJSON(json);
    }

    /**
     * @static
     * @async reads from json file asynchronously
     * @param {string} pathToJSON full path to JSON file
     * @returns {Object} returns a new ReplyKeyboard or InlineKeyboard object
     * @description Reads a JSON file and creates a new ReplyKeyboard or InlineKeyboard object based on the keyboard template
     */
    static
    async templateFromJSON(pathToJSON) {
        return new Promise((resolve, reject) => {
            readFile(path.resolve(process.env.PWD, pathToJSON.replace(/(\.\/)|(\.\.\/)/gm, "")), (err, data) => {
                if (err) reject(err);
                resolve(this.#templateJSON(JSON.parse(data.toString())));
            });
        });
    }

    /**
     * @access private
     */
    static #templateJSON(json) {
        const keyboard = KeyboardBuilder[json.format]()[json.type]().layout(json.layout);
        if (keyboard._type === "static") keyboard._data = json.data;
        if (keyboard._format === "keyboard") keyboard._field = json.field;
        if (json.function && keyboard._type === "dynamic") keyboard._map = new Function("element", "storage", "positionIndex", json.function);
        return keyboard;
    }
}