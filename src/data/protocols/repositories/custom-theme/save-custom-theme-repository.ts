import { ThemeModel } from '@/domain/models/custom-theme'

export interface SaveCustomThemeRepository {
  save: (theme: ThemeModel) => Promise<ThemeModel>
}
