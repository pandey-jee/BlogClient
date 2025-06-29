import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Calendar, User, Edit, Trash2, ArrowLeft } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getPost(id);
      setPost(response.data);
    } catch (error) {
      toast.error('Failed to fetch post');
      console.error('Error fetching post:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(id);
        toast.success('Post deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && user.id === post.author_id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to posts</span>
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 sm:px-6 py-6 sm:py-8">
            <header className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-words">
                {post.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 gap-2 sm:gap-0 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{post.author_name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{formatDate(post.created_at)}</span>
                  </div>
                  
                  {post.updated_at !== post.created_at && (
                    <div className="text-gray-400 text-xs sm:text-sm">
                      Updated: {formatDate(post.updated_at)}
                    </div>
                  )}
                </div>

                {isAuthor && (
                  <div className="flex items-center gap-2 sm:space-x-2">
                    <Link
                      to={`/edit/${post.id}`}
                      className="inline-flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                    
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </header>

            <div className="prose prose-sm sm:prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-gray-700 leading-relaxed break-words"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
