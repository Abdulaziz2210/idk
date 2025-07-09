"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SpeedometerProps {
  value: number
  maxValue: number
  label: string
  color?: string
}

export function Speedometer({ value, maxValue, label, color = "#ef4444" }: SpeedometerProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  const percentage = (animatedValue / maxValue) * 100
  const rotation = (percentage / 100) * 180 - 90

  return (
    <div className="relative w-32 h-32">
      {/* Speedometer Background */}
      <div className="absolute inset-0 rounded-full border-4 border-gray-800 bg-black">
        {/* Speed markings */}
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-6 bg-white origin-bottom"
            style={{
              left: "50%",
              bottom: "50%",
              transform: `translateX(-50%) rotate(${-90 + i * 22.5}deg)`,
              transformOrigin: "center 16px",
            }}
          />
        ))}

        {/* Numbers */}
        {[0, 2, 4, 6, 8, 9].map((num, i) => (
          <div
            key={num}
            className="absolute text-white text-xs font-bold"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${-90 + i * 36}deg) translateY(-20px) rotate(${90 - i * 36}deg)`,
            }}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Needle */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-1 h-12 bg-red-500 origin-bottom z-10"
        style={{
          transformOrigin: "center bottom",
        }}
        animate={{
          rotate: rotation,
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      />

      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20" />

      {/* Label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white font-bold text-sm">{label}</div>
        <div className="text-red-500 font-bold text-lg">{animatedValue}</div>
      </div>
    </div>
  )
}
