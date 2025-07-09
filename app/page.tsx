"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Speedometer } from "@/components/speedometer"
import { RacingCar } from "@/components/racing-car"
import { motion } from "framer-motion"
import {
  Headphones,
  BookOpen,
  PenTool,
  MessageSquare,
  Trophy,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Gauge,
  Car,
  Flag,
  Timer,
} from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [speedValue, setSpeedValue] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setSpeedValue(8.5)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const racingFeatures = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Listening",
      description: "Practice with authentic IELTS listening materials and improve your comprehension skills",
      color: "bg-red-600",
      speed: "",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Reading",
      description: "Master academic and general reading passages with our comprehensive test modules",
      color: "bg-black",
      speed: "",
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Writing",
      description: "Develop your writing skills with Task 1 and Task 2 practice sessions",
      color: "bg-red-700",
      speed: "",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Speaking",
      description: "Master your speaking skills and prepare for the speaking test with interactive practice sessions",
      color: "bg-gray-900",
      speed: "",
    },
  ]

  const raceStats = [
    { icon: <Users className="w-6 h-6" />, value: "10,000+", label: "Speed Racers", unit: "drivers" },
    { icon: <Trophy className="w-6 h-6" />, value: "95%", label: "Victory Rate", unit: "wins" },
    { icon: <Timer className="w-6 h-6" />, value: "24/7", label: "Pit Stop", unit: "support" },
    { icon: <Star className="w-6 h-6" />, value: "9.5/10", label: "Performance", unit: "rating" },
  ]

  const racingBenefits = [
    "Formula 1 level test environment",
    "Instant lap time feedback",
    "Professional racing analytics",
    "Real-time performance tracking",
    "Championship-grade content",
    "Mobile racing dashboard",
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Racing Grid Background */}
      <div className="fixed inset-0 racing-grid opacity-10 pointer-events-none" />

      {/* Speed Lines Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-20 bg-red-500"
            style={{
              top: `${20 + i * 15}%`,
              left: "-100px",
            }}
            animate={{
              x: [0, innerWidth + 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/90 backdrop-blur-md border-b border-red-600/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center neon-border">
              <Gauge className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold neon-red">Ƭᴏᴘ ꜱᴘᴇᴇᴅ 亗</h1>
              <p className="text-xs text-red-400">CDI Racing</p>
            </div>
          </motion.div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 pulse-red"
            >
              <Car className="w-4 h-4 mr-2" />
              Start the Test
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-black/50" />

        {/* Racing Car Animation */}
        <div className="absolute top-20 w-full">
          <RacingCar />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600 rounded-full px-4 py-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Flag className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-semibold">Championship IELTS Training</span>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Race to</span>
                  <br />
                  <span className="neon-red">IELTS</span>
                  <br />
                  <span className="text-red-500">Victory</span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  Accelerate your IELTS preparation with our high-performance training platform. Reach your target band
                  score at maximum velocity!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={() => router.push("/login")}
                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-lg px-8 py-6 engine-rev"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Start Your Engine
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => router.push("/register")}
                    className="text-lg px-8 py-6 border-2 border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    Join the Race
                  </Button>
                </motion.div>
              </div>

              {/* Racing Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {raceStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-center mb-2 text-red-500">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                {/* Main Speedometer */}
                <div className="flex justify-center mb-8">
                  <Speedometer value={speedValue} maxValue={9} label="IELTS Band" />
                </div>

                {/* Racing Dashboard */}
                <div className="bg-black/80 border border-red-600/30 rounded-3xl p-8 neon-border">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">Racing Dashboard</h3>
                      <Badge className="bg-red-600 text-white animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        LIVE
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {racingFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-4 p-3 rounded-lg bg-gray-900/50 border border-red-600/20"
                          whileHover={{ scale: 1.02, borderColor: "rgba(239, 68, 68, 0.5)" }}
                        >
                          <div
                            className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-white`}
                          >
                            {feature.icon}
                          </div>
                    <div className="flex-1">
                            <div className="font-medium text-white">{feature.title}</div>
                            <div className="text-sm text-gray-400"> {feature.speed}</div>
                          </div>
                          <div className="text-red-500 font-bold">GO!</div>
                        </motion.div>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
                      <Flag className="w-4 h-4 mr-2" />
                      Begin Championship
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Racing Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              High-Performance <span className="neon-red">IELTS</span> Training
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience championship-level IELTS preparation with our turbo-charged training modules
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {racingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Card className="group bg-black/50 border-red-600/30 hover:border-red-600 transition-all duration-300 neon-border">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Racing Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose <span className="neon-red">Ƭᴏᴘ ꜱᴘᴇᴇᴅ 亗</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our racing-inspired platform delivers championship results with cutting-edge technology and
                professional-grade training methods.
              </p>
              <div className="grid gap-4">
                {racingBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <span className="text-gray-300 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-black/80 border border-red-600/30 rounded-3xl shadow-2xl p-8 neon-border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Performance Dashboard</h3>
                    <Target className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { skill: "Listening", score: 8.5, color: "bg-red-600" },
                      { skill: "Reading", score: 7.5, color: "bg-red-700" },
                      { skill: "Writing", score: 7.0, color: "bg-red-800" },
                      { skill: "Speaking", score: 8.0, color: "bg-red-900" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-300">{item.skill}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-2 ${item.color} rounded-full`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(item.score / 9) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                          <span className="text-sm font-bold text-red-500">{item.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-red-600/30">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Championship Score</span>
                      <span className="text-3xl font-bold neon-red">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 checkered-flag opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Cross the Finish Line?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join thousands of racing champions who have achieved their IELTS dreams with Ƭᴏᴘ ꜱᴘᴇᴇᴅ 亗
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => router.push("/login")}
                  className="bg-black text-white hover:bg-gray-900 text-lg px-8 py-6"
                >
                  <Flag className="w-5 h-5 mr-2" />
                  Start Racing Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push("/register")}
                  className="border-2 border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 text-lg px-8 py-6"
                >
                  Join Championship
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-600/30 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Gauge className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold neon-red">Ƭᴏᴘ ꜱᴘᴇᴇᴅ 亗</h3>
                  <p className="text-sm text-red-400">IELTS Racing Academy</p>
                </div>
              </div>
              <p className="text-gray-400">
                Your high-performance partner for IELTS championship success with turbo-charged preparation tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-red-400">Quick Access</h4>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/login")}
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  Racing Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  Join Championship
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-red-400">Training Modules</h4>
              <div className="space-y-2 text-gray-400">
                <p>Listening</p>
                <p>Reading</p>
                <p>Writing</p>
                <p>Speaking</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-red-400">Pit Stop</h4>
              <div className="space-y-2 text-gray-400">
                <p>Telegram: @T0pSpeed524kmh</p>
                <p>24/7 Racing Support</p>
              </div>
            </div>
          </div>
          <div className="border-t border-red-600/30 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Ƭᴏᴘ ꜱᴘᴇᴇᴅ 亗. All rights reserved. Race to Victory!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}