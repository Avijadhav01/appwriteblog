import { useEffect } from 'react';
import appwriteService from '../../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage }) {
  const imageUrl = featuredimage
    ? appwriteService.getFileView(featuredimage)
    : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
