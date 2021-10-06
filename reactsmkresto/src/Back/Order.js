import React, { useState } from "react";
import useGet from "../Hook/useGet";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import { link } from "../Axios/Link";

const ModalData = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [awal, setAwal] = useState("2021-09-10");
  const [akhir, setAkhir] = useState(today);
  const [total, setTotal] = useState(0);
  const [pelanggan, setPelanggan] = useState("");
  const [id_order, setId_order] = useState("");

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

  function cari(data) {
    setAwal(data.tawal);
    setAkhir(data.takhir);
  }

  const [isi] = useGet(`/order/${awal}/${akhir}`);

  function filterData(id) {
    const data = isi.filter((val) => val.id_order === id);
    setPelanggan(data[0].pelanggan);
    setTotal(data[0].total);
    setId_order(data[0].id_order);
    handleShow(true);
  }
  function isiForm() {
    setValue("total", total);
  }

  async function simpan(data) {
    let hasil = {
      bayar: data.bayar,
      kembali: data.bayar - data.total,
      status: data.bayar - data.total >= 0 ? 1 : 0,
    };
    const res = await link.put("/order/" + id_order, hasil);
    handleClose(true);
  }
  let no = 1;
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pembayaran Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-8">
            <form onSubmit={handleSubmit(simpan)}>
              <div className="mb-3">
                <label htmlFor="total" className="form-label">
                  Total
                </label>
                <input
                  type="number"
                  name="total"
                  value={isiForm()}
                  className="form-control"
                  placeholder="Masukan Total"
                  {...register("total", { required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bayar" className="form-label">
                  Bayar
                </label>
                <input
                  type="number"
                  name="bayar"
                  className="form-control"
                  {...register("bayar", { min: { total } })}
                />
                {errors.bayar?.type === "required" && "Pembayaran Kurang"}
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
        <h1>Data Order</h1>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit(cari)}>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="tawal" className="form-label">
                Tanggal Awal
              </label>
              <input type="date" name="tawal" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="takhir" className="form-label">
                Tanggal Akhir
              </label>
              <input type="date" name="takhir" className="form-control" />
            </div>
          </div>
          <div className="mb-3">
            <input type="submit" name="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
      <div className="row">
        <table className="table table-bordered table-hover text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Pelanggan</th>
              <th>Tanggal Order</th>
              <th>Total</th>
              <th>Bayar</th>
              <th>Sisa</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.pelanggan}</td>
                <td>{val.tgl_order}</td>
                <td>{val.total}</td>
                <td>{val.bayar}</td>
                <td>{val.kembali}</td>
                <td>
                  {val.status === 0 ? (
                    <button
                      className="nextButton btn btn-danger"
                      onClick={(handleShow, () => filterData(val.id_order))}
                    >
                      Belum Lunas
                    </button>
                  ) : (
                    <button className="btn btn-info">Lunas</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalData;
