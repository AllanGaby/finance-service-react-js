import { SetCustomThemeUseCase } from '@/domain/custom-theme'
import { LocalSetCustomThemeUseCase } from '@/data/custom-theme/use-cases'
import { makeSaveCustomThemeRepository } from '@/main/factories/custom-theme/repositories'

export const makeSetCustomThemeUseCase = (): SetCustomThemeUseCase => {
  return new LocalSetCustomThemeUseCase(makeSaveCustomThemeRepository('custom-theme'))
}
