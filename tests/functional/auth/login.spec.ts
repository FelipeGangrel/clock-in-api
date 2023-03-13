import { test } from '@japa/runner'

test.group('Auth login', () => {
  test('returns 401 when credentials are invalid', async ({ client }) => {
    const body = {
      email: '',
      password: '',
    }

    const response = await client.post('/auth/login').json(body)

    response.assertStatus(401)
  })

  test('returns 200 when credentials are valid', async ({ client }) => {
    const body = {
      email: 'admin@example.com',
      password: '123456',
    }

    const response = await client.post('/auth/login').json(body)

    response.assertStatus(200)
  })
})
