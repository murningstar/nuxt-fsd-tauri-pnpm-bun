/* Типы из примера в https://vuejs.org/api/render-function.html#h (09.06.2025) */

type Children = string | number | boolean | VNode | null | Children[];

/**
 * Children is `string | number | boolean | VNode | null | Children[]`
 * @example
 * ``` ts
 *  type SomeObj = { slotProp: Slot; SlotProp2: Slot}
 *  ...
 *  const obj: SomeObj = {
 *      slotProp: () => h(SomeComponent, {...}, 'text'),
 *      slotProp2: () => h('div', {...}, [h(...), h(...)])
 *  }
 * ```
 */
export type Slot = () => Children;
