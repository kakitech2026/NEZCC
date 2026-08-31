'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type PublicSiteSettings = {
  facebookURL?: string | null
  instagramURL?: string | null
  xURL?: string | null
  youtubeURL?: string | null
}

const SiteSettingsContext = createContext<PublicSiteSettings>({})

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PublicSiteSettings>({})

  useEffect(() => {
    const controller = new AbortController()

    async function loadSettings() {
      try {
        const response = await fetch('/api/globals/site-settings', {
          cache: 'no-store',
          signal: controller.signal,
        })

        if (response.ok) {
          setSettings(await response.json())
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Unable to load public site settings', error)
        }
      }
    }

    void loadSettings()
    return () => controller.abort()
  }, [])

  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}

export function getSafeExternalURL(value?: string | null) {
  if (!value) return undefined

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}
