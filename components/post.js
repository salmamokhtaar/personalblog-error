import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { id } = router.query; // Get the post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts/${id}`);
          const data = await response.json();
          setPost(data); // Set the post data
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">Published on: {new Date(post.createdAt).toDateString()}</p>
      <div className="prose">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
