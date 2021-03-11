export interface RecoverLocalStorageRepository {
  recover: <RecordType = any>(key: string) => Promise<RecordType | string>
}
