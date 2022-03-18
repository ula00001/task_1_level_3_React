import { Component } from 'react';
import "./addForm.scss";

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      count: '',
      instalment: false,
    }
  }

  changeValue = (e) => {
    this.checkFlag = !this.state.instalment;
    // console.log(this.checkFlag);
    this.setState({
      [e.target.name]: e.target.name == 'instalment' ? this.checkFlag : e.target.value,
    })
    // console.log(this.state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.name.length < 3) return;
    // console.log('submit');
    this.props.addItem(this.state.name, this.state.price, this.state.count, this.state.instalment);
    this.setState({
      name: '',
      price: '',
      count: '',
      instalment: false,
    })
  }

  render() {
    const { name, price, count, instalment } = this.state;
    return (
    <>
      <div className="app-add-form">
        <h3>Добавить товар</h3>
        <form className="add-form" onSubmit={this.onSubmit}>
          <div className='checkbox-input d-flex flex-wrap align-items-center'>
            <input
              type="text"
              className="name form-control"
              placeholder="Название"
              name="name"
              minLength="4"
              value={name}
              onChange={this.changeValue}
            />
            <input
              type="text"
              className="price form-control"
              placeholder="Цена"
              name="price"
              value={price}
              onChange={this.changeValue}
            />
            <input
              type="text"
              className="count form-control"
              placeholder="Количество"
              name="count"
              value={count}
              onChange={this.changeValue}
            />
            <div className='checkbox-input d-flex align-items-center'>
              <input
                type="checkbox"
                className="instalment form-check-input"
                placeholder="Название"
                name="instalment"
                checked={instalment}
                onChange={this.changeValue}
              />
              <label className="form-check-label" htmlFor="instalment"> В рассрочку </label>
            </div>
            </div>
            <button className="btn btn-outline-light submit-button">Добавить</button>
          </form>

      </div>
    </>
    )
  }

};

export default AddForm;
