// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import ForumList from '../../components/ForumList/ForumList';
// import ForumDetail from '../../components/ForumDetail/ForumDetail';
// import SectionDetail from '../../components/SectionDetail/SectionDetail';
// import TopicDetail from '../../components/TopicDetail/TopicDetail';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer'

// const ForumPage = () => {
//   const { forumId, sectionId, topicId } = useParams();
  
//   if (topicId) {
//     return <TopicDetail />;
//   }
  
//   if (sectionId) {
//     return <SectionDetail />;
//   }
  
//   if (forumId) {
//     return <ForumDetail />;
//   }
  
//   return (
//     <>
//     <Header />
//     <ForumList />
//     <Footer />
//     </>
//     );
// };

// export default ForumPage;