import { Component } from 'react';
import UpdateForm from "../components/UpdateForm";
import img from "../images/no_product.png"

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalData: [],
      itemData: null,
      id: null,
      modalFlag: false,
    };
  }

  closeModal = () => {
    // console.log('closeModal');
    this.setState({
      modalData: [],
      itemData: null,
      id: null,
      modalFlag: false,
    })
  }


  updateItem(id) {
    this.modalFlag = !this.state.modalFlag;
    let data = this.props.data.find((item) => item.id == id);
    // console.log(data);
    this.setState({
      modalData: this.props.data,
      itemData: data,
      id: id,
      modalFlag: this.modalFlag,
    })

  }


  render() {

    let className = "table-rows ";
    const { data, sortBy, changeFilterData, instalment, stock, deleteItem, sortFlag, saveItem} = this.props;
    const { modalData, id, modalFlag, itemData } = this.state;
  return (
    <>
      <div className="table mb-6">
        {data.length > 0 ?
        <table>
          <tbody>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th
                onClick={() => sortBy('price')}
              >Цена {!sortFlag ? <i className="bi bi-sort-up"></i> :  <i className="bi bi-sort-down"></i> }</th>
              <th>Количество</th>
            <th>В рассрочку</th>
            <th>Действие</th>
            </tr>
            {
              data.map((item, index) => (
                <tr key={index} className={item.count < 5 && item.count != 0 ? className + ' less-row' : ''}>
                  <td> {item.id} </td>
                  <td> {item.name} </td>
                  <td> {item.price} </td>
                  <td> {item.count} </td>
                  <td> {item.instalment ? <i className="bi bi-patch-check" style={{ 'fontSize': '1.7rem',  'color': 'green'}}></i> : ''} </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm m-1"
                      onClick={() => this.updateItem(item.id)}
                    ><i className="bi bi-pencil"></i></button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={()=>deleteItem(item.id)}
                    ><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
          </table>
          : <img src={img} alt="no product" className="d-block m-auto mr-auto"/>  }
      </div>
      {
        modalFlag ? <UpdateForm
        modalData={modalData}
        itemData={itemData}
        id={id}
        modalFlag={modalFlag}
        closeModal={this.closeModal}
        saveItem={saveItem}
      /> : ''
      }


    </>
  )
    }

}

export default Table;