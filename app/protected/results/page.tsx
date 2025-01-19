"use client";
import { useEffect, useState } from "react";

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
      const formattedResponse = data
        .split("\n")
        .map((line: string) => {
          if (line.startsWith("- ")) {
            return `<li>${line.substring(2)}</li>`;
          }
          if (line.startsWith("# ")) {
            return `<h1>${line.substring(2)}</h1>`;
          }
          if (line.startsWith("## ")) {
            return `<h2>${line.substring(3)}</h2>`;
          }
          return `<p>${line}</p>`;
        })
        .join("");

      setResponses((prev) => ({
        ...prev,
        [key]: `<div class="space-y-4">${formattedResponse}</div>`,
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

  const sections = [
    { title: "Pain Points", prompt: painPoints, key: "painPoints" },
    { title: "Triggers", prompt: triggers, key: "triggers" },
    { title: "Best Hooks", prompt: bestHooks, key: "bestHooks" },
    {
      title: "Best Call to Actions",
      prompt: bestCallToActions,
      key: "bestCallToActions",
    },
    {
      title: "Ad Campaign Ideas",
      prompt: adCampaignIdeas,
      key: "adCampaignIdeas",
    },
    { title: "Sentiments", prompt: sentiments, key: "sentiments" },
    { title: "Keywords", prompt: keywords, key: "keywords" },
    { title: "Target Market", prompt: targetMarket, key: "targetMarket" },
  ];

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading company data...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-100 p-4 border-r min-h-screen">
        {sections.map(({ title, key }) => (
          <div
            key={key}
            onClick={() => setSelectedSection(key)}
            className={`p-3 cursor-pointer rounded-lg mb-2 ${
              selectedSection === key
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <span className="flex items-center">
              {title}
              {responses[key] && (
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {sections
            .filter(({ key }) => key === selectedSection)
            .map(({ title, prompt, key }) => (
              <div
                key={key}
                className="border rounded-lg p-6 bg-white shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="mb-6">
                  {loading[key] ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      <span className="text-gray-600">
                        Generating response...
                      </span>
                    </div>
                  ) : !responses[key] ? (
                    <button
                      onClick={() => handleApiCall(prompt, key)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Generate
                    </button>
                  ) : null}
                </div>
                {responses[key] && (
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: responses[key] }} />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
