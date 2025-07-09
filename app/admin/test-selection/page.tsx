"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { allListeningTests, allReadingTests } from "@/lib/test-data"
import { ArrowLeft, Users, TestTube, Calendar } from "lucide-react"

interface RegisteredUser {
  fullName: string
  password: string
  registeredAt: string
  used: boolean
  candidateNumber?: string
  passwordHistory?: string[]
  lastLoginAt?: string
}

interface TestAssignment {
  id: string
  userId: string
  userName: string
  listeningTestId: number
  readingTestId: number
  assignedAt: string
  status: "assigned" | "in-progress" | "completed"
}

export default function TestSelectionPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([])
  const [testAssignments, setTestAssignments] = useState<TestAssignment[]>([])
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [selectedListeningTest, setSelectedListeningTest] = useState<string>("")
  const [selectedReadingTest, setSelectedReadingTest] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is admin
    const username = sessionStorage.getItem("currentUser")
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")

    if (username === "superadmin8071" && isLoggedIn === "true") {
      setIsAdmin(true)
      loadData()
    } else {
      setIsAdmin(false)
      router.push("/admin")
    }
  }, [router])

  const loadData = () => {
    try {
      // Load registered users
      const usersJSON = localStorage.getItem("registeredUsers")
      if (usersJSON) {
        const users = JSON.parse(usersJSON)
        setRegisteredUsers(users)
      }

      // Load test assignments
      const assignmentsJSON = localStorage.getItem("testAssignments")
      if (assignmentsJSON) {
        const assignments = JSON.parse(assignmentsJSON)
        setTestAssignments(assignments)
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error loading data:", error)
      setError("Error loading data")
      setIsLoading(false)
    }
  }

  const handleAssignTest = () => {
    if (!selectedUser || !selectedListeningTest || !selectedReadingTest) {
      setError("Please select a user and both tests")
      return
    }

    const user = registeredUsers.find((u) => u.fullName === selectedUser)
    if (!user) {
      setError("Selected user not found")
      return
    }

    // Check if user already has an assignment
    const existingAssignment = testAssignments.find((assignment) => assignment.userId === selectedUser)

    const newAssignment: TestAssignment = {
      id: `${selectedUser}-${Date.now()}`,
      userId: selectedUser,
      userName: user.fullName,
      listeningTestId: Number.parseInt(selectedListeningTest),
      readingTestId: Number.parseInt(selectedReadingTest),
      assignedAt: new Date().toISOString(),
      status: "assigned",
    }

    let updatedAssignments: TestAssignment[]

    if (existingAssignment) {
      // Update existing assignment
      updatedAssignments = testAssignments.map((assignment) =>
        assignment.userId === selectedUser ? newAssignment : assignment,
      )
      setSuccess(`Tests updated for ${user.fullName}`)
    } else {
      // Add new assignment
      updatedAssignments = [...testAssignments, newAssignment]
      setSuccess(`Tests assigned to ${user.fullName}`)
    }

    // Save to localStorage
    localStorage.setItem("testAssignments", JSON.stringify(updatedAssignments))
    setTestAssignments(updatedAssignments)

    // Clear form
    setSelectedUser("")
    setSelectedListeningTest("")
    setSelectedReadingTest("")
    setError("")

    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(""), 3000)
  }

  const getAssignmentForUser = (userId: string) => {
    return testAssignments.find((assignment) => assignment.userId === userId)
  }

  const getTestTitle = (testId: number, type: "listening" | "reading") => {
    if (type === "listening") {
      const test = allListeningTests.find((t) => t.id === testId)
      return test ? test.title : `Listening Test ${testId}`
    } else {
      const test = allReadingTests.find((t) => t.id === testId)
      return test ? test.title : `Reading Test ${testId}`
    }
  }

  const removeAssignment = (assignmentId: string) => {
    const updatedAssignments = testAssignments.filter((assignment) => assignment.id !== assignmentId)
    localStorage.setItem("testAssignments", JSON.stringify(updatedAssignments))
    setTestAssignments(updatedAssignments)
    setSuccess("Assignment removed successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Access Required</CardTitle>
            <CardDescription className="text-center">
              Please log in as an administrator to access test selection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/admin")} className="w-full">
              Go to Admin Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading test selection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/admin/password-generator")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to User Management
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Test Assignment</h1>
            <p className="text-gray-600">Assign specific reading and listening tests to students</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            <span>{allListeningTests.length} Listening Tests</span>
          </div>
          <div className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            <span>{allReadingTests.length} Reading Tests</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Assignment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Assign Tests to Student
            </CardTitle>
            <CardDescription>Select a student and assign specific reading and listening tests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-select">Select Student</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a student..." />
                </SelectTrigger>
                <SelectContent>
                  {registeredUsers.map((user) => (
                    <SelectItem key={user.fullName} value={user.fullName}>
                      <div className="flex items-center justify-between w-full">
                        <span>{user.fullName}</span>
                        {user.candidateNumber && (
                          <Badge variant="secondary" className="ml-2">
                            {user.candidateNumber}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="listening-test-select">Listening Test</Label>
              <Select value={selectedListeningTest} onValueChange={setSelectedListeningTest}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose listening test..." />
                </SelectTrigger>
                <SelectContent>
                  {allListeningTests.map((test) => (
                    <SelectItem key={test.id} value={test.id.toString()}>
                      <div className="flex flex-col">
                        <span>{test.title}</span>
                        <span className="text-xs text-gray-500">Audio: {test.audioUrl}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reading-test-select">Reading Test</Label>
              <Select value={selectedReadingTest} onValueChange={setSelectedReadingTest}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose reading test..." />
                </SelectTrigger>
                <SelectContent>
                  {allReadingTests.map((test) => (
                    <SelectItem key={test.id} value={test.id.toString()}>
                      {test.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleAssignTest}
              className="w-full"
              disabled={!selectedUser || !selectedListeningTest || !selectedReadingTest}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Assign Tests
            </Button>
          </CardContent>
        </Card>

        {/* Current Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Current Test Assignments
            </CardTitle>
            <CardDescription>View and manage all current test assignments</CardDescription>
          </CardHeader>
          <CardContent>
            {testAssignments.length > 0 ? (
              <div className="space-y-4">
                {testAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{assignment.userName}</h4>
                      <Badge
                        variant={
                          assignment.status === "completed"
                            ? "default"
                            : assignment.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        <strong>Listening:</strong> {getTestTitle(assignment.listeningTestId, "listening")}
                      </div>
                      <div>
                        <strong>Reading:</strong> {getTestTitle(assignment.readingTestId, "reading")}
                      </div>
                      <div>
                        <strong>Assigned:</strong> {new Date(assignment.assignedAt).toLocaleString()}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAssignment(assignment.id)}
                      className="w-full"
                    >
                      Remove Assignment
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No test assignments yet</p>
                <p className="text-sm">Assign tests to students to see them here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Students Overview</CardTitle>
          <CardDescription>View test assignment status for all registered students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Candidate Number</TableHead>
                  <TableHead>Listening Test</TableHead>
                  <TableHead>Reading Test</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registeredUsers.map((user) => {
                  const assignment = getAssignmentForUser(user.fullName)
                  return (
                    <TableRow key={user.fullName}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>
                        {user.candidateNumber ? (
                          <Badge variant="secondary">{user.candidateNumber}</Badge>
                        ) : (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {assignment ? (
                          getTestTitle(assignment.listeningTestId, "listening")
                        ) : (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {assignment ? (
                          getTestTitle(assignment.readingTestId, "reading")
                        ) : (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {assignment ? (
                          <Badge
                            variant={
                              assignment.status === "completed"
                                ? "default"
                                : assignment.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {assignment.status}
                          </Badge>
                        ) : (
                          <Badge variant="destructive">No tests assigned</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {assignment ? (
                          new Date(assignment.assignedAt).toLocaleDateString()
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
