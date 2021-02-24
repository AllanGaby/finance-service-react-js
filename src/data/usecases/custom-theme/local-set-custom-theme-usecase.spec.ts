import { LocalSetCustomThemeUseCase } from './local-set-custom-theme-usecase'
import { mockThemeModel, SaveCustomThemeRepositorySpy } from '@/data/tests/custom-theme'
import { throwError } from '@/data/tests/test-helper'

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

  test('Deve retornar um Error se o repositório estourar uma exceção', async () => {
    const { sut, saveCustomThemeRepositorySpy } = makeSut()
    jest.spyOn(saveCustomThemeRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.setTheme(mockThemeModel())
    await expect(promise).rejects.toThrow()
  })

  test('Deve retornar o thema salvo se o repositório salvar o thema com sucesso', async () => {
    const { sut, saveCustomThemeRepositorySpy } = makeSut()
    const thema = await sut.setTheme(mockThemeModel())
    expect(thema).toEqual(saveCustomThemeRepositorySpy.result)
  })
})
