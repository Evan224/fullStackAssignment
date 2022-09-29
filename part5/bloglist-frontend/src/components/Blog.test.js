import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'

test('renders content',async () => {
  const blog={
    title:'test title',
    author:'test author',
    url:'test url',
    likes:0,
  }

  const mockHandler = jest.fn()

  const { container }=render(<Blog blog={blog} likehandler={mockHandler}/>)

  //   screen.debug(container)
  const user = userEvent.setup()
  const div = container.querySelector('.blog')
  const button = screen.getByText('view')
  //   screen.debug(button)
  await user.click(button)
  expect(div).toHaveTextContent('test title')
  expect(div).toHaveTextContent('test author')
  expect(div).toHaveTextContent('test url')

  const likeButton=screen.getByText('like')
  //   screen.debug(likeButton)
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
//   expect(div).not.toHaveTextContent('test url')
})

test('add blog content',async () => {
  const newBlog={
    title:'new test title',
    author:'new test author',
    url:'new test url',
  }

  const mockHandler = jest.fn()

  const { container }=render(<NewBlog addCallback={mockHandler} blog={newBlog}/>)


  const user = userEvent.setup()
  const button = screen.getByText('create')

  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  expect(mockHandler.mock.calls[0][0].title).toBe('new test title')
  console.log(mockHandler.mock.calls)
})