import { createServer } from 'node:net'

export const availablePort = async (preferred) => {
  for (let port = preferred; port < preferred + 100; port++) {
    const available = await new Promise((resolve, reject) => {
      const server = createServer()
      server.once('error', (error) => error.code === 'EADDRINUSE' ? resolve(false) : reject(error))
      server.listen(port, () => server.close(() => resolve(true)))
    })
    if (available) return port
  }
  throw new Error(`No available port near ${preferred}`)
}
