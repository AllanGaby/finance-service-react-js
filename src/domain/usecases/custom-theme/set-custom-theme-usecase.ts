import { ThemeModel } from '@/domain/models/custom-theme'

export interface SetCustomThemeUseCase {
  setTheme: (theme: ThemeModel) => Promise<ThemeModel>
}
