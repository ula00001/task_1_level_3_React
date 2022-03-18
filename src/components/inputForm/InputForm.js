import './inputForm.scss'

const InputForm = (props) => {
  const { changeFilterData, instalment, stock } = props;
  const inputs = [
    {
      id: 1,
      type: "checkbox",
      // className: "checkbox-1",
      name: "instalment",
      label: "Только в рассрочку"
    },
    {
      id: 2,
      type: "checkbox",
      // className: "checkbox-2",
      name: "stock",
      label: "В наличии"
    }
  ]

  const elements = inputs.map((item, index) => {
    return (
      <div className="checkboxes" key={index}>
        <input
          className="form-check-input"
          type={item.type}
          id="flexCheckDefault"
          name={item.name}
          onChange={changeFilterData}
        />
        <label className="form-check-label ms-2" htmlFor="flexCheckDefault">
          {item.label}
        </label>

      </div>
    )
  })

    return (
      <>
        <div className="filters mt-4 mb-4">
          <h3>Фильтр</h3>
          {elements}
        </div>
      </>
    )
  }

export default InputForm;