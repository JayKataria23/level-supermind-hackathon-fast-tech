import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const FEATURES_CONTENT = [
  {
    title: "User Pain Points and Triggers",
    content:
      "Gain a deep understanding of your audience with a detailed analysis of user pain points and emotional triggers. Identify what resonates most and use these insights as the foundation for crafting impactful ad themes.",
  },
  {
    title: "Ad Hooks, CTAs, and Ideas",
    content:
      "Discover high-performing ad hooks, compelling CTAs, and innovative ad ideas tailored to your audience. Leverage data-driven recommendations to make your ads more engaging and action-oriented.",
  },
  {
    title: "Visualized Insights",
    content:
      "Easily interpret data with visual tools like interactive graphs, word clouds, and sentiment analysis. Quickly identify trends, sentiment shifts, and keyword importance for data-backed decision-making.",
  },
  {
    title: "Competitor and Platform Analysis",
    content:
      "Uncover strategies from competitor ads and platform-specific data, such as YouTube and app reviews. Get actionable takeaways to refine your approach and stay ahead in the market.",
  },
];

function Features() {
  return (
    <section id="features" className="w-full py-16 md:py-28 lg:py-32 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Powerful Features for Better Analysis
            </h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how our platform helps you create data-driven,
              high-performing ad campaigns
            </p>
          </div>
        </div>
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-12 md:mt-16">
          {FEATURES_CONTENT.map((feature) => (
            <Card
              key={feature.title}
              className="relative overflow-hidden border-primary-500 bg-gray-950/50 backdrop-blur-sm transition-all hover:scale-105 hover:bg-gray-950/80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-10" />
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{feature.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
