import { RecoverCustomThemeRepository } from '@/data/custom-theme/repositories'
import { LocalStorageRepository } from '@/infra/common/repositories'
import { LocalStorageCustomThemeRepository } from '@/infra/custom-theme/repositories'

export const makeRecoverCustomThemeRepository = (themeKey: string): RecoverCustomThemeRepository => {
  const localStorageRepository = new LocalStorageRepository()
  return new LocalStorageCustomThemeRepository(themeKey, localStorageRepository, localStorageRepository)
}
