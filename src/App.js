import './App.scss';
import { Component } from "react";
import Table from "./components/Table";
import AddForm from "./components/addForm/AddForm";
import SearchForm from "./components/searchForm/SearchForm";
import InputForm from "./components/inputForm/InputForm";

let flag = true;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, name: 'Чехол OEM 11199 для iPhone 11 черный', price: '1200 ₸', count: 120, instalment: true },
        { id: 2, name: 'Чехол Samsung Smart S View Wallet Cover EF-EA562 Зеленый', price: '17990 ₸', count: 33, instalment: false },
        { id: 3, name: 'Samsung EF-JS906CTEGRU для Samsung Galaxy S22 Черный', price: '13990 ₸', count: 0, instalment: false },
        { id: 4, name: 'Veles для iPhone 13 Pro Max прозрачный', price: '790 ₸', count: 3, instalment: true },
        { id: 5, name: 'OEM для Apple iPhone 11 прозрачный', price: '790 ₸', count: 20, instalment: true },
        { id: 6, name: 'OEM 11199 для iPhone 11 черный', price: '1200 ₸', count: 55, instalment: false },
        { id: 7, name: 'Чехол Apple MM2Y3ZM MagSafe для Apple iPhone 12 Pro', price: '36760 ₸', count: 100, instalment: false },
      ],
      term: "",
      filterText: "",
      instalment: false,
      stock: false,
    }
    // this.sortFlag = false;
  }

  deleteItem = (id) => {
    // console.log(id);
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
    // console.log(this.state.data);
  };

  addItem = (name, price, count, instalment) => {
    const obj = {
      id: Date.now(),
      name: name,
      price: price + '₸',
      count: count,
      instalment: instalment,
    }

    this.setState(({ data }) => {
      return {
        data: [...data, obj]
      }
    })
  }

  saveItem = (itemData) => {
    // console.log(itemData);
    const newData = this.state.data.map((item) => {
      if (item.id == itemData.id) {
        item = itemData;
        return item;
      }
      return item;
    })
    this.setState( {
        data: newData
    })
  }

  searchItem = (term) => {
    this.setState({term});
  }

  compareBy(key) {
    return function (a, b) {
      if (key == 'price') {
        return parseInt((a[key]).split(" ").join("")) - parseInt((b[key]).split(" ").join(""));
      } else if (key == 'count') {
        return a[key] - b[key];
      } else if (key == 'name') {
         if (a[key] > b[key]) {
          return -1;
        }
        if (b[key] > a[key]) {
          return 1;
        }
      }
    };
  }

  sortBy = (key) => {
    // this.sortFlag = !this.sortFlag;
    let arrayCopy = [...this.state.data];
    if (flag) {
      flag = false;
      arrayCopy.sort(this.compareBy(key));
    } else {
      flag = true;
      arrayCopy.sort(this.compareBy(key)).reverse();
    }
    this.setState({data: arrayCopy});
  }

  changeFilterData = (e) => {
    const { name } = e.target;
    if (name == "instalment") {
       this.setState({ instalment: !this.state.instalment});
    }
    else {
      this.setState({ stock: !this.state.stock});
    }
  }

  filterTable = (items, instalment, stock) => {
    let result = items
    if (instalment) {
      result = items.filter((item) => item.instalment)
    }
    if (stock) {
      if (instalment) {
        result = result.filter((item) => item.count > 0)
      } else result = items.filter((item) => item.count > 0)
    }
    return result
  };

  searchInTable = (items, term) => {
    if (!term.length) {
      return items;
    }

    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };


  render() {
    const { data, term , filterText, instalment, stock, sortFlag} = this.state;
    const vsisbleData = this.filterTable(
      this.searchInTable(data, term),
      instalment, stock
    );
    return (
      <div className="container">
        <AddForm addItem={this.addItem} />
        <div className="search-panel mb-5">
          <InputForm
            changeFilterData={this.changeFilterData}
          />
          <SearchForm searchItem={this.searchItem} />
        </div>

        <Table
          data={vsisbleData}
          sortBy={this.sortBy}
          // sortFlag={this.sortFlag}
          instalment={instalment}
          stock={stock}
          deleteItem={this.deleteItem}
          saveItem={this.saveItem}
        />
      </div>
    )
  }

}

export default App;
