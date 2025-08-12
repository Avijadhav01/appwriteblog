import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../Components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate('/');

        setLoading(false);
      });
    } else {
      navigate('/');
      setLoading(false);
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-12 text-center text-lg font-medium text-gray-600">
        Loading post for editing...
      </div>
    );
  }

  return post ? (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Post</h1>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
