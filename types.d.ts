export interface Video {
  _id: string;
  caption: string;
  topic: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  userId: string;
  postedBy: {
    _id: string;
    username: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      username: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _id: string;
      username: string;
      image: string;
    };
  }[];
}

export interface User {
  image: string;
  username: string;
  _id: string;
  _type: string;
}
