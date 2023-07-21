const InputAnswer = ({
  id,
  handleChangeInput,
  handleDeleteInput,
  errors,
  length,
}) => {
  return (
    <div className="col-6 d-flex">
      <div className="col-10 me-3">
        <div className="form-floating mb-3">
          <input
            onChange={(e) => {
              handleChangeInput(id, e.target.value);
            }}
            className="form-control"
            id="floatingInput"
          />
          <label htmlFor="floatingInput">Đáp án {id}</label>
        </div>
        <span>{errors[`answer${id}`]}</span>
      </div>

      <div className="col-1">
        <button
          type="button"
          className="btn btn-danger"
          hidden={id < 3 || id !== length}
          onClick={(e) => handleDeleteInput(id)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default InputAnswer;
