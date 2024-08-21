import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  transform: 'translateY(-150px)',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const UserDetails = styled.div(()=>({
  display: 'flex',
  alignItems:'center',
  // justifyContent: 'center',
  gap:'10px',
  margin:'10px',

  '& > p' : {
       color:'green'
  }
}))

const Logo = styled.div(()=>({
  width:'50px',
  aspectRatio:'1',
  borderRadius: '100px',
  color:'white',
  fontWeight:'bolder',
  background: 'grey',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
  
}))
const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  console.log(post)
  const [first, last] = post.name.split(" ");
  return (
    <PostContainer>
      <UserDetails>
        <Logo>
          <p>{first[0]}{last[0]}</p>
        </Logo>
        <div>
          <h4>{post.name}</h4>
          <p style={{fontSize:'12px'}}>{post.email}</p>
        </div>
      </UserDetails>
      <CarouselContainer>
            <Carousel ref={carouselRef}>
              {post.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image src={image.url} alt={post.title} />
                </CarouselItem>
              ))}
            </Carousel>
            <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
            <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
