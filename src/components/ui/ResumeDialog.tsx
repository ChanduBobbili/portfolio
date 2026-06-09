'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download } from 'lucide-react'

interface ResumeDialogProps {
  open: boolean
  onClose: () => void
  onMinimize: () => void
}

export function ResumeDialog({ open, onClose, onMinimize }: ResumeDialogProps) {
  // Close on Escape (same as red dot)
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — no click-to-close */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1] }}
            className="
              fixed inset-4 sm:inset-8 lg:inset-16 z-[101]
              flex flex-col
              bg-[var(--bg-surface)] border border-[var(--border-default)]
              rounded-2xl shadow-2xl overflow-hidden
            "
            style={{ boxShadow: 'var(--glow-purple), 0 25px 50px rgba(0,0,0,0.5)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-default)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={onClose}
                    title="Close"
                    aria-label="Close"
                    className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 transition-all cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={onMinimize}
                    title="Minimize"
                    aria-label="Minimize"
                    className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-90 transition-all cursor-pointer"
                  />
                </div>
                <span className="text-sm font-mono text-[var(--text-secondary)]">
                  Chandu_Bobbili_Resume.pdf
                </span>
              </div>
              <a
                href="/Chandu_Bobbili_Resume.pdf"
                download="Chandu_Bobbili_Resume.pdf"
                className="
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                  border border-[var(--border-default)]
                  text-[var(--text-secondary)]
                  hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)]
                  transition-all duration-200
                "
              >
                <Download size={13} />
                Download
              </a>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-[var(--bg-subtle)] overflow-hidden">
              <iframe
                src="/Chandu_Bobbili_Resume.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                className="w-full h-full"
                title="Chandu Bobbili Resume"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
