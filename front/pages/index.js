import React, { useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";
// import { connect } from "react-redux";

// const Home = ({ user, dispatch, login, logout }) => {
const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return <PostCard key={c.createdAt.valueOf()} post={c} />;
      })}
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     user: state.user,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     login: () => dispatch(loginAction),
//     logout: () => dispatch(logoutAction),
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.getInitialProps = async (context) => {
  // console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};
export default Home;
