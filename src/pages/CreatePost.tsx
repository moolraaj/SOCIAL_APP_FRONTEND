import PostForm from '../components/PostForm';

interface Props {
  onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: Props) => {
  return <PostForm onPostCreated={onPostCreated} />;
};
export default CreatePost;
