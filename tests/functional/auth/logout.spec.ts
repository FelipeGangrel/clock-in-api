import { test } from '@japa/runner'

test.group('Auth logout', () => {
  test('returns 401 when user is not logged in', async ({ client }) => {
    const response = await client.get('/auth/logout')

    response.assertStatus(401)
  })

  test('returns 200 when user is logged in', async ({ client }) => {
    const body = {
      email: 'admin@example.com',
      password: '123456',
    }

    const loginResponse = await client.post('/auth/login').json(body)
    const token = (loginResponse.body() as { token: string }).token

    const response = await client.get('/auth/logout').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
  })
})
