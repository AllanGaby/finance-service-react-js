import { SaveLocalStorageRepository, SaveLocalStorageDTO, RecoverLocalStorageRepository } from '@/data/common/repositories'

export class LocalStorageRepository implements SaveLocalStorageRepository, RecoverLocalStorageRepository {
  async save<RecordType = any>({ key, record }: SaveLocalStorageDTO<RecordType>): Promise<RecordType> {
    if (!record) {
      localStorage.removeItem(key)
    }
    localStorage.setItem(key, JSON.stringify(record))
    return record
  }

  async recover<RecordType = any>(key: string): Promise<RecordType | string> {
    const result = localStorage.getItem(key)
    if (result) {
      try {
        return JSON.parse(result)
      } catch {
        return result
      }
    }
    return undefined
  }
}
