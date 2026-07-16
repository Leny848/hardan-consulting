'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_CONTENT,
  type Certification,
  type Service,
  type SiteContent,
  type Stat,
} from '@/lib/site-content'

export type { Certification, Service, SiteContent, Stat }
export { DEFAULT_CONTENT }

type StorageMode = 'cloud' | 'local' | 'unknown'
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

type ContentContextValue = {
  content: SiteContent
  hydrated: boolean
  storageMode: StorageMode
  saveStatus: SaveStatus
  saveError: string | null
  update: (patch: Partial<SiteContent>) => void
  reset: () => void
  uploadImage: (file: File) => Promise<string>
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT)
  const [hydrated, setHydrated] = useState(false)
  const [storageMode, setStorageMode] = useState<StorageMode>('unknown')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveError, setSaveError] = useState<string | null>(null)

  const contentRef = useRef(content)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  /** Password used to authenticate API writes (only updates after successful cloud save). */
  const authPasswordRef = useRef(DEFAULT_CONTENT.adminPassword)

  useEffect(() => {
    contentRef.current = content
  }, [content])

  const saveToCloud = useCallback(async (next: SiteContent) => {
    setSaveStatus('saving')
    setSaveError(null)
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': authPasswordRef.current,
        },
        body: JSON.stringify(next),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Could not save to cloud')
      }
      setStorageMode('cloud')
      setSaveStatus('saved')
      authPasswordRef.current = next.adminPassword
      setTimeout(() => setSaveStatus((s) => (s === 'saved' ? 'idle' : s)), 2000)
    } catch (err) {
      setSaveStatus('error')
      setSaveError(err instanceof Error ? err.message : 'Save failed')
    }
  }, [])

  const scheduleSave = useCallback(
    (next: SiteContent) => {
      if (storageMode !== 'cloud') return
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => {
        void saveToCloud(next)
      }, 600)
    },
    [saveToCloud, storageMode],
  )

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/content', { cache: 'no-store' })
        const data = await res.json()
        if (cancelled) return

        if (data.content) {
          const loaded = data.content as SiteContent
          setContent(loaded)
          authPasswordRef.current = loaded.adminPassword || DEFAULT_CONTENT.adminPassword
        }
        setStorageMode(data.mode === 'cloud' ? 'cloud' : 'local')
      } catch {
        if (!cancelled) setStorageMode('local')
      } finally {
        if (!cancelled) setHydrated(true)
      }
    }

    void load()
    return () => {
      cancelled = true
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [])

  const update = useCallback(
    (patch: Partial<SiteContent>) => {
      setContent((prev) => {
        const next = { ...prev, ...patch }
        contentRef.current = next
        scheduleSave(next)
        return next
      })
    },
    [scheduleSave],
  )

  const reset = useCallback(() => {
    setContent(DEFAULT_CONTENT)
    contentRef.current = DEFAULT_CONTENT
    scheduleSave(DEFAULT_CONTENT)
  }, [scheduleSave])

  const uploadImage = useCallback(async (file: File) => {
    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'x-admin-password': authPasswordRef.current,
      },
      body: form,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data.error || 'Upload failed')
    }
    return data.url as string
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content,
        hydrated,
        storageMode,
        saveStatus,
        saveError,
        update,
        reset,
        uploadImage,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within a ContentProvider')
  return ctx
}
