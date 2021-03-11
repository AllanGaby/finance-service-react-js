import { ThemeModel } from '@/domain/custom-theme'

export interface RecoverCustomThemeRepository {
  get: () => Promise<ThemeModel>
}
