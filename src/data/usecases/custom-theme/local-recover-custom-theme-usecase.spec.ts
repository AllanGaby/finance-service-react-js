import { LocalRecoverCustomThemeUseCase } from './local-recover-custom-theme-usecase'
import { RecoverCustomThemeRepositoryStub } from '@/data/tests/custom-theme'
import { throwError } from '@/data/tests/test-helper'
import { ThemeModel } from '@/domain/models/custom-theme'
import faker from 'faker'

type sutTypes = {
  sut: LocalRecoverCustomThemeUseCase
  recoverCustomThemeRepositoryStub: RecoverCustomThemeRepositoryStub
  defaultTheme: ThemeModel
}

const makeSut = (): sutTypes => {
  const recoverCustomThemeRepositoryStub = new RecoverCustomThemeRepositoryStub()
  const defaultTheme = faker.random.arrayElement([ThemeModel.dark, ThemeModel.light])
  const sut = new LocalRecoverCustomThemeUseCase(recoverCustomThemeRepositoryStub, defaultTheme)
  return {
    sut,
    recoverCustomThemeRepositoryStub,
    defaultTheme
  }
}

describe('LocalRecoverCustomThemeUseCase', () => {
  test('Deve chamar o repositório', async () => {
    const { sut, recoverCustomThemeRepositoryStub } = makeSut()
    const getThemeSpyon = jest.spyOn(recoverCustomThemeRepositoryStub, 'get')
    await sut.getTheme()
    expect(getThemeSpyon).toHaveBeenCalled()
  })

  test('Deve retornar um Error se o repositório estourar uma exceção', async () => {
    const { sut, recoverCustomThemeRepositoryStub } = makeSut()
    jest.spyOn(recoverCustomThemeRepositoryStub, 'get').mockImplementationOnce(throwError)
    const promise = sut.getTheme()
    await expect(promise).rejects.toThrow()
  })

  test('Deve retornar o defaultTheme se o repositório não encontrar um thema', async () => {
    const { sut, recoverCustomThemeRepositoryStub, defaultTheme } = makeSut()
    recoverCustomThemeRepositoryStub.result = undefined
    const thema = await sut.getTheme()
    expect(thema).toEqual(defaultTheme)
  })

  test('Deve retornar um thema se o repositório encontrar um thema', async () => {
    const { sut, recoverCustomThemeRepositoryStub } = makeSut()
    const thema = await sut.getTheme()
    expect(thema).toEqual(recoverCustomThemeRepositoryStub.result)
  })
})
