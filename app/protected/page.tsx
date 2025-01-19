'use client'

import { useState, useEffect } from 'react'
import { Plus, Loader2, TrendingUp, Users, Target, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { StatsCard } from '@/components/stats-card'
import { DashboardSkeleton } from '@/components/loading-skeleton'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function CompanyDashboard() {
  const [industries, setIndustries] = useState<string[]>([])
  const [currentIndustry, setCurrentIndustry] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [formSuccess, setFormSuccess] = useState(false)

  const methods = useForm()

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleIndustryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentIndustry.trim()) {
      e.preventDefault()
      setIndustries([...industries, currentIndustry.trim()])
      setCurrentIndustry('')
    }
  }

  const removeIndustry = (industry: string) => {
    setIndustries(industries.filter(i => i !== industry))
  }

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Handle form submission
    console.log(data)
  }

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-purple-900">
          <div className="container mx-auto px-4 py-4">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <DashboardSkeleton />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">Welcome to ART Finder!</h2>
            <p className="text-gray-400">
              Complete your company profile to get personalized ad recommendations.
            </p>
          </div>

          {/* Form Section */}
          <Card className="bg-gray-900 border-purple-900">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Company Profile</h3>
                  <p className="text-gray-400">
                    Tell us about your company to help us provide better ad analysis and recommendations.
                  </p>
                </div>

                {formSuccess && (
                  <Alert className="bg-green-900/50 border-green-500 text-green-100">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertDescription>
                      Your company profile has been updated successfully!
                    </AlertDescription>
                  </Alert>
                )}

                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormItem>
                        <FormLabel>Company Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            {...methods.register('companyName', { required: true })}
                            className="bg-gray-800 border-purple-900"
                            placeholder="Enter your company name"
                          />
                        </FormControl>
                        <FormDescription>
                          This will be displayed on your public profile
                        </FormDescription>
                      </FormItem>

                      <FormItem>
                        <FormLabel>Industry <span className="text-red-500">*</span></FormLabel>
                        <div className="flex gap-2">
                          <Input
                            value={currentIndustry}
                            onChange={(e) => setCurrentIndustry(e.target.value)}
                            onKeyDown={handleIndustryKeyDown}
                            className="bg-gray-800 border-purple-900"
                            placeholder="Type and press Enter to add industries"
                          />
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={() => {
                              if (currentIndustry.trim()) {
                                setIndustries([...industries, currentIndustry.trim()])
                                setCurrentIndustry('')
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {industries.map((industry) => (
                            <Badge 
                              key={industry}
                              variant="secondary"
                              className="cursor-pointer hover:bg-purple-900/50"
                              onClick={() => removeIndustry(industry)}
                            >
                              {industry} ×
                            </Badge>
                          ))}
                        </div>
                        {industries.length === 0 && (
                          <FormMessage className="text-yellow-500">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            Add at least one industry
                          </FormMessage>
                        )}
                      </FormItem>

                      <FormItem>
                        <FormLabel>Company Description <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            required
                            className="bg-gray-800 border-purple-900 min-h-[120px]"
                            placeholder="Describe your company and its main activities"
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a clear description to help us understand your business better
                        </FormDescription>
                      </FormItem>

                      <div className="grid md:grid-cols-3 gap-6">
                        <FormItem>
                          <FormLabel>Target Audience Age</FormLabel>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-purple-900">
                              <SelectValue placeholder="Select age range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="13-17">13-17</SelectItem>
                              <SelectItem value="18-24">18-24</SelectItem>
                              <SelectItem value="25-34">25-34</SelectItem>
                              <SelectItem value="35-44">35-44</SelectItem>
                              <SelectItem value="45+">45+</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>

                        <FormItem>
                          <FormLabel>Target Gender</FormLabel>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-purple-900">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>

                        <FormItem>
                          <FormLabel>Target Country</FormLabel>
                          <Select>
                            <SelectTrigger className="bg-gray-800 border-purple-900">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="in">India</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-900"
                      disabled={isLoading || industries.length === 0}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating Profile...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </form>
                </FormProvider>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

