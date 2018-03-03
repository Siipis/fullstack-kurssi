import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import noteService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      localStorage.clear()
      app = mount(<App />)
    })

    it('only login form is displayed', () => {
      app.update()

      const loginComponent = app.find(LoginForm)
      const blogComponents = app.find(Blog)

      expect(loginComponent.length).toBe(1)
      expect(blogComponents.length).toBe(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }

      localStorage.setItem('loggedUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('blogs are displayed when logged in', () => {
      app.update()

      const loginComponent = app.find(LoginForm)
      const blogComponents = app.find(Blog)

      expect(loginComponent.length).toBe(0)
      expect(blogComponents.length).toBe(3)
    })
  })
})
