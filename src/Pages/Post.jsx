import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);

        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
      setLoading(false);
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-lg font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  return post ? (
    <div className="py-10 bg-gray-100 min-h-screen">
      <Container>
        <div className="w-full flex justify-center mb-8 relative rounded-xl overflow-hidden shadow-md h-72 bg-white border border-gray-300">
          {post.featuredimage ? (
            <img
              src={appwriteService.getFileView(post.featuredimage)}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-500 w-full h-full">
              No Image Available
            </div>
          )}

          {isAuthor && (
            <div className="absolute right-4 top-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="hover:bg-green-600 shadow-md rounded-md px-2 py-1"
                >
                  📝
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="hover:bg-red-600 shadow-md rounded-md px-2 py-1"
              >
                🗑️
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6 px-2 sm:px-4">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-4">
            {post.title}
          </h1>
        </div>

        <div className="browser-css px-2 sm:px-4 text-gray-700 leading-relaxed text-lg">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
