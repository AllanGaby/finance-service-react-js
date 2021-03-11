import { RecoverCustomThemeUseCase, ThemeModel } from '@/domain/custom-theme'
import { LocalRecoverCustomThemeUseCase } from '@/data/custom-theme/use-cases'
import { makeRecoverCustomThemeRepository } from '@/main/factories/custom-theme/repositories'

export const makeRecoverCustomThemeUseCase = (): RecoverCustomThemeUseCase => {
  return new LocalRecoverCustomThemeUseCase(makeRecoverCustomThemeRepository('custom-theme'), ThemeModel.dark)
}
