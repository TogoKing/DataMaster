import { useState } from 'react';
import { Star, User, MessageCircle, Send } from 'lucide-react';

const CommentsSection = ({ courseId, comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  // Get average rating
  const averageRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);

    // Simulate adding a comment (replace with Supabase integration)
    const comment = {
      id: Date.now(),
      content: newComment,
      rating,
      user_name: 'Anonyme',
      created_at: new Date().toISOString()
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setRating(5);
    setLoading(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <MessageCircle className="w-6 h-6 text-primary-600" />
        <span>Avis et Commentaires</span>
      </h3>

      {/* Rating Summary */}
      <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
          <div className="flex items-center space-x-1 mt-1">
            {renderStars(Math.round(averageRating))}
          </div>
          <div className="text-sm text-gray-500 mt-1">{comments.length} avis</div>
        </div>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border border-gray-200 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre note
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre commentaire
          </label>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="input-field resize-none"
            placeholder="Partagez votre expérience..."
          />
        </div>
        <button
          type="submit"
          disabled={loading || !newComment.trim()}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Envoi...' : 'Publier'}</span>
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{comment.user_name}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(comment.rating)}
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucun commentaire pour le moment</p>
            <p className="text-sm">Soyez le premier à partager votre expérience!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
