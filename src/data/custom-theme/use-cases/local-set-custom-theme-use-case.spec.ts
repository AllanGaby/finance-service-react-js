import { LocalSetCustomThemeUseCase } from './local-set-custom-theme-use-case'
import { mockThemeModel, SaveCustomThemeRepositorySpy } from '@/data/custom-theme/mocks'
import { throwError } from '@/data/common/helpers'

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
  test('Should call SaveCustomThemeRepository with correct value', async () => {
    const { sut, saveCustomThemeRepositorySpy } = makeSut()
    const theme = mockThemeModel()
    await sut.setTheme(theme)
    expect(saveCustomThemeRepositorySpy.param).toEqual(theme)
  })

  test('Should return a exception if SaveCustomThemeRepository throws a exception', async () => {
    const { sut, saveCustomThemeRepositorySpy } = makeSut()
    jest.spyOn(saveCustomThemeRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.setTheme(mockThemeModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return same theme provide if SaveCustomThemeRepository succeeds', async () => {
    const { sut, saveCustomThemeRepositorySpy } = makeSut()
    const thema = await sut.setTheme(mockThemeModel())
    expect(thema).toEqual(saveCustomThemeRepositorySpy.result)
  })
})
