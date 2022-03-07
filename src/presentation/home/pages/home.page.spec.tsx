import React from 'react'
import { HomePage } from '@/presentation/home/pages'
import { render, act, screen } from '@testing-library/react'

const makeSut = async (): Promise<void> =>
  await act(async () => {
    render(<HomePage/>)
  })

describe('Home Page', () => {
  test('Should render correct title tag', async () => {
    await makeSut()
    expect(screen.getByTestId('home-title').tagName).toBe('H1')
  })

  test('Should render correct title value', async () => {
    await makeSut()
    expect(screen.getByTestId('home-title').textContent).toBe('Home Page')
  })
})
