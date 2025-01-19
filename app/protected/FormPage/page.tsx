"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSkeleton } from "@/components/loading-skeleton";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormData {
  companyName: string;
  companyDescription: string;
  targetAge: string;
  targetGender: string;
  targetCountry: string;
}

export default function CompanyDashboard() {
  const router = useRouter();
  const [industries, setIndustries] = useState<string[]>([]);
  const [currentIndustry, setCurrentIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const form = useForm<FormData>({
    defaultValues: {
      companyName: "",
      companyDescription: "",
      targetAge: "",
      targetGender: "",
      targetCountry: "",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleIndustryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentIndustry.trim()) {
      e.preventDefault();
      setIndustries([...industries, currentIndustry.trim()]);
      setCurrentIndustry("");
    }
  };

  const removeIndustry = (industry: string) => {
    setIndustries(industries.filter((i) => i !== industry));
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        industries: industries,
      };
      router.push(
        `/protected/results?data=${encodeURIComponent(JSON.stringify(formData))}`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-[#13111C]">
        <header className="border-b border-[#2D2B3B]">
          <div className="container mx-auto px-4 py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white relative overflow-hidden">
      

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full  text-primary text-sm font-medium mb-4">
              AI Powered
            </div>
            <h2 className="text-5xl font-bold tracking-tight">
              Data Driven Ads,{" "}
              <span className="text-primary">Done Right</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Complete your company profile to get personalized ad
              recommendations.
            </p>
          </div>

          <Card className=" border-[#2D2B3B] ">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Company Profile
                  </h3>
                  <p className="text-gray-400">
                    Tell us about your company to help us provide better ad
                    analysis and recommendations.
                  </p>
                </div>

                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">
                              Company Name{" "}
                              <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-[#13111C] border-[#2D2B3B] focus:border-[#8B5CF6] transition-colors"
                                placeholder="Enter your company name"
                                required
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                              This will be displayed on your public profile
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormItem>
                        <FormLabel className="text-gray-200">
                          Industry <span className="text-primary">*</span>
                        </FormLabel>
                        <div className="flex gap-2">
                          <Input
                            value={currentIndustry}
                            onChange={(e) => setCurrentIndustry(e.target.value)}
                            onKeyDown={handleIndustryKeyDown}
                            className="bg-[#13111C] border-[#2D2B3B] focus:border-primary transition-colors"
                            placeholder="Type and press Enter to add industries"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="border-[#2D2B3B] hover:bg-primary/10 hover:text-primary"
                            onClick={() => {
                              if (currentIndustry.trim()) {
                                setIndustries([
                                  ...industries,
                                  currentIndustry.trim(),
                                ]);
                                setCurrentIndustry("");
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
                              className="bg-primary/10 hover:bg-primary/20 text-primary cursor-pointer transition-colors"
                              onClick={() => removeIndustry(industry)}
                            >
                              {industry} ×
                            </Badge>
                          ))}
                        </div>
                        {industries.length === 0 && (
                          <FormMessage className="text-primary">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            Add at least one industry
                          </FormMessage>
                        )}
                      </FormItem>

                      <FormField
                        control={form.control}
                        name="companyDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">
                              Company Description{" "}
                              <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="bg-[#13111C] border-[#2D2B3B] focus:border-primary transition-colors min-h-[120px]"
                                placeholder="Describe your company and its main activities"
                                required
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                              Provide a clear description to help us understand
                              your business better
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="targetAge"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">
                                Target Audience Age
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="bg-[#13111C] border-[#2D2B3B] focus:border-primary transition-colors">
                                  <SelectValue placeholder="Select age range" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1825] border-[#2D2B3B]">
                                  <SelectItem value="13-17">13-17</SelectItem>
                                  <SelectItem value="18-24">18-24</SelectItem>
                                  <SelectItem value="25-34">25-34</SelectItem>
                                  <SelectItem value="35-44">35-44</SelectItem>
                                  <SelectItem value="45+">45+</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="targetGender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">
                                Target Gender
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="bg-[#13111C] border-[#2D2B3B] focus:border-primary transition-colors">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1825] border-[#2D2B3B]">
                                  <SelectItem value="all">All</SelectItem>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="targetCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">
                                Target Country
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="bg-[#13111C] border-[#2D2B3B] focus:border-primary transition-colors">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1825] border-[#2D2B3B]">
                                  <SelectItem value="us">
                                    United States
                                  </SelectItem>
                                  <SelectItem value="in">India</SelectItem>
                                  <SelectItem value="uk">
                                    United Kingdom
                                  </SelectItem>
                                  <SelectItem value="ca">Canada</SelectItem>
                                  <SelectItem value="au">Australia</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                        className="w-full bg-primary hover:bg-primary/90 transition-colors text-xl  "
                      disabled={isLoading || industries.length === 0}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating Profile...
                        </>
                      ) : (
                        "Analyze Now"
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
  );
}
