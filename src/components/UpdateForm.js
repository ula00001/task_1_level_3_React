import { Component } from 'react';

class UpdateForm extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      price: '',
      count: '',
      instalment: false,
    }
  }
  componentDidMount = () => {
    // console.log(this.props.itemData.instalment);
    this.setState({
      id: this.props.itemData.id,
      name: this.props.itemData.name,
      price: this.props.itemData.price,
      count: this.props.itemData.count,
      instalment: this.props.itemData.instalment,
    })
  }

  changeValue = (e) => {
    this.checkFlag = !this.state.instalment;
    // console.log(this.checkFlag);
    this.setState({
      [e.target.name]: e.target.name == 'instalment' ? this.checkFlag : e.target.value,
    })
    // console.log(this.state);
  }

  itemSave = () => {
    const obj = this.state;
    this.props.saveItem(obj);
    this.props.closeModal();
  }


  render() {
    const { modalData, id, modalFlag, closeModal, itemData } = this.props;
    const { name, price, count, instalment, } = this.state;
    // console.log(instalment);
    return (
    <>

        <div className={modalFlag ? 'modal fade show' : "modal fade"} aria-modal={modalFlag ? 'true' : ''} role={modalFlag ? 'dialog' : ''} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={modalFlag ? '' : "true"} style={modalFlag ? { display: 'block' } : { display: 'none' }}>

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Редактирование</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <form className="d-flex flex-column">
                 <input
                    type="text"
                    className="name"
                    placeholder="Название"
                    name="name"
                    minLength="4"
                    value={name}
                    onChange={this.changeValue}
                  />
                  <input
                    type="text"
                    className="price"
                    placeholder="Цена"
                    name="price"
                    value={price}
                    onChange={this.changeValue}
                  />
                  <input
                    type="text"
                    className="count"
                    placeholder="Количество"
                    name="count"
                    value={count}
                    onChange={this.changeValue}
                  />
                  <div className="checkbox-input">
                    <input
                      type="checkbox"
                      className="instalment"
                      placeholder="Название"
                      name="instalment"
                      checked={instalment}
                      onChange={this.changeValue}
                    />
                    <label htmlFor="instalment"> В рассрочку </label>
                  </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Закрыть</button>
              <button type="button" className="btn btn-primary" onClick={this.itemSave}>Сохранить</button>
            </div>
          </div>
        </div>
        </div>
        {
          modalFlag ? <div className="modal-backdrop fade show"></div> : ''
        }
    </>
  )
  }

}

export default UpdateForm;