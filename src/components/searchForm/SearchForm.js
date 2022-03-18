import { Component } from 'react';
import "./searchForm.scss";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        term: ''
    }
  }

    searchItem = (e) => {
      const term = e.target.value;
      this.setState({term});
      this.props.searchItem(term)
    }

    render() {
      return (
        <input
          type="text"
          className="form-control search-input mb-4"
          placeholder="Поиск"
          value={this.state.term}
          onChange={this.searchItem}
        />
      )
  }
}

export default SearchForm;