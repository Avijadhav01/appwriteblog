import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { Container, PostCard } from "../Components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        // console.log(posts);
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts && posts.length === 0) {
    return (
      <div className="w-full py-5 bg-gray-100 min-h-[350px]">
        <Container>
          <div className="text-center py-10">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">
              {
                isLoggedIn ? "No posts available" : "Login to read posts"
              }
            </h1>
            <p className="text-lg text-gray-500">
              {
                isLoggedIn
                  ? "Start by creating your first blog post!"
                  : "Please log in to explore great content."
              }
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-5 bg-gray-100 min-h-screen">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts &&
            posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
