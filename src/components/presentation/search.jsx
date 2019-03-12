import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.filterListHandler = this.filterListHandler.bind(this);
    this.state = {
      filteredList: [],
      filterString: ''
    };
  }

  filterListHandler (e) {
    const value = e.target.value;
    const { subreddits } = this.props;
    const filteredList = this.filterList({value, list: subreddits})
    this.setState({filteredList, filterString: value});
  }

  filterList (data) {
    const { list, value } = data;
    
    return list.filter(item => {
      if (item.includes(value)) {
        return item;
      }
    })
  }

  getMappedList() {
    const { filteredList } = this.state;
    const { filterString } = this.state;  
    const { subreddits } = this.props;
    const list = filterString ? filteredList : subreddits;

    return list.map(item => {
      const handleClick = (data) => {
        this.props.onClick(data);
      }
      
      return (
        <p
          className="list-title"
          key={item}
          value={item}
          onClick={() => handleClick(item)}
        >
          {item}
        </p>
      );
    });
  }

  render() {
    const mappedList = this.getMappedList();

    return (
      <div>
        <h3 className="search-title">Please select a subreddit from below:</h3>
        <p class="search-sub-title">filter with search</p>
        <input
          className="search-field"
          onChange={this.filterListHandler}
          placeholder="Search..."
        />
        <ul>{mappedList}</ul>
      </div>
    );
  }
}

export default Search;
