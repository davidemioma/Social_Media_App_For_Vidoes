import { groq } from "next-sanity";

export const postsQuery = groq`
*[_type == "post"] | order(_createdAt desc){
    _id,
    caption,
    topic,
    video{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      username,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
       _id,
        username,
        image
      },
    },
  }`;

export const postDetailQuery = (postId: string | string[]) => {
  const query = groq`*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
      topic,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      username,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;

  return query;
};

export const allUsersQuery = groq`*[_type == "user"]`;

export const userQuery = (userId: string | string[]) => {
  const query = groq`*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const userPostsQuery = (userId: string | string[]) => {
  const query = groq`*[_type == "post" && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
      topic,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      username,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
      topic,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      username,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;

  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
    caption,
     topic,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      username,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;
  return query;
};
