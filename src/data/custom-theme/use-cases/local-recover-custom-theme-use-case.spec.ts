import { LocalRecoverCustomThemeUseCase } from './local-recover-custom-theme-use-case'
import { RecoverCustomThemeRepositoryStub } from '@/data/custom-theme/mocks'
import { throwError } from '@/data/common/helpers'
import { ThemeModel } from '@/domain/custom-theme'
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
  test('Should call RecoverCustomThemeRepository with correct value', async () => {
    const { sut, recoverCustomThemeRepositoryStub } = makeSut()
    const getThemeSpyon = jest.spyOn(recoverCustomThemeRepositoryStub, 'get')
    await sut.getTheme()
    expect(getThemeSpyon).toHaveBeenCalled()
  })

  test('Should return a exception if SaveCustomThemeRepository throws a exception', async () => {
    const { sut, recoverCustomThemeRepositoryStub } = makeSut()
    jest.spyOn(recoverCustomThemeRepositoryStub, 'get').mockImplementationOnce(throwError)
    const promise = sut.getTheme()
    await expect(promise).rejects.toThrow()
  })

  test('Should return defaultTheme if theme if not found', async () => {
    const { sut, recoverCustomThemeRepositoryStub, defaultTheme } = makeSut()
    recoverCustomThemeRepositoryStub.result = undefined
    const thema = await sut.getTheme()
    expect(thema).toEqual(defaultTheme)
  })

  test('Should return same theme that RecoverCustomThemeRepository returns', async () => {
    const { sut, recoverCustomThemeRepositoryStub } = makeSut()
    const thema = await sut.getTheme()
    expect(thema).toEqual(recoverCustomThemeRepositoryStub.result)
  })
})
