import { SetCustomThemeUseCase } from '@/domain/usecases/custom-theme'
import { ThemeModel } from '@/domain/models/custom-theme'
import { SaveCustomThemeRepository } from '@/data/protocols/repositories/custom-theme'

export class LocalSetCustomThemeUseCase implements SetCustomThemeUseCase {
  constructor (private readonly saveCustomThemeRepository: SaveCustomThemeRepository) {}

  async setTheme (theme: ThemeModel): Promise<ThemeModel> {
    return await this.saveCustomThemeRepository.save(theme)
  }
}
