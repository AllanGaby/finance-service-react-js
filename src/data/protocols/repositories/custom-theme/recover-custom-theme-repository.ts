import { ThemeModel } from '@/domain/models/custom-theme'

export interface RecoverCustomThemeRepository {
  get: () => Promise<ThemeModel>
}
