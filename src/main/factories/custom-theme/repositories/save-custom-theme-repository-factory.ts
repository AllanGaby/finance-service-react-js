import { SaveCustomThemeRepository } from '@/data/custom-theme/repositories'
import { LocalStorageRepository } from '@/infra/common/repositories'
import { LocalStorageCustomThemeRepository } from '@/infra/custom-theme/repositories'

export const makeSaveCustomThemeRepository = (themeKey: string): SaveCustomThemeRepository => {
  const localStorageRepository = new LocalStorageRepository()
  return new LocalStorageCustomThemeRepository(themeKey, localStorageRepository, localStorageRepository)
}
