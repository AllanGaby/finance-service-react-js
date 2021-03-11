import { SetCustomThemeUseCase, ThemeModel } from '@/domain/custom-theme'
import { SaveCustomThemeRepository } from '@/data/custom-theme/repositories'

export class LocalSetCustomThemeUseCase implements SetCustomThemeUseCase {
  constructor (private readonly saveCustomThemeRepository: SaveCustomThemeRepository) {}

  async setTheme (theme: ThemeModel): Promise<ThemeModel> {
    return await this.saveCustomThemeRepository.save(theme)
  }
}
