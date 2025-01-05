#### 03 March 2024

#### Author: Harshal Raverkar

# Design System - Spotify App
___

#### **Objective**

In this system design interview question, we're tackling the challenge of designing Spotify! Normally, in a real interview, you'd focus on a few main things, but here, let's take a big-picture look at how we'd create such a cool system. As we go through this overview, we can dive into each part more if you'd like.

#### **Initial Phase: Base version**
#### Requirements:

Let's figure out how much space we need for all the stuff in our music app. First off, we have the songs themselves. Spotify uses things like Ogg Vorbis or AAC to play them, and if an average song is around 3MB, then for 30 million songs, we'd need 90TB of storage.

Next up, we've got data about the songs and info about the users. For each song, there's about 100 bytes of info, so for all 30 million songs, that adds up to 3GB. Now, for each user, we'd keep about 1KB of data, and if we have 500,000 users, that's 0.5GB.
So, in total, we're looking at 90TB for songs, 3GB for song info, and 0.5GB for user data.

#### **High-Level Design**

We've got our mobile app, where users do all the fun stuff like searching for songs, playing music, and making playlists. When users do something, like hitting play on a song, the app talks to our backend servers.

Before reaching those servers, though, there's a load balancer in the mix. It's like a traffic cop, spreading out the incoming requests among different web servers. This helps our app stay available and handle any issues smoothly.

#### **web servers**

Next, we've got our web servers, which are like helpers handling requests from the mobile app. So, when a user wants to play a song, these servers figure out where that song is (like in a database or storage service) and how to grab it.

Now, let's talk about where we keep all our important data.

#### **Blob Storage**

Songs Storage (Blob Storage): This is where we keep the actual song files. Think of it like a big box (or blob) for storing a bunch of songs. We use services like AWS S3, GCP, or Azure Blob Storage for this because they're great at handling lots of songs.

#### **SQL Database**

Data about Users, Artists, and Songs (SQL Database): Here's where we store the nitty-gritty details. We use a SQL database because it's good at organizing structured info, like user stuff (usernames, passwords) and details about songs (names, artists, albums). SQL databases are cool for handling complex queries and connections between different types of data.

And just to keep things neat, each song's actual file lives in the blob storage, and the SQL database keeps a little note about where to find it, like a URL.

Talking about the SQL database, we set it up with different tables and relationships to keep everything in order. For starters, we have a Users Table with things like UserID, Username, Email, PasswordHash, CreatedAt, LastLogin, and more."

#### **Song Metadata anns User Metadata**

The Songs Table will hold the song metadata information, such as the SongID, Title, ArtistID, Duration, ReleaseDate, and FileURL, which is the URL to the location where the song file is stored (e.g., in a blob storage).

Artists Table will contain artist information — ArtistID, Name, Bio, Country, etc.

#### **Relationships**

We will join the Artists and Songs Tables in ArtistsSongs Table, where we will have the ArtistID (Foreign key pointing to the Artists Table) and SongID (Foreign key pointing to the Songs Table). From there, we can get the song metadata, which will also contain the FileURL property, pointing to the Blob storage where the song is located.

#### **Putting it all together**

So, the web server will get the song metadata from the SQL database, and from the song metadata, it will get the fileURL, which will then be streamed from the server chunk by chunk to the mobile application. Or we can directly stream them from object storage to the client, bypassing the webserver to reduce load.

#### **Scaled phase: 50M users, 200M songs**

Now what if we scale to 50M users and 200M songs? We first need to recalculate the data. This means that the SQL data storage needs to store 200/30 = ~6.66 times more song metadata:
100 bytes per song * 200 million songs = 20GB

And the same goes for the user metadata:
/* 1KB per user * 50 million users = 50GB */


#### **CDN**

As our user base grows, we're dealing with more traffic. To handle this, we're bringing in caching and a CDN (like Cloudfront or Cloudflare) to make sure songs load super fast. Each CDN is strategically placed in different regions, so it can quickly deliver songs to users nearby, reducing waiting times.

For popular songs, we're using a smart caching policy called LRU (Least Recently Used). This means the CDN keeps the trendy songs ready to go, while the less popular ones get fetched from Blob storage and then cached.

We're also making things easier by streaming song files directly from cloud storage to the user's device. This takes some load off our web servers.

Now, our database needs to keep up too. Since more people are listening to songs than uploading them, we're using a trick called Leader-Follower. We have one main Leader database that handles both reading and writing. Then, we've got multiple Followers (or Slaves) that are read-only. This way, we can quickly fetch song and user info without putting too much pressure on one database.

#### **Advanced**

There are more advanced techniques like database sharding or the Leader ↔ Leader method, but those are pretty complex and not usually grilled in interviews.
