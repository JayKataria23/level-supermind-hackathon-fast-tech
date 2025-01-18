// pages/api/youtube-data.js
import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export async function POST(req) {
  const { videoUrl } = await req.json();

  // New function to fetch YouTube data
  async function fetchYouTubeData(videoUrl) {
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    const formattedText = transcript.map((item) => item.text).join(" ");

    // Initialize an object to hold the data
    const data = {
      transcript: formattedText,
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

  // Call the new function with the videoUrl and await the result
  const result = await fetchYouTubeData(videoUrl);

  // Return the result as a JSON response
  return NextResponse.json(result);
}
