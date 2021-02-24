import { SaveCustomThemeRepository, RecoverCustomThemeRepository } from '@/data/protocols/repositories/custom-theme'
import { ThemeModel } from '@/domain/models/custom-theme'
import { mockThemeModel } from './mock-custom-theme'

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
