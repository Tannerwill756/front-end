import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchPosts,
  addPost,
  updatePost,
  removePost,
  fetchComments,
  addComment,
  deleteComment,
} from "../store/actions/PostActions";
import { useHistory } from "react-router-dom";

const Posts = (props) => {
  const getPosts = props.fetchPosts;

  const getComments = props.fetchComments;

  useEffect(() => {
    getPosts();
    getComments();
  }, [getPosts, getComments]);

  const [commentInput, setCommentInput] = useState("");

  // const [commentInput2, setCommentInput2] = useState("");

  const { push } = useHistory();

  const handlecomment = (e, id) => {
    console.log("current target:", e);
    // console.log(`comment${id}`);
    // if (e.target.id !== `comment${id}`) {
    //   setCommentInput2(e.target.value);
    // } else {
    // }
    setCommentInput(e.target.value);

    // console.log(e.currentTarget);
    // console.log(id);
    // setCommentInput(e.target.value);
  };

  const addComments = (postId) => {
    const comment = {
      comment: commentInput,
      postId: postId,
      userId: localStorage.getItem("userId"),
    };
    props.addComment(comment);
    setCommentInput("");
  };

  const handleD = (id) => {
    props.deleteComment(id);
  };

  // console.log("commments!!!!!!!!!!!!!!", props.comments);
  return (
    <div className="posts-container">
      <h1>Posts</h1>
      <div>
        {props.post.map((post) => (
          <div className="post" key={post.id}>
            <img src={`${post.post}`} className="photo" alt="newPhoto"></img>

            <p className="caption">{post.caption}</p>

            {post.userId === Number(localStorage.getItem("userId")) && (
              <div>
                <button onClick={() => push(`/api/posts/${post.id}`)}>
                  Edit
                </button>
                <button onClick={() => props.removePost(post.id)}>
                  Delete
                </button>
              </div>
            )}
            <div className="comments">
              {props.comments.map((comment) => (
                <div key={comment.id}>
                  {comment.postId === post.id && (
                    <div>
                      <div className="inline">{comment.comment}</div>
                      {comment.userId ===
                        Number(localStorage.getItem("userId")) && (
                        <button
                          className="inline"
                          onClick={() => handleD(comment.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="addComment">
              <form>
                <label htmlFor={`comment${post.id}`} />
                <input
                  type="text"
                  id={`comment${post.id}`}
                  name={`comment${post.id}`}
                  value={commentInput}
                  onChange={(e) => handlecomment(e, post.id)}
                />
              </form>
              <button
                onClick={() => {
                  addComments(post.id);
                }}
              >
                add comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state.post);
  return {
    post: state.PostReducer.post,
    error: state.PostReducer.error,
    comments: state.PostReducer.comments,
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
  addPost,
  updatePost,
  removePost,
  fetchComments,
  addComment,
  deleteComment,
})(Posts);
