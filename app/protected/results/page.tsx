"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Markdown from "react-markdown";


function Page() {
  const [painPoints, setPainPoints] = useState<string>("");
  const [triggers, setTriggers] = useState<string>("");
  const [bestHooks, setBestHooks] = useState<string>("");
  const [bestCallToActions, setBestCallToActions] = useState<string>("");
  const [adCampaignIdeas, setAdCampaignIdeas] = useState<string>("");
  const [sentiments, setSentiments] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [targetMarket, setTargetMarket] = useState<string>("");
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [selectedSection, setSelectedSection] = useState<string>("painPoints");
  const [formData, setFormData] = useState<any>(null);
  const [tavilyData, setTavilyData] = useState<{
    ctRdData: any;
    rdData: any;
    ytData: any;
  } | null>(null);

  useEffect(() => {
    // Parse the encoded form data from URL
    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = searchParams.get("data");

    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setFormData(decodedData);

        // Generate prompts with the complete company information
        setPainPoints(
          `Just answer in 3 points using markdown answering Pain Points of users for ${decodedData.companyName}. Company details: ${decodedData.companyDescription}. Industries: ${decodedData.industries.join(", ")}`
        );
        setTriggers(
          `Just answer in 3 points using markdown answering Triggers that make users buy the product for ${decodedData.companyName}. Target age: ${decodedData.targetAge}, Target gender: ${decodedData.targetGender}`
        );
        setBestHooks(
          `Just answer in 3 points using markdown answering Best Hooks for ${decodedData.companyName} considering target market: ${decodedData.targetCountry}`
        );
        setBestCallToActions(
          `Just answer in 3 points using markdown answering Best Call to actions for ${decodedData.companyName} in ${decodedData.targetCountry}`
        );
        setAdCampaignIdeas(
          `Just answer in 3 points using markdown answering Ad Campaign Ideas for ${decodedData.companyName} targeting ${decodedData.targetAge} age group`
        );
        setSentiments(
          `Just answer in 3 points using markdown answering Sentiments of reddit posts and comments for ${decodedData.companyName} in ${decodedData.targetCountry}`
        );
        setKeywords(
          `Just answer in 3 points using markdown answering Key words for word cloud for ${decodedData.companyName} in industry: ${decodedData.industries.join(", ")}`
        );
        setTargetMarket(
          `Just answer in 3 points using markdown answering What should be the target market for ${decodedData.companyName} considering: Age: ${decodedData.targetAge}, Gender: ${decodedData.targetGender}, Country: ${decodedData.targetCountry}`
        );
      } catch (error) {
        console.error("Error parsing form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (
      selectedSection &&
      !responses[selectedSection] &&
      !loading[selectedSection]
    ) {
      const section = sections.find((s) => s.key === selectedSection);
      if (section && section.prompt) {
        handleApiCall(section.prompt, section.key);
      }
    }
  }, [selectedSection, responses, loading]);

  const handleApiCall = async (prompt: string, key: string) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        body: JSON.stringify({
          message: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Convert the response to HTML using a simple markdown-like format

      setResponses((prev) => ({
        ...prev,
        [key]: data,
      }));
    } catch (error) {
      console.error("Error calling API:", error);
      setResponses((prev) => ({
        ...prev,
        [key]: `<div class="text-red-500">Error generating response. Please try again.</div>`,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const fetchTavilyData = async () => {
    try {
      const [ctRdResponse, rdResponse, ytResponse] = await Promise.all([
        fetch("/api/tavily-ct-rd", {
          method: "POST",
          body: JSON.stringify({
            searchQuery: formData.companyName + " competitors",
          }),
        }),
        fetch("/api/tavily-rd", {
          method: "POST",
          body: JSON.stringify({
            searchQuery: formData.companyName,
          }),
        }),
        fetch("/api/tavily-yt", {
          method: "POST",
          body: JSON.stringify({
            searchQuery: formData.industries.join(", ") + " ads",
          }),
        }),
      ]);

      const [ctRdData, rdData, ytData] = await Promise.all([
        ctRdResponse.json(),
        rdResponse.json(),
        ytResponse.json(),
      ]);

      setTavilyData({ ctRdData, rdData, ytData });
      return { ctRdData, rdData, ytData };
    } catch (error) {
      console.error("Error fetching Tavily data:", error);
      return null;
    }
  };

  // Add useEffect to fetch Tavily data when company name is available
  useEffect(() => {
    if (formData?.companyName) {
      fetchTavilyData();
    }
  }, [formData?.companyName]);

  const sections = [
    { title: "🎯 Pain Points", prompt: painPoints, key: "painPoints" },
    { title: "⚡ Triggers", prompt: triggers, key: "triggers" },
    { title: "🎣 Best Hooks", prompt: bestHooks, key: "bestHooks" },
    {
      title: "🎬 Best Call to Actions",
      prompt: bestCallToActions,
      key: "bestCallToActions",
    },
    {
      title: "💡 Ad Campaign Ideas",
      prompt: adCampaignIdeas,
      key: "adCampaignIdeas",
    },
    { title: "💭 Sentiments", prompt: sentiments, key: "sentiments" },
    { title: "🔑 Keywords", prompt: keywords, key: "keywords" },
    { title: "🎯 Target Market", prompt: targetMarket, key: "targetMarket" },
    { title: "📚 References", key: "references" },
  ];

  // Add new function to generate word cloud data
 

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F0A1F] text-white">
        <div className="text-xl">⌛ Loading company data...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0F0A1F] text-white">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-800 p-4">
        {sections.map(({ title, key }) => (
          <div
            key={key}
            onClick={() => setSelectedSection(key)}
            className={`p-4 cursor-pointer rounded-lg mb-2 transition-all duration-200 ${
              selectedSection === key
                ? "bg-[#9333EA] text-white"
                : "hover:bg-gray-800"
            }`}
          >
            <span className="flex items-center justify-between">
              {title}
              {responses[key] && (
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {selectedSection === "references" ? (
            <div className="border border-gray-800 rounded-xl p-8 bg-gray-900/50 backdrop-blur">
              <h2 className="text-3xl font-bold mb-6 text-white">References</h2>
              {tavilyData ? (
                <div className="space-y-8">
                  <details className="group" open>
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center text-xl font-semibold mb-4 text-purple-400">
                        <span>🔍 Competitor & Reddit Research</span>
                        <svg
                          className="w-6 h-6 ml-2 transform group-open:rotate-180 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </summary>
                    <div className="space-y-4 pt-4">
                      {tavilyData.ctRdData?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-800/50 rounded-lg"
                        >
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {item.title}
                          </a>
                          <p className="text-gray-300 mt-2">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center text-xl font-semibold mb-4 text-purple-400">
                        <span>💬 Reddit Discussions</span>
                        <svg
                          className="w-6 h-6 ml-2 transform group-open:rotate-180 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </summary>
                    <div className="space-y-4 pt-4">
                      {tavilyData.rdData?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-800/50 rounded-lg"
                        >
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {item.title}
                          </a>
                          <p className="text-gray-300 mt-2">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center text-xl font-semibold mb-4 text-purple-400">
                        <span>📺 YouTube Content</span>
                        <svg
                          className="w-6 h-6 ml-2 transform group-open:rotate-180 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </summary>
                    <div className="space-y-4 pt-4">
                      {tavilyData.ytData?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-800/50 rounded-lg"
                        >
                          <a
                            href={item.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {item.title}
                          </a>
                          <p className="text-gray-300 mt-2">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              ) : (
                <div className="text-gray-400">Loading references...</div>
              )}
            </div>
          ) : (
            sections
              .filter(({ key }) => key === selectedSection)
              .map(({ title, prompt, key }) => (
                <div
                  key={key}
                  className="border border-gray-800 rounded-xl p-8 bg-gray-900/50 backdrop-blur"
                >
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    {title}
                  </h2>
                  <div className="mb-6">
                    {loading[key] ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#9333EA]"></div>
                        <span className="text-gray-400">
                          ✨ Generating insights...
                        </span>
                      </div>
                    ) : !responses[key] ? (
                      <button
                        onClick={() => handleApiCall(prompt as string, key)}
                        className="bg-[#9333EA] hover:bg-[#7928CA] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        Generate Insights
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : null}
                  </div>
                  {responses[key] && (
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 space-y-4">
                        <Markdown>{responses[key]}</Markdown>
                      </div>
                    </div>
                  )}
                  
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
