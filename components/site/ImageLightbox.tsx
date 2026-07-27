"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const MIN_SCALE = 1
const MAX_SCALE = 5
const DOUBLE_TAP_SCALE = 2.5

type Point = { x: number; y: number }

type ImageLightboxProps = {
  src: string
  alt: string
  open: boolean
  onClose: () => void
}

/**
 * Fullscreen image viewer with zoom & pan.
 * Desktop: wheel to zoom, drag to pan, double-click to toggle zoom.
 * Mobile: pinch to zoom, one-finger pan, double-tap to toggle zoom.
 */
export function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })

  // Latest transform accessible from native (non-React) listeners
  const transform = useRef({ scale: 1, offset: { x: 0, y: 0 } })
  transform.current = { scale, offset }

  const pointers = useRef(new Map<number, Point>())
  const gesture = useRef<{
    startScale: number
    startOffset: Point
    startMid: Point
    startDist: number
  } | null>(null)
  // Distinguishes a plain click/tap (toggle zoom) from a drag or pinch
  const tap = useRef({ downPos: { x: 0, y: 0 }, moved: false, multi: false })

  const clampOffset = useCallback((next: Point, nextScale: number): Point => {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return next
    const maxX = ((nextScale - 1) * rect.width) / 2
    const maxY = ((nextScale - 1) * rect.height) / 2
    return {
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    }
  }, [])

  /** Zooms to `nextScale` keeping the viewport point `focal` visually fixed. */
  const zoomTo = useCallback(
    (nextScale: number, focal?: Point) => {
      const rect = stageRef.current?.getBoundingClientRect()
      if (!rect) return
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale))
      if (clamped === 1) {
        setScale(1)
        setOffset({ x: 0, y: 0 })
        return
      }
      const { scale: s, offset: o } = transform.current
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const fx = focal?.x ?? cx
      const fy = focal?.y ?? cy
      const px = (fx - cx - o.x) / s
      const py = (fy - cy - o.y) / s
      setScale(clamped)
      setOffset(clampOffset({ x: fx - cx - px * clamped, y: fy - cy - py * clamped }, clamped))
    },
    [clampOffset]
  )

  /** (Re)captures gesture baseline from the currently active pointers. */
  const rebaseGesture = useCallback(() => {
    const pts = [...pointers.current.values()]
    const { scale: s, offset: o } = transform.current
    if (pts.length === 1) {
      gesture.current = { startScale: s, startOffset: o, startMid: pts[0], startDist: 0 }
    } else if (pts.length >= 2) {
      gesture.current = {
        startScale: s,
        startOffset: o,
        startMid: { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 },
        startDist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
      }
    } else {
      gesture.current = null
    }
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    stageRef.current?.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 1) {
      tap.current = { downPos: { x: e.clientX, y: e.clientY }, moved: false, multi: false }
    } else {
      tap.current.multi = true
    }
    rebaseGesture()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (
      Math.hypot(e.clientX - tap.current.downPos.x, e.clientY - tap.current.downPos.y) > 8
    ) {
      tap.current.moved = true
    }
    const g = gesture.current
    const rect = stageRef.current?.getBoundingClientRect()
    if (!g || !rect) return

    const pts = [...pointers.current.values()]
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    if (pts.length >= 2 && g.startDist > 0) {
      // Pinch: scale around the moving midpoint (handles pan + zoom together)
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 }
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, (g.startScale * dist) / g.startDist))
      const px = (g.startMid.x - cx - g.startOffset.x) / g.startScale
      const py = (g.startMid.y - cy - g.startOffset.y) / g.startScale
      setScale(nextScale)
      setOffset(
        nextScale === 1
          ? { x: 0, y: 0 }
          : clampOffset({ x: mid.x - cx - px * nextScale, y: mid.y - cy - py * nextScale }, nextScale)
      )
    } else if (pts.length === 1 && transform.current.scale > 1) {
      // One-finger / mouse drag pan
      setOffset(
        clampOffset(
          {
            x: g.startOffset.x + pts[0].x - g.startMid.x,
            y: g.startOffset.y + pts[0].y - g.startMid.y,
          },
          transform.current.scale
        )
      )
    }
  }

  const handlePointerEnd = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    rebaseGesture()
  }

  /** Plain click/tap (no drag, no pinch) toggles zoom at the pointer position. */
  const handleClick = (e: React.MouseEvent) => {
    if (tap.current.moved || tap.current.multi) return
    zoomTo(transform.current.scale > 1 ? 1 : DOUBLE_TAP_SCALE, { x: e.clientX, y: e.clientY })
  }

  // Wheel zoom needs a native non-passive listener to preventDefault reliably
  useEffect(() => {
    if (!open) return
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      zoomTo(transform.current.scale * Math.exp(-e.deltaY * 0.0022), {
        x: e.clientX,
        y: e.clientY,
      })
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [open, zoomTo])

  // Escape to close + body scroll lock + reset transform on open
  useEffect(() => {
    if (!open) return
    setScale(1)
    setOffset({ x: 0, y: 0 })
    pointers.current.clear()
    gesture.current = null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen ampliada: ${alt}`}
      className="fixed inset-0 z-[110] flex flex-col bg-black/95 backdrop-blur-sm"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar imagen"
        className="absolute top-4 right-4 z-[3] flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:top-6 md:right-6"
      >
        <span className="material-symbols-outlined text-[24px]">close</span>
      </button>

      {/* Stage */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClick={handleClick}
        className="relative flex-1 touch-none overscroll-contain select-none"
        style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
      >
        <div
          className="absolute inset-4 md:inset-10"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transition: pointers.current.size > 0 ? "none" : "transform 180ms ease-out",
            willChange: "transform",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            draggable={false}
            className="pointer-events-none object-contain"
          />
        </div>
      </div>

      {/* Zoom controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-[3] flex justify-center md:bottom-8">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/10 p-1.5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => zoomTo(transform.current.scale / 1.5)}
            aria-label="Alejar"
            disabled={scale <= MIN_SCALE}
            className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[22px]">zoom_out</span>
          </button>
          <span className="min-w-[52px] text-center text-xs font-medium tabular-nums text-white/80">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => zoomTo(transform.current.scale * 1.5)}
            aria-label="Acercar"
            disabled={scale >= MAX_SCALE}
            className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[22px]">zoom_in</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
