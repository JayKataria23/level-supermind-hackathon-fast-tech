import { YoutubeTranscript } from "youtube-transcript";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { searchQuery } = await req.json();
  async function fetchYouTubeData(videoUrl) {
    let transcript = "";
    try {
      const transcriptData = await YoutubeTranscript.fetchTranscript(videoUrl);
      transcript = transcriptData.map((item) => item.text).join(" ");
    } catch (error) {
      console.log(`Transcript unavailable for ${videoUrl}: ${error.message}`);
      transcript = "Transcript unavailable for this video";
    }

    // Initialize an object to hold the data
    const data = {
      transcript: transcript,
      viewCount: null,
      likesCount: null,
    };

    // Fetch the YouTube page to get the view count and likes
    const response = await fetch(videoUrl);
    const html = await response.text();

    const viewCountMatch = html.match(/"viewCount":"(\d+)"/);
    const likesMatch = html.match(
      /like this video along with ([\d,]+) other people/
    );

    if (viewCountMatch) {
      data.viewCount = viewCountMatch[1];
    }

    if (likesMatch) {
      data.likesCount = likesMatch[1].replace(/,/g, ""); // Remove commas from the likes count
    }

    // Return the collected data
    return data;
  }

  // Use Tavily to scrape YouTube video links based on the search query
  const videoLinks = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: "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",
      query: searchQuery,
      max_results: 10,
      include_domains: ["youtube.com"],
    }),
  }).then((response) => response.json()); // Updated to use fetch with the new API link

  const results = await Promise.all(
    videoLinks.results.map(async (videoUrl) => {
      const videoData = await fetchYouTubeData(videoUrl.url);
      return {
        videoUrl: videoUrl.url,
        title: videoUrl.title,
        description: videoUrl.content,
        ...videoData,
      };
    })
  );
    
  return NextResponse.json(results);
}
