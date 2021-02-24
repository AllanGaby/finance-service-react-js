import { ThemeModel } from '@/domain/models/custom-theme'

export interface RecoverCustomThemeUseCase {
  getTheme: () => Promise<ThemeModel>
}
