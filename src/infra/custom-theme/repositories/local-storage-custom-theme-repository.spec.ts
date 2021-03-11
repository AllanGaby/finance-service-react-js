import { LocalStorageCustomThemeRepository } from './local-storage-custom-theme-repository'
import { LocalStorageRepository } from '@/infra/common/repositories'
import { throwError } from '@/data/common/helpers'
import { mockThemeModel } from '@/data/custom-theme/mocks'
import { ThemeModel } from '@/domain/custom-theme'
import 'jest-localstorage-mock'
import faker from 'faker'

type sutTypes = {
  sut: LocalStorageCustomThemeRepository
  themeKey: string
  localStorageRepository: LocalStorageRepository
}

const makeSut = (): sutTypes => {
  const themeKey = faker.random.uuid()
  const localStorageRepository = new LocalStorageRepository()
  const sut = new LocalStorageCustomThemeRepository(themeKey, localStorageRepository, localStorageRepository)
  return {
    sut,
    themeKey,
    localStorageRepository
  }
}

describe('LocalStorageCustomThemeRepository', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Save', () => {
    test('Should call LocalStorageRepository with correct values', async () => {
      const { sut, localStorageRepository, themeKey } = makeSut()
      const saveSpy = jest.spyOn(localStorageRepository, 'save')
      const theme = mockThemeModel()
      await sut.save(theme)
      expect(saveSpy).toHaveBeenCalledWith({
        key: themeKey,
        record: theme
      })
    })

    test('Should return a exception if save throws a exception', async () => {
      const { sut, localStorageRepository } = makeSut()
      jest.spyOn(localStorageRepository, 'save').mockImplementationOnce(throwError)
      const promise = sut.save(mockThemeModel())
      await expect(promise).rejects.toThrow()
    })

    test('Should return same theme if save is succeeds', async () => {
      const { sut } = makeSut()
      const theme = mockThemeModel()
      const result = await sut.save(theme)
      expect(result).toEqual(theme)
    })
  })

  describe('Get', () => {
    test('Should call LocalStorageRepository with correct values', async () => {
      const { sut, localStorageRepository, themeKey } = makeSut()
      const recoverSpy = jest.spyOn(localStorageRepository, 'recover')
      await sut.get()
      expect(recoverSpy).toHaveBeenCalledWith(themeKey)
    })

    test('Should return a exception if get throws a exception', async () => {
      const { sut, localStorageRepository } = makeSut()
      jest.spyOn(localStorageRepository, 'recover').mockImplementationOnce(throwError)
      const promise = sut.get()
      await expect(promise).rejects.toThrow()
    })

    test('Should return undefined if key is not found', async () => {
      const { sut, localStorageRepository } = makeSut()
      jest.spyOn(localStorageRepository, 'recover').mockImplementationOnce((key: string) => { return undefined })
      const result = await sut.get()
      expect(result).toBeFalsy()
    })

    test('Should return undefined if key is not found', async () => {
      const { sut, localStorageRepository } = makeSut()
      const theme = mockThemeModel()
      jest.spyOn(localStorageRepository, 'recover').mockImplementationOnce(async (key: string): Promise<ThemeModel> => { return theme })
      const result = await sut.get()
      expect(result).toEqual(theme)
    })
  })
})
