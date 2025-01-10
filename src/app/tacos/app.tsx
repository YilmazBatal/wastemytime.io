"use client"

import React, { useEffect, useRef, useState } from 'react'

// Configuration
const config = {
  itemsPerSecond: 5,
  initialSpeed: 1,
  fallAcceleration: 0.1,
  canvasWidth: 800,
  canvasHeight: 600,
  itemSize: 150,
  maxRotationSpeed: 0.05, // radians per frame
}

interface Item {
  x: number
  y: number
  speed: number
  counted: boolean
  rotation: number
  rotationSpeed: number
  xAxisRotation: number
}

export default function FallingTacos() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const itemsRef = useRef<Item[]>([])
  const countRef = useRef(0)
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = '/tacos/taco.png'
    img.onload = () => {
      imageRef.current = img
      setImageLoaded(true)
      console.log('Taco image loaded successfully')
    }
    img.onerror = (e) => {
      console.error('Failed to load taco image:', e)
    }
  }, [])

  useEffect(() => {
    if (!isRunning || !imageLoaded || !imageRef.current) {
      console.log('Game not running or image not loaded:', { isRunning, imageLoaded })
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) {
      console.error('Canvas or context not available')
      return
    }

    console.log('Game loop starting')
    let animationFrameId: number

    const createItem = () => {
      const x = Math.random() * (config.canvasWidth - config.itemSize) + config.itemSize / 2
      const rotationSpeed = (Math.random() * 2 - 1) * config.maxRotationSpeed
      const xAxisRotation = Math.random() < 0.5 ? -1 : 1
      itemsRef.current.push({
        x,
        y: 0,
        speed: config.initialSpeed,
        counted: false,
        rotation: 0,
        rotationSpeed,
        xAxisRotation,
      })
      console.log('Item created, total items:', itemsRef.current.length)
    }

    const updateItems = () => {
      itemsRef.current = itemsRef.current.map(item => ({
        ...item,
        y: Math.min(item.y + item.speed, config.canvasHeight - config.itemSize / 2),
        speed: item.y + config.itemSize / 2 < config.canvasHeight ? item.speed + config.fallAcceleration : 0,
        rotation: item.rotation + item.rotationSpeed,
      }))
    }

    const removeCountedAndOffscreenItems = () => {
      const initialLength = itemsRef.current.length
      itemsRef.current = itemsRef.current.filter(item => 
        !item.counted && item.y <= config.canvasHeight + config.itemSize / 2
      )
      const removedCount = initialLength - itemsRef.current.length
      if (removedCount > 0) {
        console.log('Items removed:', removedCount)
      }
    }

    const checkGroundCollisions = () => {
      let newCount = 0
      itemsRef.current = itemsRef.current.map(item => {
        if (item.y + config.itemSize / 2 >= config.canvasHeight && !item.counted) {
          newCount++
          return { ...item, speed: 0, counted: true }
        }
        return item
      })
      if (newCount > 0) {
        countRef.current += newCount
        setCount(countRef.current)
        console.log('New items counted:', newCount, 'Total count:', countRef.current)
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight)
      itemsRef.current.forEach(item => {
        ctx.save()
        ctx.translate(item.x, item.y)
        ctx.rotate(item.rotation * item.xAxisRotation)
        ctx.drawImage(
          imageRef.current!,
          -config.itemSize / 2,
          -config.itemSize / 2,
          config.itemSize,
          config.itemSize
        )
        ctx.restore()
      })
    }

    const gameLoop = () => {
      updateItems()
      checkGroundCollisions()
      removeCountedAndOffscreenItems()
      draw()
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    const itemInterval = setInterval(createItem, 1000 / config.itemsPerSecond)
    gameLoop()

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(itemInterval)
      console.log('Game loop stopped')
    }
  }, [isRunning, imageLoaded])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Falling Tacos</h1>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => setIsRunning(prev => !prev)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
      <div className="mb-4">
        <span className="text-xl font-semibold">Count: {count}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={config.canvasWidth}
        height={config.canvasHeight}
        className="border border-gray-300"
      />
    </div>
  )
}

