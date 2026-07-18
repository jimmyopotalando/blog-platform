import React from "react";

function CommentThread({ comments }) {
  // Recursive rendering for threaded replies
  const renderComments = (commentList, parentId = null) => {
    return commentList
      .filter((c) => c.parentCommentId === parentId)
      .map((comment) => (
        <div key={comment._id} className="mb-4 ml-4 border-l pl-4">
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-sm text-gray-500">
            By {comment.userId?.name || "Anonymous"} •{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </p>
          {/* Render replies */}
          {renderComments(commentList, comment._id)}
        </div>
      ));
  };

  return (
    <div>
      {comments.length === 0 ? (
        <p className="text-gray-600">No comments yet.</p>
      ) : (
        renderComments(comments)
      )}
    </div>
  );
}

export default CommentThread;
