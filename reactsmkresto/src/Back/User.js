import React, { useState } from "react";
import useGet from "../Hook/useGet";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { link } from "../Axios/Link";
import { useForm } from "react-hook-form";

const User = () => {
  const [isi] = useGet("/user/");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  async function simpan(data) {
    let user = {
      email: data.email,
      password: data.password,
      level: data.level,
      relasi: "back",
    };
    const res = await link.post("/register", user);
    reset();
    handleClose(true);
  }
  function tambah() {
    handleShow(true);
  }
  async function status(id) {
    const data = isi.filter((val) => val.id === id);
    let stat = 0;
    if (data[0].status === 1) {
      stat = 0;
    } else {
      stat = 1;
    }

    let kirim = {
      status: stat,
    };
    const res = await link.put("/user/" + id, kirim);
  }

  let no = 1;
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Input Data User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12">
            <form onSubmit={handleSubmit(simpan)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Masukan Email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && "Email Harus Diisi"}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Masukan Password"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && "Password Harus Diisi"}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Posisi
                </label>
                <select
                  name="level"
                  className="form-control"
                  {...register("level", { required: true })}
                >
                  <option>--Pilih Posisi--</option>
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                  <option value="koki">Koki</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary mr-2"
                  value="Save"
                />
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div className="row">
        <div>
          <h1>Menu User</h1>
        </div>
      </div>
      <div className="row">
        <div>
          <input
            className="btn btn-primary mb-3"
            type="submit"
            value="Tambah"
            onClick={() => tambah()}
          />
        </div>
      </div>
      <div className="row">
        <div>
          <table className="text-center table table-hover table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isi.map((val, index) => (
                <tr key={index}>
                  <td>{no++}</td>
                  <td>{val.email}</td>
                  <td>{val.level}</td>
                  <td>
                    {val.status === 0 ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => status(val.id)}
                      >
                        Banned
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => status(val.id)}
                      >
                        Active
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
