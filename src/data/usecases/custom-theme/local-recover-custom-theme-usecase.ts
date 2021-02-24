import { RecoverCustomThemeUseCase } from '@/domain/usecases/custom-theme'
import { ThemeModel } from '@/domain/models/custom-theme'
import { RecoverCustomThemeRepository } from '@/data/protocols/repositories/custom-theme'

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
