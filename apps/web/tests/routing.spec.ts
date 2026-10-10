import { expect, test } from '@playwright/test'
import { NextRequest } from 'next/server.js'
import { proxy as publicProxy } from '../src/proxy'
import { proxy as adminProxy } from '../../admin/src/proxy'
import { isPublicRESTRequest, normalizePublicPath } from '../src/lib/public-routes'

test('public boundaries cannot be bypassed with admin host headers', () => {
  for (const path of ['/admin', '/admin/login', '/api/users', '/api/booking-requests', '/api/globals/booking-settings', '/graphql', '/api/graphql', '/%61pi/users']) {
    const response = publicProxy(new NextRequest(`https://nezcc.in${path}`, {
      headers: { host: 'admin.nezcc.in', 'x-forwarded-host': 'admin.nezcc.in' },
    }))
    expect(response.status, path).toBe(404)
  }
})

test('public routes retain forms, settings reads, and media downloads', () => {
  for (const [path, method] of [['/api/contact', 'POST'], ['/api/feedback', 'POST'], ['/api/newsletter', 'POST'], ['/api/bookings', 'POST'], ['/api/globals/site-settings', 'GET'], ['/api/media/file/image%20name.png', 'HEAD']]) {
    expect(publicProxy(new NextRequest(`https://nezcc.in${path}`, { method })).headers.get('x-middleware-next')).toBe('1')
  }
  expect(publicProxy(new NextRequest('https://nezcc.in/api/globals/site-settings', { method: 'PATCH' })).status).toBe(404)
  expect(publicProxy(new NextRequest('https://nezcc.in/api/media/file/image.png', { method: 'DELETE' })).status).toBe(404)
})

test('REST dispatch applies the same boundary even without the proxy', () => {
  expect(isPublicRESTRequest(new Request('https://nezcc.in/api/users'))).toBe(false)
  expect(isPublicRESTRequest(new Request('https://nezcc.in/api/contact', { method: 'POST' }))).toBe(false)
  expect(isPublicRESTRequest(new Request('https://nezcc.in/api/globals/site-settings/'))).toBe(true)
  expect(isPublicRESTRequest(new Request('https://nezcc.in/api/media/file/photo.png'))).toBe(true)
  for (const path of ['/api/media/file/%2fusers', '/api/media/file/%5cusers', '/api/media/file/%00', '/api/%', '/api/media/file/../users']) {
    expect(normalizePublicPath(path), path).toBeUndefined()
  }
})

test('admin routing supports preview hosts, deep links, queries, and server actions', () => {
  const response = adminProxy(new NextRequest('https://preview.vercel.app/collections/news?page=2'))
  expect(response.headers.get('x-middleware-rewrite')).toBe('https://preview.vercel.app/admin/collections/news?page=2')
  const redirect = adminProxy(new NextRequest('https://admin.nezcc.in/admin/login?redirect=%2F'))
  expect(redirect.status).toBe(308)
  expect(redirect.headers.get('location')).toBe('https://admin.nezcc.in/login?redirect=%2F')
  expect(adminProxy(new NextRequest('https://admin.nezcc.in/admin/collections/news', { method: 'POST' })).headers.get('x-middleware-next')).toBe('1')
  expect(adminProxy(new NextRequest('https://admin.nezcc.in/api/users/login', { method: 'POST' })).headers.get('x-middleware-next')).toBe('1')
})
