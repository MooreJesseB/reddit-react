import React, { Component } from "react";
import SearchPres from "../presentation/search.jsx";
import Post from "../presentation/post.jsx"
import env from "../../environment.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSubredditClick = this.handleSubredditClick.bind(this);
    this.state = {
      search: true,
      subreddits: [],
      subreddit: null,
      posts: []
    };
  }

  componentDidMount () {
    const url = `${env.rootURL}/reddits${env.tailURL}`
    this.getJson({url, subreddit: null})
  }

  getJson (options) {
    const { url, subreddit } = options;
    this.setState({ subreddit })
    fetch(url)
    .then(response  => {
      return response.json();
    })
    .then(myJson => {
      if (subreddit) {
        this.setPosts(myJson.data);
        this.setState({subreddit});
      } else {
        this.setSubreddits(myJson.data);
        this.setState({subreddit: null});
      }
    });
  }

  setSubreddits (data) {
    const { children } = data;
    const mappedSubreddits = children.map(item => {
      const { data } = item;
      return data.url;
    })
    this.setState({subreddits: mappedSubreddits})
  }

  setPosts(data) {
    const { children } = data
    /*
      Reddit returns a maximum of exactly 25 posts. 
      In a larger application I would check if this were true.
    */
    const mappedPosts = children.map(item => {
      const { data } = item;
      let image = null;
      if (data.preview) {
        image = data.preview.images[0].source.url.replace(new RegExp(/(&amp;)/gi), '&')
      }
      return {
        id: data.id,
        title: data.title,
        postUrl: data.url,
        comments: `${env.rootURL}${data.permalink}`,
        author: `u/${data.author}`,
        timestamp: data.created_utc,
        subreddit: data.subreddit_name_prefixed,
        image
      }
    })
    this.setState({posts: mappedPosts})
  }

  handleSubredditClick (data) {
    const url = `${env.rootURL}${data}${env.tailURL}`;
    this.getJson({ url, subreddit: data });
  }

  render() {
    let posts = [];
    let postsContainer = '';
    if (this.state.posts.length) {
      posts = this.state.posts.map(item => {
        return <Post key={item.id} data={item} />
      })
    }

    if (posts.length) {
      postsContainer = <ul className="post-list">{posts}</ul>
    }
    
    return (
      <div className="container">
        <div className="search">
          <SearchPres 
            subreddits={this.state.subreddits} 
            onClick={this.handleSubredditClick}
          />
        </div>
        {postsContainer}
      </div>
    );
  }
}

export default Index;