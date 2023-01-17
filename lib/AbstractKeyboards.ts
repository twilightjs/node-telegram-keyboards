import { InlineKeyboardMarkup } from "./InlineKeyboardMarkup";
import { ReplyKeyboardMarkup } from "./ReplyKeyboardMarkup";
import { ButtonType, ButtonTypes } from "./ButtonTypes";
import { KeyboardBuilder } from "./KeyboardBuilder";
import { Layout } from "./keyboardGenerators";
import { Markup } from "./Markup";

export class LayoutKeyboard<
  T extends Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup>,
  U
> {
  private markup: T;
  private data: any[] = [];
  private start: number = 0;
  private end: number = 0;
  private map?: (element: any, positionIndex: number) => Promise<ButtonType<U>>;

  constructor(markup: T, data: any[]);

  constructor(
    markup: T,
    data: any[],
    start: number,
    end: number,
    map?: (element: any, positionIndex: number) => Promise<ButtonType<U>>
  );

  constructor(
    markup: T,
    data: any[],
    start: number = 0,
    end: number = data.length,
    map?: (element: any, positionIndex: number) => Promise<ButtonType<U>>
  ) {
    this.markup = markup;
    this.data = data;
    this.start = start;
    this.end = end;
    if (map) {
      this.map = map;
    }
  }

  public setLayout(
    layout: (layout: Layout) => Promise<number[]>
  ): KeyboardBuilder {
    if (this.data) {
      return new KeyboardBuilder(
        this.markup,
        layout,
        this.data,
        this.start,
        this.end,
        undefined
      );
    }
    return new KeyboardBuilder(
      this.markup,
      layout,
      this.data,
      this.start,
      this.end,
      this.map
    );
  }
}

export abstract class StaticKeyboard<
  T extends Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup>
> {
  protected markup: T;
  constructor(markup: T) {
    this.markup = markup;
  }

  public setButtons<U>(buttons: ButtonType<U>[]): LayoutKeyboard<T, U> {
    return new LayoutKeyboard(this.markup, buttons);
  }
}

export class DynamicKeyboard<
  T extends Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup>
> {
  protected markup: T;
  private data: any[] = [];
  private start: number = 0;
  private end: number = this.data.length;

  constructor(markup: T) {
    this.markup = markup;
  }

  public setData(
    data: any[],
    start: number = 0,
    end: number = data.length
  ): DynamicKeyboard<T> {
    this.data = data;
    this.start = start;
    this.end = end;
    return this;
  }

  public setMap<U>(
    callbackfn: (element: any, positionIndex: number) => Promise<ButtonType<U>>
  ): LayoutKeyboard<T, U> {
    return new LayoutKeyboard(
      this.markup,
      this.data,
      this.start,
      this.end,
      callbackfn
    );
  }

  public async setUse<U>(
    callbackfn: () => Promise<ButtonType<U>[]>
  ): Promise<LayoutKeyboard<T, U>> {
    const data = await callbackfn();
    return new LayoutKeyboard(this.markup, data, 0, data.length);
  }
}
