export type SaveLocalStorageDTO<RecordType = any> = {
  key: string
  record: RecordType
}

export interface SaveLocalStorageRepository {
  save: <RecordType = any>(params: SaveLocalStorageDTO<RecordType>) => Promise<RecordType>
}
