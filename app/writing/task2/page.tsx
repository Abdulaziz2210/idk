"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

// Task 2 writing topics
const writingTask2Topics = [
  "Some people believe that universities should focus on providing academic skills rather than preparing students for employment. To what extent do you agree or disagree?",
  "In many countries, the proportion of older people is steadily increasing. Does this trend have more positive or negative effects on society?",
  "Some people think that parents should teach children how to be good members of society. Others, however, believe that school is the place to learn this. Discuss both these views and give your own opinion.",
  "The restoration of old buildings in major cities around the world costs numerous governments millions. Some people think that this money should be used to build new housing. To what extent do you agree or disagree?",
  "Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology. Discuss both these views and give your own opinion.",
  "In some countries, many young people choose to work or travel for a year between finishing high school and starting university studies. Discuss the advantages and disadvantages of this.",
]

export default function WritingTest() {
  const { t } = useLanguage()
  const router = useRouter()
  const [task1Essay, setTask1Essay] = useState("")
  const [task2Essay, setTask2Essay] = useState("")
  const [task1WordCount, setTask1WordCount] = useState(0)
  const [task2WordCount, setTask2WordCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1 * 60) // 60 minutes in seconds
  const [selectedTopic, setSelectedTopic] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshPenalties, setRefreshPenalties] = useState<number>(0)

  // Always use the same chart image (chart1.png)
  const fixedChartImage = {
    id: 1,
    url: "/images/task1/chart1.png",
    description:
      "Internet Access by Household (2000-2020) - The chart below shows the percentage of households with access to the internet in three different countries between 2000 and 2020.",
  }

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
      return
    }

    // Apply refresh penalty for writing test
    const savedTime = sessionStorage.getItem("writingTimeLeft")
    const lastSaveTime = sessionStorage.getItem("writingLastSaveTime")
    const refreshCount = Number.parseInt(sessionStorage.getItem("writingRefreshCount") || "0") + 1

    setRefreshPenalties(refreshCount)
    sessionStorage.setItem("writingRefreshCount", refreshCount.toString())

    // Load saved essays from sessionStorage if exists
    const savedTask1Essay = sessionStorage.getItem("writingTask1Essay")
    const savedTask2Essay = sessionStorage.getItem("writingTask2Essay")

    if (savedTask1Essay) {
      setTask1Essay(savedTask1Essay)
      setTask1WordCount(countWords(savedTask1Essay))
    }

    if (savedTask2Essay) {
      setTask2Essay(savedTask2Essay)
      setTask2WordCount(countWords(savedTask2Essay))
    }

    // Load saved time and apply penalty
    if (savedTime && lastSaveTime) {
      const timePassed = Math.floor((Date.now() - Number.parseInt(lastSaveTime)) / 1000)
      const penaltyTime = refreshCount * 3
      const adjustedTime = Math.max(0, Number.parseInt(savedTime) - timePassed - penaltyTime)
      setTimeLeft(adjustedTime)

      if (refreshCount > 0) {
        alert(
          `Warning: ${penaltyTime} seconds deducted due to ${refreshCount} page refresh(es). Each refresh costs 3 seconds.`,
        )
      }
    }

    // Load or set random topic (but keep chart fixed)
    const savedTopic = sessionStorage.getItem("selectedTopic")

    if (savedTopic) {
      setSelectedTopic(Number.parseInt(savedTopic))
    } else {
      const randomTopic = Math.floor(Math.random() * writingTask2Topics.length)
      setSelectedTopic(randomTopic)
      sessionStorage.setItem("selectedTopic", randomTopic.toString())
    }

    setIsLoading(false)

    // Set up timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1
        sessionStorage.setItem("writingTimeLeft", newTime.toString())
        sessionStorage.setItem("writingLastSaveTime", Date.now().toString())
        if (newTime <= 0) {
          clearInterval(timer)
          handleAutoSubmit()
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  const handleTask1Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEssay = e.target.value
    setTask1Essay(newEssay)
    setTask1WordCount(countWords(newEssay))
    sessionStorage.setItem("writingTask1Essay", newEssay)
  }

  const handleTask2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEssay = e.target.value
    setTask2Essay(newEssay)
    setTask2WordCount(countWords(newEssay))
    sessionStorage.setItem("writingTask2Essay", newEssay)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAutoSubmit = () => {
    // Save final essays
    sessionStorage.setItem("writingTask1Essay", task1Essay)
    sessionStorage.setItem("writingTask2Essay", task2Essay)
    sessionStorage.setItem("writingTask1Words", task1WordCount.toString())
    sessionStorage.setItem("writingTask2Words", task2WordCount.toString())

    // Clear timer
    sessionStorage.removeItem("writingTimeLeft")

    // Navigate to test complete page
    router.push("/test-complete")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4 px-4 pt-4">
        <div className="text-lg font-bold">FULL MOCK EXAM</div>
        <div className="text-lg font-bold">
          Time: {formatTime(timeLeft)}
          {refreshPenalties > 0 && (
            <span className="text-red-500 text-sm block">
              (-{refreshPenalties * 3}s penalty for {refreshPenalties} refresh{refreshPenalties > 1 ? "es" : ""})
            </span>
          )}
        </div>
        <div className="text-lg font-bold">Ƭᴏᴘ ꜱᴘᴇᴇᴅ 亗 LANGUAGE SCHOOL</div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Writing Task 1 - Left Side */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Writing Task 1</CardTitle>
              <p className="text-sm text-gray-600">
                You should spend about 20 minutes on this task. Write at least 150 words.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Task Instructions</h3>
                  <p className="text-sm mb-4">
                    Summarize the information by selecting and reporting the main features, and make comparisons where
                    relevant.
                  </p>

                  <div className="mb-4">
                    <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                      <Image
                        src={fixedChartImage.url || "/placeholder.svg"}
                        alt={fixedChartImage.description}
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{fixedChartImage.description}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Your Response</h3>
                    <span className={`text-sm ${task1WordCount < 150 ? "text-red-500" : "text-green-500"}`}>
                      {task1WordCount} words {task1WordCount < 150 ? "(min 150)" : ""}
                    </span>
                  </div>
                  <Textarea
                    value={task1Essay}
                    onChange={handleTask1Change}
                    placeholder="Write your response here..."
                    className="min-h-[300px] resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Writing Task 2 - Right Side */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Writing Task 2</CardTitle>
              <p className="text-sm text-gray-600">
                You should spend about 40 minutes on this task. Write at least 250 words.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Essay Topic</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
                    <p className="text-base">{writingTask2Topics[selectedTopic]}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Give reasons for your answer and include any relevant examples from your own knowledge or
                    experience.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Your Response</h3>
                    <span className={`text-sm ${task2WordCount < 250 ? "text-red-500" : "text-green-500"}`}>
                      {task2WordCount} words {task2WordCount < 250 ? "(min 250)" : ""}
                    </span>
                  </div>
                  <Textarea
                    value={task2Essay}
                    onChange={handleTask2Change}
                    placeholder="Write your essay here..."
                    className="min-h-[400px] resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}