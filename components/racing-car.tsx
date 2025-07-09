"use client"
import { motion } from "framer-motion"

export function RacingCar() {
  return (
    <div className="relative w-full h-32 overflow-hidden">
      <motion.div
        className="absolute top-1/2 transform -translate-y-1/2"
        animate={{
          x: [-100, window.innerWidth + 100],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          {/* Car Body */}
          <div className="w-20 h-8 bg-red-600 rounded-lg relative">
            <div className="absolute top-0 left-2 w-12 h-4 bg-red-700 rounded-t-lg"></div>
            <div className="absolute top-1 left-3 w-2 h-2 bg-blue-300 rounded"></div>
            <div className="absolute top-1 right-3 w-2 h-2 bg-blue-300 rounded"></div>
          </div>

          {/* Wheels */}
          <motion.div
            className="absolute -bottom-2 left-1 w-4 h-4 bg-black rounded-full border-2 border-gray-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-2 right-1 w-4 h-4 bg-black rounded-full border-2 border-gray-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Speed lines */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-0.5 bg-red-400 mb-1"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
