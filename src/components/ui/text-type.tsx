'use client'

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  type ElementType,
  type HTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'

type VariableSpeed = { min: number; max: number }

interface TextTypeProps extends HTMLAttributes<HTMLElement> {
  text: string | string[]
  as?: ElementType
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: string
  cursorClassName?: string
  cursorBlinkDuration?: number
  textColors?: string[]
  variableSpeed?: VariableSpeed
  onSentenceComplete?: (sentence: string, index: number) => void
  startOnVisible?: boolean
  reverseMode?: boolean
}

export function TextType({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const observerRef = useRef<HTMLSpanElement>(null)

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed
    const { min, max } = variableSpeed
    return Math.random() * (max - min) + min
  }, [variableSpeed, typingSpeed])

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'inherit'
    return textColors[currentTextIndex % textColors.length]
  }

  useEffect(() => {
    if (!startOnVisible || !observerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!isVisible) return

    let timeout: ReturnType<typeof setTimeout>
    const currentText = textArray[currentTextIndex]
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false)
          if (currentTextIndex === textArray.length - 1 && !loop) return

          onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex)

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
          setCurrentCharIndex(0)
          timeout = setTimeout(() => {}, pauseDuration)
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1))
          }, deletingSpeed)
        }
      } else if (currentCharIndex < processedText.length) {
        timeout = setTimeout(
          () => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex])
            setCurrentCharIndex((prev) => prev + 1)
          },
          variableSpeed ? getRandomSpeed() : typingSpeed
        )
      } else if (textArray.length >= 1) {
        if (!loop && currentTextIndex === textArray.length - 1) return
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    }

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay)
    } else {
      executeTypingAnimation()
    }

    return () => clearTimeout(timeout)
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed,
  ])

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting)

  const Tag = Component as ElementType
  const content = (
    <>
      <span style={{ color: getCurrentTextColor() || 'inherit' }}>{displayedText}</span>
      {showCursor && (
        <span
          className={cn(
            'ml-1 inline-block animate-[blink-cursor_var(--text-type-cursor-blink)_ease-in-out_infinite]',
            shouldHideCursor && 'hidden',
            cursorClassName
          )}
          aria-hidden="true"
        >
          {cursorCharacter}
        </span>
      )}
    </>
  )

  return (
    <Tag
      className={cn('inline-block whitespace-pre-wrap', className)}
      style={{
        ['--text-type-cursor-blink' as string]: `${cursorBlinkDuration}s`,
      }}
      {...props}
    >
      {startOnVisible ? <span ref={observerRef}>{content}</span> : content}
    </Tag>
  )
}
