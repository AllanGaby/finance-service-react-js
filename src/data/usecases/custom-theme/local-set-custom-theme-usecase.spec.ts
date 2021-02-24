import { LocalSetCustomThemeUseCase } from './local-set-custom-theme-usecase'
import { mockThemeModel, SaveCustomThemeRepositorySpy } from '@/data/tests/custom-theme'

type sutTypes = {
  sut: LocalSetCustomThemeUseCase
  saveCustomThemeRepositorySpy: SaveCustomThemeRepositorySpy
}

const makeSut = (): sutTypes => {
  const saveCustomThemeRepositorySpy = new SaveCustomThemeRepositorySpy()
  const sut = new LocalSetCustomThemeUseCase(saveCustomThemeRepositorySpy)
  return {
    sut,
    saveCustomThemeRepositorySpy
  }
}

describe('LocalSetCustomThemeUseCase', () => {
  test('Deve chamar o repositório com o valor correto', async () => {
    const { sut, saveCustomThemeRepositorySpy } = makeSut()
    const theme = mockThemeModel()
    await sut.setTheme(theme)
    expect(saveCustomThemeRepositorySpy.param).toEqual(theme)
  })
})
