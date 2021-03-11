import { RecoverCustomThemeUseCase, ThemeModel } from '@/domain/custom-theme'
import { RecoverCustomThemeRepository } from '@/data/custom-theme/repositories'

export class LocalRecoverCustomThemeUseCase implements RecoverCustomThemeUseCase {
  constructor (
    private readonly recoverCustomThemeRepository: RecoverCustomThemeRepository,
    private readonly defaultTheme: ThemeModel
  ) {}

  async getTheme (): Promise< ThemeModel> {
    const theme = await this.recoverCustomThemeRepository.get()
    if (theme) {
      return theme
    }
    return this.defaultTheme
  }
}
