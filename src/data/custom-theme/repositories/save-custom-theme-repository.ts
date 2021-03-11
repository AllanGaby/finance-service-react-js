import { ThemeModel } from '@/domain/custom-theme'

export interface SaveCustomThemeRepository {
  save: (theme: ThemeModel) => Promise<ThemeModel>
}
