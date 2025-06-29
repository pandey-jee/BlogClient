import { Link } from 'react-router-dom';
import { Calendar, User, Eye } from 'lucide-react';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-4 sm:p-6">
        <Link to={`/post/${post.id}`}>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
          {post.excerpt}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-gray-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2 sm:gap-0">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{post.author_name}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
          
          <Link
            to={`/post/${post.id}`}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors self-start sm:self-auto"
          >
            <Eye className="h-4 w-4 flex-shrink-0" />
            <span>Read more</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
