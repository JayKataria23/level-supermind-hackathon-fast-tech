import { NextResponse } from "next/server";
import { DataAPIClient } from "@datastax/astra-db-ts";

const client = new DataAPIClient({ logging: "all" });
const db = client.db(process.env.CLIENT_DB_URL, {
  token: process.env.CLIENT_DB_TOKEN,
});

export async function POST(req) {
  const colls = await db.listCollections();
  console.log("Connected to AstraDB:", colls);
  const { searchQuery } = await req.json();

  // Use Tavily to scrape YouTube video links based on the search query
  const redditLinks = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: "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",
      query: searchQuery,
      max_results: 10,
      include_domains: ["reddit.com"],
    }),
  }).then((response) => response.json()); // Updated to use fetch with the new API link
  const results = redditLinks.results;
  console.log(results);
  try {
    const collection = await db.collection("competition_reddit");
    await collection.deleteMany();
    await collection.insertMany(results);
  } catch (error) {
    console.error("Error uploading data to Astra DB:", error);
  }

  return NextResponse.json(results);
}
