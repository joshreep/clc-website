import { initializeApp } from 'firebase-admin'
import { https } from 'firebase-functions'
import next from 'next'
import config from './next.config'

initializeApp()

const dev = process.env.NODE_ENV !== 'production'

const app = next({
    dev,
    conf: config,
})

const handle = app.getRequestHandler()

const server = https.onRequest(async (request, response) => {
    console.log(`File: ${request.originalUrl}`)
    await app.prepare()
    handle(request, response)
})

export const nextjs = { server }
