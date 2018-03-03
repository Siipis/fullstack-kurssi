import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  it('header is displayed correctly', () => {
    const blog = {
      title: 'Test blog',
      author: 'Hello World',
      url: 'http://google.com',
      likes: 5
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <Blog
        blog={blog}
        isOwnBlog={false}
        handleUpdate={mockHandler}
        handleDelete={mockHandler}
      />
    )

    const blogHeader = blogComponent.find('.blog__header')
    const blogContent = blogComponent.find('.blog__content')

    expect(blogHeader.length).toBe(1)
    expect(blogHeader.text()).toContain(blog.title)
    expect(blogHeader.text()).toContain(blog.author)

    expect(blogContent.length).toBe(1)
    expect(blogContent.getElement().props.style).toHaveProperty('display', 'none')

    blogHeader.simulate('click')
    const blogContentVisible = blogComponent.find('.blog__content')
    expect(blogContentVisible.getElement().props.style).toHaveProperty('display', '')
  })
})
