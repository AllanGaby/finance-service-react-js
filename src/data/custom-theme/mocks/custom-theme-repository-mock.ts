import { SaveCustomThemeRepository, RecoverCustomThemeRepository } from '@/data/custom-theme/repositories'
import { ThemeModel } from '@/domain/custom-theme'
import { mockThemeModel } from './custom-theme-mock'

export class SaveCustomThemeRepositorySpy implements SaveCustomThemeRepository {
  param: ThemeModel
  result: ThemeModel = mockThemeModel()

  async save (theme: ThemeModel): Promise<ThemeModel> {
    this.param = theme
    return this.result
  }
}

export class RecoverCustomThemeRepositoryStub implements RecoverCustomThemeRepository {
  result: ThemeModel = mockThemeModel()

  async get (): Promise<ThemeModel> {
    return this.result
  }
}
