import React from "react";
import "./Tasks.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Tasks = () => {
  let [contents, setContents] = useState([]);
  let [contentss, setContent] = useState([]);
  let [date, setDate] = useState([]);
  let [status, setStatus] = useState([]);
  let [name, setName] = useState([]);

  const [editIndex, setEditIndex] = useState(-1);

  // Hàm để lưu chỉnh sửa khi nhấn nút comfirm
  const handleUpdate = async (index) => {
    const newContents = [...contents];
    const task = newContents[index];
    task.Content = contentss;
    task.DateT = date;
    task.StatusA = status;
    task.NameTo = name;
    setContents(newContents);
    setEditIndex(-1);

    // PUT để lưu giá trị mới lên database
    try {
      await axios.put(
        `http://localhost:8001/api/v1/tasks/${task.TastId}`,
        task
      );
      console.log("Update success");
    } catch (error) {
      console.error("Update error", error);
    }
  };

  // Hàm hiển thị nút Confirm hoặc Update
  const renderAction = (index) => {
    if (editIndex === index) {
      return (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleUpdate(index)}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setEditIndex(-1)}
          >
            Cancel
          </button>
        </>
      );
    } else {
      return (
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setEditIndex(index)}
          >
            Update
          </button>
        </div>
      );
    }
  };

  //   Hàm gọi từ database về để render
  const loadData = async () => {
    await axios
      .get("http://localhost:8001/api/v1/tasks")
      .then((res) => {
        setContents(res.data.tasks);
      })
      .catch((err) => console.log(err));
  };
  console.log(contents);
  useEffect(() => {
    loadData();
  }, []);

  //   Hàm thêm
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8001/api/v1/tasks", {
        Content: contentss,
        DateT: date,
        StatusA: status,
        NameTo: name,
      });
      const newNote = response.data;
      setContents([...contents, newNote]);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  //   Hàm Xóa
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/v1/tasks/${id}`);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Learning
          </span>
          <input
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Learning"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Date
          </span>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div class="input-group mb-3 a123">
          <select
            class="form-select"
            id="inputGroupSelect01"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option selected>Active</option>
            <option value={"Pending"}>Pending</option>
            <option value={"Fulfill"}>Fulfill</option>
            <option value={"Reject"}>Reject</option>
          </select>
        </div>
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Name
          </span>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="table1">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Content</th>
              <th scope="col">Due date</th>
              <th scope="col">Status</th>
              <th scope="col">Asigned To</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((content, index) => {
              const dueDate = new Date(content.DateT);
              return (
                <tr key={content.TastId} className="table3">
                  <th scope="row">{index + 1}</th>
                  {/* <td>
                    <input type="text" defaultValue={content.Content} />
                  </td>
                  <td>{dueDate.toLocaleDateString("en-GB")}</td>
                  <td>
                    {" "}
                    <input type="text" defaultValue={content.StatusA} />
                  </td>
                  <td>
                    <input type="text" defaultValue={content.NameTo} />
                  </td>
                  <td>
                    <button type="button" class="btn btn-success">
                      Update
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => handleDelete(content.TastId)}
                    >
                      Delete
                    </button>
                  </td> */}
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={contentss}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    ) : (
                      content.Content
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    ) : (
                      dueDate.toLocaleDateString("en-GB")
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option selected>Active</option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Fulfill"}>Fulfill</option>
                        <option value={"Reject"}>Reject</option>
                      </select>
                    ) : (
                      content.StatusA
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      content.NameTo
                    )}
                  </td>
                  <td>{renderAction(index)} </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => handleDelete(content.TastId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
