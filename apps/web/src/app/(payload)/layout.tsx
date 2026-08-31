/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from '@payload-config'
import '@payloadcms/next/css'
import './admin.scss'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'

export const metadata = {
  title: 'Payload',
}

const serverFunction = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>{children}</RootLayout>
)

export default Layout
