import { RecoverCustomThemeUseCase } from '@/domain/usecases/custom-theme'
import { ThemeModel } from '@/domain/models/custom-theme'
import { RecoverCustomThemeRepository } from '@/data/protocols/repositories/custom-theme'

export class LocalRecoverCustomThemeUseCase implements RecoverCustomThemeUseCase {
  constructor (private readonly recoverCustomThemeRepository: RecoverCustomThemeRepository) {}

  async getTheme (): Promise< ThemeModel> {
    return await this.recoverCustomThemeRepository.get()
  }
}
