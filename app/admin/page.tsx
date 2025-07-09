"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart, LineChart, PieChart, Send, Search, Trash2, CheckCircle, XCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
interface TestResult {
  timestamp: string
  student: string
  candidateNumber?: string
  readingAnswers: Record<string, string>
  readingScore: number
  readingTotal: number
  readingPercentage: number
  readingBand: number
  listeningAnswers: Record<string, string>
  listeningScore: number
  listeningTotal: number
  listeningPercentage: number
  listeningBand: number
  writingTask1: string
  writingTask2: string
  writingTask1Words: number
  writingTask2Words: number
  writingBand: number
  overallBand: number
  completed: string
}

// Answer keys for automatic scoring
const readingAnswerKey: Record<string, string> = {
  "1": "TRUE",
  "2": "FALSE",
  "3": "FALSE",
  "4": "TRUE",
  "5": "NOT GIVEN",
  "6": "TRUE",
  "7": "NOT GIVEN",
  "8": "46",
  "9": "HUMAN EYE",
  "10": "INDO - EUROPIAN",
  "11": "RLCHARD BROCKLESBY",
  "12": "ROYAL INSTITUTION",
  "13": "GAS LIGHTING",
  "14": "V",
  "15": "II",
  "16": "IV",
  "17": "I",
  "18": "VIII",
  "19": "III",
  "20": "VI",
  "21": "SEWING MACHINE",
  "22": "DEPARTMENT STORES",
  "23": "PRICES",
  "24": "EUROPE",
  "25": "C/D",
  "26": "C/D",
  "27": "D",
  "28": "L",
  "29": "F",
  "30": "J",
  "31": "I",
  "32": "В",
  "33": "YES",
  "34": "NO",
  "35": "YES",
  "36": "NOT GIVEN",
  "37": "D",
  "38": "A",
  "39": "В",
  "40": "С",
}

const listeningAnswerKey: Record<string, string> = {
  "1": "DATABASE",
  "2": "ROCK",
  "3": "MONTH",
  "4": "45",
  "5": "750",
  "6": "STUDIO",
  "7": "LEGAL",
  "8": "RECORDING",
  "9": "KIPPAX",
  "10": "TALENT",
  "11": "A",
  "12": "B",
  "13": "C",
  "14": "В",
  "15": "G",
  "16": "A",
  "17": "С",
  "18": "H",
  "19": "D",
  "20": "В",
  "21": "A",
  "22": "В",
  "23": "A",
  "24": "A",
  "25": "В",
  "26": "С",
  "27": "D",
  "28": "В",
  "29": "С",
  "30": "А",
  "31": "FLOODING",
  "32": "FIREWOOD",
  "33": "FERTILIZER",
  "34": "TRASH",
  "35": "SAND",
  "36": "GREY",
  "37": "HOTHOUSE",
  "38": "SALTY",
  "39": "RABBIT",
  "40": "STORM",
}


// Helper functions
const normalizeAnswer = (answer: string): string => {
  if (!answer) return ""
  return answer
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/g, "")
}

const isAnswerCorrect = (studentAnswer: string, correctAnswer: string): boolean => {
  if (!studentAnswer || !correctAnswer) return false

  const normalizedStudent = normalizeAnswer(studentAnswer)
  const normalizedCorrect = normalizeAnswer(correctAnswer)

  // Check exact match first
  if (normalizedStudent === normalizedCorrect) return true

  // Check if student answer contains the correct answer (for fill-in-the-blank)
  if (normalizedCorrect.length > 2 && normalizedStudent.includes(normalizedCorrect)) return true

  // Check if correct answer contains student answer (for partial matches)
  if (normalizedStudent.length > 2 && normalizedCorrect.includes(normalizedStudent)) return true

  return false
}

