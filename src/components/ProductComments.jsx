import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { commentService } from '../services/CommentService';
import '../css/client/product-comments.css';

const ProductComments = ({ productId, productName }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState({
    content: '',
    rating: 5,
    isAnonymous: false
  });
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedComments, setExpandedComments] = useState(new Set());

  // Load comments
  useEffect(() => {
    loadComments();
  }, [productId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const response = await commentService.getCommentsByProduct(productId, 0, 20, true);
      setComments(response.data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để bình luận');
      return;
    }

    if (!newComment.content.trim()) {
      alert('Vui lòng nhập nội dung bình luận');
      return;
    }

    try {
      setSubmitting(true);
      await commentService.createComment({
        productId,
        userId: user.id,
        content: newComment.content,
        rating: newComment.rating,
        isAnonymous: newComment.isAnonymous
      });

      setNewComment({ content: '', rating: 5, isAnonymous: false });
      loadComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Có lỗi xảy ra khi gửi bình luận');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentCommentId) => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để trả lời');
      return;
    }

    if (!replyContent.trim()) {
      alert('Vui lòng nhập nội dung trả lời');
      return;
    }

    try {
      setSubmitting(true);
      await commentService.createComment({
        productId,
        userId: user.id,
        content: replyContent,
        parentCommentId: parentCommentId,
        isAnonymous: false
      });

      setReplyContent('');
      setShowReplyForm(null);
      loadComments();
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('Có lỗi xảy ra khi gửi trả lời');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleCommentExpansion = (commentId) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : 'empty'}`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderComment = (comment, isReply = false) => {
    const isExpanded = expandedComments.has(comment.id);
    const shouldTruncate = comment.content.length > 200 && !isExpanded;

    return (
      <div key={comment.id} className={`comment-item ${isReply ? 'reply' : ''}`}>
        <div className="comment-header">
          <div className="commenter-info">
            <div className="commenter-avatar">
              {comment.isAnonymous ? '👤' : comment.userName?.charAt(0) || 'U'}
            </div>
            <div className="commenter-details">
              <span className="commenter-name">
                {comment.isAnonymous ? 'Khách hàng ẩn danh' : comment.userName || 'Người dùng'}
              </span>
              <span className="comment-date">{formatDate(comment.createdAt)}</span>
            </div>
          </div>
          {comment.rating && (
            <div className="comment-rating">
              {renderStars(comment.rating)}
            </div>
          )}
        </div>

        <div className="comment-content">
          <p>
            {shouldTruncate ? comment.content.substring(0, 200) + '...' : comment.content}
            {shouldTruncate && (
              <button
                className="expand-btn"
                onClick={() => toggleCommentExpansion(comment.id)}
              >
                Xem thêm
              </button>
            )}
            {isExpanded && comment.content.length > 200 && (
              <button
                className="expand-btn"
                onClick={() => toggleCommentExpansion(comment.id)}
              >
                Thu gọn
              </button>
            )}
          </p>
        </div>

        {comment.hasAdminResponse && (
          <div className="admin-response">
            <div className="admin-response-header">
              <span className="admin-badge">👨‍💼 Phản hồi từ admin</span>
              <span className="admin-response-date">{formatDate(comment.adminResponseAt)}</span>
            </div>
            <div className="admin-response-content">
              {comment.adminResponse}
            </div>
          </div>
        )}

        {!isReply && (
          <div className="comment-actions">
            <button
              className="reply-btn"
              onClick={() => setShowReplyForm(comment.id)}
            >
              Trả lời
            </button>
          </div>
        )}

        {showReplyForm === comment.id && (
          <div className="reply-form">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Viết trả lời của bạn..."
              rows="3"
            />
            <div className="reply-actions">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSubmitReply(comment.id)}
                disabled={submitting}
              >
                {submitting ? 'Đang gửi...' : 'Gửi trả lời'}
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setShowReplyForm(null);
                  setReplyContent('');
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {comment.replies.map(reply => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="product-comments">
        <div className="comments-loading">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p>Đang tải bình luận...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-comments">
      <div className="comments-header">
        <h3>Đánh giá và bình luận</h3>
        <div className="comments-stats">
          <span className="total-comments">
            {comments.length} bình luận
          </span>
        </div>
      </div>

      {/* Comment Form */}
      {isAuthenticated ? (
        <div className="comment-form">
          <h4>Viết đánh giá của bạn</h4>
          <form onSubmit={handleSubmitComment}>
            <div className="rating-input">
              <label>Đánh giá:</label>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`star-input ${star <= newComment.rating ? 'active' : ''}`}
                    onClick={() => setNewComment({...newComment, rating: star})}
                  >
                    ★
                  </span>
                ))}
                <span className="rating-text">
                  {newComment.rating === 5 ? 'Tuyệt vời' :
                   newComment.rating === 4 ? 'Rất tốt' :
                   newComment.rating === 3 ? 'Tốt' :
                   newComment.rating === 2 ? 'Trung bình' : 'Kém'}
                </span>
              </div>
            </div>

            <div className="comment-textarea">
              <textarea
                value={newComment.content}
                onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                rows="4"
                maxLength="1000"
              />
              <div className="char-count">
                {newComment.content.length}/1000 ký tự
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newComment.isAnonymous}
                  onChange={(e) => setNewComment({...newComment, isAnonymous: e.target.checked})}
                />
                <span>Bình luận ẩn danh</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={submitting || !newComment.content.trim()}
            >
              {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
          </form>
        </div>
      ) : (
        <div className="login-prompt">
          <p>Vui lòng <a href="/login">đăng nhập</a> để viết đánh giá</p>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>Chưa có bình luận nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
          </div>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
};

export default ProductComments;
