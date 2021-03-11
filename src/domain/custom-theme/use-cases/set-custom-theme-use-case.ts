import { ThemeModel } from '@/domain/custom-theme/entities'

export interface SetCustomThemeUseCase {
  setTheme: (theme: ThemeModel) => Promise<ThemeModel>
}
