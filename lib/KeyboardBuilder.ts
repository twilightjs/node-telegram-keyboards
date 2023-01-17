import { InlineKeyboard } from "./BuildKeyboards";
import { ButtonType } from "./ButtonTypes";
import { InlineKeyboardMarkup } from "./InlineKeyboardMarkup";
import { Layout } from "./keyboardGenerators";
import {
  InlineKeyboardMarkupTypeSelector,
  KeyboardMarkupTypeSelector,
  ReplyKeyboardMarkupTypeSelector,
} from "./KeyboardMarkupTypeSelector";
import { ReplyKeyboardMarkup } from "./ReplyKeyboardMarkup";

export class KeyboardBuilder {
  private markup: ReplyKeyboardMarkup | InlineKeyboardMarkup;
  private layout: (layout: Layout) => Promise<number[]>;
  private data: any[];
  private start: number;
  private end: number;
  private map?: (element: any, positionIndex: number) => Promise<any>;

  constructor(
    markup: ReplyKeyboardMarkup | InlineKeyboardMarkup,
    layout: (layout: Layout) => Promise<number[]>,
    data: any[],
    start: number,
    end: number,
    map?: (element: any, positionIndex: number) => Promise<any>
  ) {
    this.markup = markup;
    this.layout = layout;
    this.data = data;
    this.start = start;
    this.end = end;
    this.map = map;
  }

  public static keyboard(): KeyboardMarkupTypeSelector<ReplyKeyboardMarkup> {
    return new ReplyKeyboardMarkupTypeSelector();
  }

  public static inlineKeyboard(): KeyboardMarkupTypeSelector<InlineKeyboardMarkup> {
    return new InlineKeyboardMarkupTypeSelector();
  }

  public static assign() {}

  public async build(): Promise<ReplyKeyboardMarkup | InlineKeyboardMarkup> {
    const dataOrButtons: any[] = this.data;
    const layout: number[] = await this.layout(new Layout(dataOrButtons));
    // typeof this.layout === "object"
    //   ? this.layout
    //   :
    //   if (layout.length > dataOrButtons.length)
    //     throw new LayoutError("Cannot to make markup according to this layout");
    let counter: number = this.start;
    const cutEnd: number =
      layout.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      ) - dataOrButtons.length;
    labelEnd: for (let i = 0; i < layout.length - cutEnd; i++) {
      let generatedButtons: ButtonType<any>[] = [];
      for (let j = 0; j < layout[i]; j++) {
        if (counter === this.end) break labelEnd;
        const button = this.map
          ? await this.map(this.data[counter], counter)
          : dataOrButtons[counter];
        if (!button) {
          counter++;
          continue;
        }
        generatedButtons.push(button);
        counter++;
      }
      if (!(generatedButtons.length === 0)) {
        if ((<ReplyKeyboardMarkup>this.markup).keyboard) {
          (<ReplyKeyboardMarkup>this.markup).keyboard.push(generatedButtons);
        }
        if (<InlineKeyboardMarkup>this.markup) {
        }
      }
    }
    if ((<ReplyKeyboardMarkup>this.markup).keyboard) {
      return <ReplyKeyboardMarkup>this.markup;
    }
    if (<InlineKeyboardMarkup>this.markup) {
    }
    return <ReplyKeyboardMarkup>this.markup;
  }
}
