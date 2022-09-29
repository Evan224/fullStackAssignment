import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content',async () => {
  const blog={
    title:'test title',
    author:'test author',
    url:'test url',
    likes:0,
  }

  const mockHandler = jest.fn()

  const { container }=render(<Blog blog={blog} />)

  //   screen.debug(container)
  const user = userEvent.setup()
  const div = container.querySelector('.blog')
  const button = screen.getByText('view')
  screen.debug(button)
  await user.click(button)
  expect(div).toHaveTextContent('test title')
  expect(div).toHaveTextContent('test author')
  expect(div).toHaveTextContent('test url')
//   expect(div).not.toHaveTextContent('test url')
})