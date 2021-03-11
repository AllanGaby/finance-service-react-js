import { ThemeModel } from '@/domain/custom-theme/entities'

export interface RecoverCustomThemeUseCase {
  getTheme: () => Promise<ThemeModel>
}