const calculateBandScore = (score: number, total: number): number => {
  if (score === 0) return 0
  const percentage = (score / total) * 100
  if (percentage >= 90) return 9.0
  if (percentage >= 85) return 8.5
  if (percentage >= 80) return 8.0
  if (percentage >= 75) return 7.5
  if (percentage >= 70) return 7.0
  if (percentage >= 65) return 6.5
  if (percentage >= 60) return 6.0
  if (percentage >= 55) return 5.5
  if (percentage >= 50) return 5.0
  if (percentage >= 40) return 4.0
  if (percentage >= 30) return 3.0
  if (percentage >= 20) return 2.0
  return 1.0
}

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [filteredResults, setFilteredResults] = useState<TestResult[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null)
  const [writingBand, setWritingBand] = useState<number>(0)
  const [readingScore, setReadingScore] = useState<number>(0)
  const [listeningScore, setListeningScore] = useState<number>(0)
  const [overallBand, setOverallBand] = useState<number>(0)
  const [telegramMessage, setTelegramMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("")
  const [resultToDelete, setResultToDelete] = useState<TestResult | null>(null)

  useEffect(() => {
    // Check if user is admin
    const username = sessionStorage.getItem("currentUser")
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")

    console.log("Admin check:", { username, isLoggedIn })

    if (username === "superadmin8071" && isLoggedIn === "true") {
      setIsAdmin(true)
      loadTestResults()
    } else {
      console.log("Admin access denied:", { username, isLoggedIn })
      setIsAdmin(false)
    }
  }, [router])

  useEffect(() => {
    // Filter and sort results when search term or sort option changes
    const filtered = testResults.filter((result) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        result.student.toLowerCase().includes(searchLower) ||
        (result.candidateNumber && result.candidateNumber.toLowerCase().includes(searchLower)) ||
        new Date(result.timestamp).toLocaleDateString().includes(searchLower)
      )
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case "oldest":
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        case "student":
          return a.student.localeCompare(b.student)
        case "candidate":
          return (a.candidateNumber || "").localeCompare(b.candidateNumber || "")
        case "overall":
          return (b.overallBand || 0) - (a.overallBand || 0)
        default:
          return 0
      }
    })

    setFilteredResults(filtered)
  }, [testResults, searchTerm, sortBy])

  const loadTestResults = () => {
    try {
      // Load test results from localStorage
      const resultsJSON = localStorage.getItem("testResults")
      if (resultsJSON) {
        const results = JSON.parse(resultsJSON)
        setTestResults(results)
      }
    } catch (error) {
      console.error("Error loading test results:", error)
    }
  }

  const autoCalculateReadingScore = (result: TestResult): number => {
    let correctCount = 0
    const totalQuestions = 40

    for (let i = 1; i <= totalQuestions; i++) {
      const studentAnswer = result.readingAnswers?.[i.toString()]
      const correctAnswer = readingAnswerKey[i.toString()]

      if (studentAnswer && correctAnswer && isAnswerCorrect(studentAnswer, correctAnswer)) {
        correctCount++
      }
    }

    return correctCount
  }

  const autoCalculateListeningScore = (result: TestResult): number => {
    let correctCount = 0
    const totalQuestions = 40

    for (let i = 1; i <= totalQuestions; i++) {
      const studentAnswer = result.listeningAnswers?.[i.toString()]
      const correctAnswer = listeningAnswerKey[i.toString()]

      if (studentAnswer && correctAnswer && isAnswerCorrect(studentAnswer, correctAnswer)) {
        correctCount++
      }
    }

    return correctCount
  }

  const deleteTestResult = (result: TestResult) => {
    if (deleteConfirmation !== "DELETE") {
      setError("Please type 'DELETE' to confirm deletion")
      return
    }

    try {
      const updatedResults = testResults.filter((r) => r.timestamp !== result.timestamp || r.student !== result.student)
      localStorage.setItem("testResults", JSON.stringify(updatedResults))
      setTestResults(updatedResults)
      setResultToDelete(null)
      setDeleteConfirmation("")
      setError("")
    } catch (error) {
      console.error("Error deleting test result:", error)
      setError("Failed to delete test result")
    }
  }

  const getAverageBand = (band: keyof TestResult) => {
    if (testResults.length === 0) return 0
    const sum = testResults.reduce((acc, result) => acc + (result[band] as number), 0)
    return (sum / testResults.length).toFixed(1)
  }

  const getTestsThisWeek = () => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    return testResults.filter((result) => {
      const resultDate = new Date(result.timestamp)
      return resultDate >= oneWeekAgo
    }).length
  }

  const handleResultSelect = (result: TestResult) => {
    setSelectedResult(result)

    // Auto-calculate scores
    const autoReadingScore = autoCalculateReadingScore(result)
    const autoListeningScore = autoCalculateListeningScore(result)

    setReadingScore(autoReadingScore)
    setListeningScore(autoListeningScore)
    setWritingBand(result.writingBand || 0)
    setOverallBand(result.overallBand || 0)
    setActiveTab("detail")
    setError("")
  }

  const calculateOverallBand = () => {
    const readingBand = calculateBandScore(readingScore, selectedResult?.readingTotal || 40)
    const listeningBand = calculateBandScore(listeningScore, selectedResult?.listeningTotal || 40)
    const overall = (readingBand + listeningBand + writingBand) / 3
    return Math.round(overall * 2) / 2 // Round to nearest 0.5
  }

  const validateScores = () => {
    setError("")

    if (readingScore > 40) {
      setError("Reading score cannot exceed 40")
      return false
    }

    if (listeningScore > 40) {
      setError("Listening score cannot exceed 40")
      return false
    }

    if (writingBand > 9) {
      setError("Writing band score cannot exceed 9.0")
      return false
    }

    return true
  }

  const handleUpdateScores = () => {
    if (!selectedResult) return

    if (!validateScores()) return

    const readingBand = calculateBandScore(readingScore, selectedResult.readingTotal)
    const listeningBand = calculateBandScore(listeningScore, selectedResult.listeningTotal)
    const calculatedOverallBand = calculateOverallBand()

    // Update the selected result
    const updatedResult = {
      ...selectedResult,
      readingScore,
      readingBand,
      listeningScore,
      listeningBand,
      writingBand,
      overallBand: calculatedOverallBand,
    }

    // Update the results array
    const updatedResults = testResults.map((result) =>
      result.timestamp === selectedResult.timestamp ? updatedResult : result,
    )

    // Save to localStorage
    localStorage.setItem("testResults", JSON.stringify(updatedResults))
    setTestResults(updatedResults)
    setSelectedResult(updatedResult)
    setOverallBand(calculatedOverallBand)

    // Prepare Telegram message
    const message = `IELTS Test Results
Student: ${selectedResult.student}
${selectedResult.candidateNumber ? `Candidate: ${selectedResult.candidateNumber}` : ""}
Date: ${new Date(selectedResult.timestamp).toLocaleString()}

Reading
Score: ${readingScore}/${selectedResult.readingTotal}
Band: ${readingBand.toFixed(1)}

Listening
Score: ${listeningScore}/${selectedResult.listeningTotal}
Band: ${listeningBand.toFixed(1)}

Writing
Task 1 Words: ${selectedResult.writingTask1Words}
Task 2 Words: ${selectedResult.writingTask2Words}
Band: ${writingBand.toFixed(1)}

Overall Band Score: ${calculatedOverallBand.toFixed(1)}`

    setTelegramMessage(message)
  }

  const sendToTelegram = async () => {
    if (!telegramMessage) return

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: telegramMessage }),
      })

      const data = await response.json()
      if (data.success) {
        alert("Results sent to Telegram successfully!")
      } else {
        alert(`Failed to send results: ${data.error}`)
      }
    } catch (error) {
      console.error("Error sending to Telegram:", error)
      alert("Error sending results to Telegram")
    }
  }

  const renderAnswerComparison = (
    answers: Record<string, string>,
    answerKey: Record<string, string>,
    section: string,
  ) => {
    return (
      <div className="space-y-2">
        <h4 className="font-medium">{section} Answer Comparison</h4>
        <div className="max-h-60 overflow-y-auto border rounded p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Q#</TableHead>
                <TableHead>Student Answer</TableHead>
                <TableHead>Correct Answer</TableHead>
                <TableHead className="w-16">✓</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(answerKey).map((questionId) => {
                const studentAnswer = answers?.[questionId] || "No answer"
                const correctAnswer = answerKey[questionId]
                const isCorrect = isAnswerCorrect(studentAnswer, correctAnswer)

                return (
                  <TableRow key={questionId}>
                    <TableCell>{questionId}</TableCell>
                    <TableCell className={isCorrect ? "text-green-600 font-medium" : "text-red-600"}>
                      {studentAnswer || "No answer"}
                      {!isCorrect && studentAnswer && (
                        <div className="text-xs text-gray-500 mt-1">Expected: {correctAnswer}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-blue-600">{correctAnswer}</TableCell>
                    <TableCell>
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  // If not admin, show login form
  if (!isAdmin) {
    return (
      <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Please enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const username = (e.currentTarget.elements.namedItem("username") as HTMLInputElement).value
                const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value

                if (username === "superadmin8071" && password === "08268071") {
                  // Set admin session
                  sessionStorage.setItem("isLoggedIn", "true")
                  sessionStorage.setItem("currentUser", username)
                  setIsAdmin(true)
                  loadTestResults()
                } else {
                  setError("Invalid admin credentials")
                }
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
                Back to Main Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => router.push("/admin/password-generator")}>
            Password Generator
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              sessionStorage.removeItem("isLoggedIn")
              sessionStorage.removeItem("currentUser")
              router.push("/")
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="detail">Detailed View</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testResults.length}</div>
                <p className="text-xs text-muted-foreground">{getTestsThisWeek()} tests this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Reading Band</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getAverageBand("readingBand")}</div>
                <p className="text-xs text-muted-foreground">Out of 9.0 band score</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Listening Band</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getAverageBand("listeningBand")}</div>
                <p className="text-xs text-muted-foreground">Out of 9.0 band score</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Test Results</CardTitle>
              <CardDescription>Overview of the most recent IELTS test results</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Candidate #</TableHead>
                    <TableHead>Reading</TableHead>
                    <TableHead>Listening</TableHead>
                    <TableHead>Writing</TableHead>
                    <TableHead>Overall</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.slice(0, 5).map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.student}</TableCell>
                      <TableCell className="font-mono text-sm">{result.candidateNumber || "N/A"}</TableCell>
                      <TableCell>{result.readingBand?.toFixed(1) || "Not scored"}</TableCell>
                      <TableCell>{result.listeningBand?.toFixed(1) || "Not scored"}</TableCell>
                      <TableCell>{result.writingBand?.toFixed(1) || "Not scored"}</TableCell>
                      <TableCell>{result.overallBand?.toFixed(1) || "Not scored"}</TableCell>
                      <TableCell>{new Date(result.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleResultSelect(result)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {testResults.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No test results available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>All Test Results</CardTitle>
              <CardDescription>Complete list of all IELTS test results with search and sort</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by student name, candidate number, or date..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="student">Student Name</SelectItem>
                    <SelectItem value="candidate">Candidate Number</SelectItem>
                    <SelectItem value="overall">Overall Band</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Candidate #</TableHead>
                      <TableHead>Reading</TableHead>
                      <TableHead>Listening</TableHead>
                      <TableHead>Writing</TableHead>
                      <TableHead>Overall</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{result.student}</TableCell>
                        <TableCell className="font-mono text-sm">{result.candidateNumber || "N/A"}</TableCell>
                        <TableCell>
                          {result.readingBand?.toFixed(1) || "Not scored"} ({result.readingScore || 0}/
                          {result.readingTotal || 40})
                        </TableCell>
                        <TableCell>
                          {result.listeningBand?.toFixed(1) || "Not scored"} ({result.listeningScore || 0}/
                          {result.listeningTotal || 40})
                        </TableCell>
                        <TableCell>
                          {result.writingBand?.toFixed(1) || "Not scored"} (T1: {result.writingTask1Words || "NA"}, T2:{" "}
                          {result.writingTask2Words || "NA"})
                        </TableCell>
                        <TableCell>{result.overallBand?.toFixed(1) || "Not scored"}</TableCell>
                        <TableCell>{new Date(result.timestamp).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleResultSelect(result)}>
                              View
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" onClick={() => setResultToDelete(result)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Test Result</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the test result for{" "}
                                    <strong>{result.student}</strong> completed on{" "}
                                    <strong>{new Date(result.timestamp).toLocaleString()}</strong>.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="my-4">
                                  <Label htmlFor="deleteConfirmation">
                                    Type <strong>DELETE</strong> to confirm:
                                  </Label>
                                  <Input
                                    id="deleteConfirmation"
                                    value={deleteConfirmation}
                                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                                    placeholder="Type DELETE here"
                                    className="mt-2"
                                  />
                                </div>
                                {error && (
                                  <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                  </Alert>
                                )}
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    onClick={() => {
                                      setDeleteConfirmation("")
                                      setResultToDelete(null)
                                      setError("")
                                    }}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => resultToDelete && deleteTestResult(resultToDelete)}
                                    className="bg-red-600 hover:bg-red-700"
                                    disabled={deleteConfirmation !== "DELETE"}
                                  >
                                    Delete Permanently
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredResults.length === 0 && testResults.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No results match your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                    {testResults.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No test results available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {filteredResults.length > 0 && (
                <div className="mt-4 text-sm text-gray-500">
                  Showing {filteredResults.length} of {testResults.length} results
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Test Analytics</CardTitle>
              <CardDescription>Performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Band Score Distribution</h3>
                  <div className="h-[300px] flex items-end justify-around">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-16 h-[200px] rounded-t"></div>
                      <div className="mt-2">Reading</div>
                      <div className="text-sm">{getAverageBand("readingBand")}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-green-500 w-16 h-[180px] rounded-t"></div>
                      <div className="mt-2">Listening</div>
                      <div className="text-sm">{getAverageBand("listeningBand")}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-yellow-500 w-16 h-[170px] rounded-t"></div>
                      <div className="mt-2">Writing</div>
                      <div className="text-sm">{getAverageBand("writingBand")}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-amber-500 w-16 h-[190px] rounded-t"></div>
                      <div className="mt-2">Overall</div>
                      <div className="text-sm">{getAverageBand("overallBand")}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Test Completion Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Average Reading Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {testResults.length > 0
                            ? (
                                testResults.reduce((acc, result) => acc + (result.readingPercentage || 0), 0) /
                                testResults.length
                              ).toFixed(1) + "%"
                            : "0%"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Average Listening Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {testResults.length > 0
                            ? (
                                testResults.reduce((acc, result) => acc + (result.listeningPercentage || 0), 0) /
                                testResults.length
                              ).toFixed(1) + "%"
                            : "0%"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Average Writing Words</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {testResults.length > 0
                            ? Math.round(
                                testResults.reduce(
                                  (acc, result) =>
                                    acc + (result.writingTask1Words || 0) + (result.writingTask2Words || 0),
                                  0,
                                ) / testResults.length,
                              )
                            : "0"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail">
          {selectedResult ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Details</CardTitle>
                  <CardDescription>
                    Student: {selectedResult.student}
                    {selectedResult.candidateNumber && ` | Candidate: ${selectedResult.candidateNumber}`} | Date:{" "}
                    {new Date(selectedResult.timestamp).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderAnswerComparison(selectedResult.readingAnswers, readingAnswerKey, "Reading")}
                    {renderAnswerComparison(selectedResult.listeningAnswers, listeningAnswerKey, "Listening")}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Writing Task 1</h3>
                    <div className="border rounded-md p-4 min-h-[200px] mb-4">
                      <p className="whitespace-pre-wrap">{selectedResult.writingTask1 || "NA"}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Word count: {selectedResult.writingTask1Words || 0} words
                      </p>
                    </div>

                    <h3 className="text-lg font-medium mb-4">Writing Task 2</h3>
                    <div className="border rounded-md p-4 min-h-[200px]">
                      <p className="whitespace-pre-wrap">{selectedResult.writingTask2 || "NA"}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Word count: {selectedResult.writingTask2Words || 0} words
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border rounded-md p-6 bg-gray-50">
                    <h3 className="text-lg font-medium mb-4">Score and Rate Test</h3>

                    {error && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="readingScore">
                            Reading Score (out of {selectedResult.readingTotal || 40})
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="readingScore"
                              type="number"
                              min="0"
                              max="40"
                              placeholder="0"
                              value={readingScore}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (isNaN(value)) {
                                  setReadingScore(0)
                                } else if (value > 40) {
                                  setReadingScore(40)
                                  setError("Reading score cannot exceed 40")
                                } else {
                                  setReadingScore(value)
                                  setError("")
                                }
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const autoScore = autoCalculateReadingScore(selectedResult)
                                setReadingScore(autoScore)
                              }}
                            >
                              Auto
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Band: {calculateBandScore(readingScore, selectedResult.readingTotal || 40).toFixed(1)}
                            <span className="ml-2 text-blue-600">
                              (Auto: {autoCalculateReadingScore(selectedResult)})
                            </span>
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="listeningScore">
                            Listening Score (out of {selectedResult.listeningTotal || 40})
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="listeningScore"
                              type="number"
                              min="0"
                              max="40"
                              placeholder="0"
                              value={listeningScore}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (isNaN(value)) {
                                  setListeningScore(0)
                                } else if (value > 40) {
                                  setListeningScore(40)
                                  setError("Listening score cannot exceed 40")
                                } else {
                                  setListeningScore(value)
                                  setError("")
                                }
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const autoScore = autoCalculateListeningScore(selectedResult)
                                setListeningScore(autoScore)
                              }}
                            >
                              Auto
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Band: {calculateBandScore(listeningScore, selectedResult.listeningTotal || 40).toFixed(1)}
                            <span className="ml-2 text-blue-600">
                              (Auto: {autoCalculateListeningScore(selectedResult)})
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="writingBand">Writing Band Score (out of 9.0)</Label>
                          <Input
                            id="writingBand"
                            type="number"
                            min="0"
                            max="9"
                            step="0.5"
                            placeholder="0"
                            value={writingBand}
                            onChange={(e) => {
                              const value = Number.parseFloat(e.target.value)
                              if (isNaN(value)) {
                                setWritingBand(0)
                              } else if (value > 9) {
                                setWritingBand(9)
                                setError("Writing band score cannot exceed 9.0")
                              } else {
                                setWritingBand(value)
                                setError("")
                              }
                            }}
                          />
                        </div>

                        <div>
                          <Label htmlFor="overallBand">Overall Band Score</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="overallBand"
                              type="number"
                              value={calculateOverallBand()}
                              readOnly
                              className="bg-gray-100"
                            />
                            <Button onClick={handleUpdateScores}>Update Scores</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {telegramMessage && (
                      <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Send Results to Telegram</h4>
                          <Button onClick={sendToTelegram} size="sm" className="flex items-center">
                            <Send className="h-4 w-4 mr-1" />
                            Send
                          </Button>
                        </div>
                        <div className="border rounded-md p-4 bg-white">
                          <pre className="whitespace-pre-wrap text-sm">{telegramMessage}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No test selected</h3>
              <p className="text-gray-500">Please select a test from the Results tab to view details</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}