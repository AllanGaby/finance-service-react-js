export type LocalStorageContextModel = {
  addLocalStorageValue: <ValueType extends undefined>(key: string, value: ValueType) => Promise<ValueType>
  recoverLocalStorageValue: <ValueType extends undefined>(key: string) => Promise<ValueType>
}
