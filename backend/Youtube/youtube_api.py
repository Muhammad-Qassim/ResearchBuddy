import os
from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi

YOUTUBE_API_KEY=os.getenv('YOUTUBE_API_KEY')



def fetch_youtube_FIVE_video(query, max_results=5):
    # Initialize the YouTube API client
    youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

    # Search for videos based on the query
    search_response = youtube.search().list(
        q=query,
        part="id,snippet",
        maxResults=max_results,
        type="video"
    ).execute()

    videos = []

    # Process the search results
    for item in search_response.get("items", []):
        video_id = item["id"]["videoId"]
        title = item["snippet"]["title"]
        description = item["snippet"]["description"]
        channel_title = item["snippet"]["channelTitle"]
        publish_time = item["snippet"]["publishedAt"]
        url = f"https://www.youtube.com/watch?v={video_id}"

        videos.append({
            "video_id": video_id,
            "title": title,
            "channel_title": channel_title,
            "publish_time": publish_time,
            "url": url,
            "description": description,
        })

    return videos


def fetch_youtube_transcript(video_id):
    try:
        # Fetch the transcript for the given video ID
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Combine the transcript segments into a single string
        full_transcript = " ".join([segment["text"] for segment in transcript])
        
        return full_transcript
    except Exception as e:
        print(f"Error fetching transcript: {e}")
        return None
    