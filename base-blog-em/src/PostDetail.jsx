import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const {data, isLoading, isError} = useQuery(['comments',post.id], ()=>fetchComments(post.id));
  
  const deleteMutation = useMutation((postId) => deletePost(postId));
  
  const updateMutation = useMutation( (postId) => updatePost(postId) );

  if(isLoading) return <div>Loading...</div>;
  if(isError) return <div>Error!</div>;
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={()=> deleteMutation.mutate(post.id)}>Delete</button> 
      {deleteMutation.isError && ( <p> Error deleting the post</p> )}
      {deleteMutation.isLoading && ( <p> Deleting Post</p> )}
      {deleteMutation.isSuccess && ( <p> Post has been delete Post</p> )}

      <button onClick={()=>{updateMutation.mutate(post.id)}}>Update title</button>
      {updateMutation.isError && ( <p> Error!</p> )}
      {updateMutation.isLoading && ( <p> Loading..</p> )}
      {updateMutation.isSuccess && ( <p> Success!</p> )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
