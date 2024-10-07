import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Post from '@/lib/models/Post';

// GET request handler
export async function GET(request) {
  try {
    await connect();
    const posts = await Post.find({});
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}



export const POST = async (req) => {
    try {
      await connect(); // Ensure MongoDB is connected
  
      const { title, content, author } = await req.json(); // Get data from the request body
  
      // Validate that the required fields are present
      if (!title || !content || !author) {
        return new NextResponse(
          JSON.stringify({ message: "All fields are required" }),
          { status: 400 }
        );
      }
  
      // Create a new post
      const newPost = new Post({
        title,
        content,
        author,
      });
  
      // Save the post to the database
      await newPost.save();
  
      // Return a success response
      return new NextResponse(
        JSON.stringify({ message: "Post created successfully", post: newPost }),
        { status: 201 }
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Error creating post", error: error.message }),
        { status: 500 }
      );
    }
  };
  