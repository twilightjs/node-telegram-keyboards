export async function generateStaticKeyboard(
  callbackLayout: (layout: Layout) => Promise<number[]>,
  data: any[]
) {
  return await generateKeyboardWithMap(
    callbackLayout,
    data,
    0,
    data.length,
    async (storage) => {},
    async (data, storage, counter) => data
  );
}

export async function generateDynamicKeyboardWithMap(
  callbackLayout: (layout: Layout) => Promise<number[]>,
  data: any[],
  start: number,
  end: number,
  callbackStorage: (storage: object) => Promise<void>,
  callbackMap: (
    element: any,
    stotage: object,
    positionIndex: number
  ) => Promise<number[]>
) {
  return await generateKeyboardWithMap(
    callbackLayout,
    data,
    start,
    end,
    callbackStorage,
    callbackMap
  );
}

async function generateKeyboardWithMap(
  callbackLayout: (layout: Layout) => Promise<number[]>,
  data: any[],
  start: number,
  end: number,
  callbackStorage: (storage: object) => Promise<void>,
  callbackMap: (
    element: any,
    stotage: object,
    positionIndex: number
  ) => Promise<number[]>
) {
  return await generateKeyboard(
    callbackLayout,
    data,
    start,
    end,
    callbackStorage,
    callbackMap
  );
}

export async function generateDynamicKeyboardWithUse(
  callbackLayout: (layout: Layout) => Promise<number[]>,
  callbackStorage: (storage: object) => Promise<void>,
  callbackUse: () => Promise<object[]>
) {
  return await generateKeyboardWithUse(
    callbackLayout,
    callbackStorage,
    callbackUse
  );
}

async function generateKeyboardWithUse(
  callbackLayout: (layout: Layout) => Promise<number[]>,
  callbackStorage: (storage: object) => Promise<void>,
  callbackUse: () => Promise<object[]>
) {
  const buttons = await callbackUse();
  return await generateKeyboard(
    callbackLayout,
    buttons,
    0,
    buttons.length,
    callbackStorage,
    undefined
  );
}

async function generateKeyboard(
  callbackLayout: (layout: Layout) => Promise<number[]>,
  data: any[],
  start: number,
  end: number,
  callbackStorage: (storage: object) => Promise<void>,
  callbackMap:
    | ((
        element: any,
        stotage: object,
        positionIndex: number
      ) => Promise<number[]>)
    | undefined
): Promise<object[]> {
  const dataOrButtons: any[] = data;
  const layout: number[] =
    typeof callbackLayout === "object"
      ? callbackLayout
      : await callbackLayout(new Layout(dataOrButtons));
  //   if (layout.length > dataOrButtons.length)
  //     throw new LayoutError("Cannot to make markup according to this layout");
  const keyboard: object[] = [];
  let storage: object = {};
  await callbackStorage(storage);
  let counter: number = start;
  const cutEnd: number =
    layout.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    ) - dataOrButtons.length;
  labelEnd: for (let i = 0; i < layout.length - cutEnd; i++) {
    let generatedButtons: object[] = [];
    for (let j = 0; j < layout[i]; j++) {
      if (counter === end) break labelEnd;
      const button = callbackMap
        ? await callbackMap(data[counter], storage, counter)
        : dataOrButtons[counter];
      if (!button) {
        counter++;
        continue;
      }
      generatedButtons.push(button);
      counter++;
    }
    if (!(generatedButtons.length === 0)) keyboard.push(generatedButtons);
  }
  return keyboard;
}

export class Layout {
  private data;

  constructor(data: any[]) {
    this.data = data;
  }

  leftToRight() {
    return [this.data.length];
  }

  topToBottom() {
    const layout = [];
    for (let i = 0; i < this.data.length; i++) {
      layout.push(1);
    }
    return layout;
  }
}
