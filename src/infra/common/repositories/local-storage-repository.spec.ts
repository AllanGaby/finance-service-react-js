import { LocalStorageRepository } from './local-storage-repository'
import { SaveLocalStorageDTO } from '@/data/common/repositories'
import { throwError } from '@/data/common/helpers'
import 'jest-localstorage-mock'
import faker from 'faker'

type sutTypes = {
  sut: LocalStorageRepository
}

const makeSut = (): sutTypes => {
  return {
    sut: new LocalStorageRepository()
  }
}

const mockSaveLocalStorageDTO = (): SaveLocalStorageDTO<object> => ({
  key: faker.random.uuid(),
  record: faker.random.objectElement<object>()
})

describe('LocalStorageRepository', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Save', () => {
    test('Should call setItem with correct value', async () => {
      const { sut } = makeSut()
      const saveLocalStorageDTO = mockSaveLocalStorageDTO()
      await sut.save(saveLocalStorageDTO)
      expect(localStorage.setItem).toHaveBeenCalledWith(saveLocalStorageDTO.key, JSON.stringify(saveLocalStorageDTO.record))
    })

    test('Should call removeItem if value is undefined', async () => {
      const { sut } = makeSut()
      const saveLocalStorageDTO = mockSaveLocalStorageDTO()
      saveLocalStorageDTO.record = undefined
      await sut.save(saveLocalStorageDTO)
      expect(localStorage.removeItem).toHaveBeenCalledWith(saveLocalStorageDTO.key)
    })

    test('Should return a exception if setItem throws a exception', async () => {
      const { sut } = makeSut()
      jest.spyOn(localStorage, 'setItem').mockImplementationOnce(throwError)
      const promise = sut.save(mockSaveLocalStorageDTO())
      await expect(promise).rejects.toThrow()
    })

    test('Should return new record if setItem is succeeds', async () => {
      const { sut } = makeSut()
      const saveLocalStorageDTO = mockSaveLocalStorageDTO()
      const record = await sut.save(saveLocalStorageDTO)
      expect(record).toEqual(saveLocalStorageDTO.record)
    })
  })

  describe('Recover', () => {
    test('Should call getItem with correct value', async () => {
      const { sut } = makeSut()
      const key = faker.random.uuid()
      await sut.recover(key)
      expect(localStorage.getItem).toHaveBeenCalledWith(key)
    })

    test('Should return undefined if key is not found', async () => {
      const { sut } = makeSut()
      const result = await sut.recover(faker.random.uuid())
      expect(result).toBeFalsy()
    })

    test('Should return same value that getItem returns', async () => {
      const { sut } = makeSut()
      const valor = faker.random.objectElement<object>()
      jest.spyOn(localStorage, 'getItem').mockImplementationOnce((key: string) => { return JSON.stringify(valor) })
      const result = await sut.recover(faker.random.uuid())
      expect(result).toEqual(valor)
    })
  })
})
