import React, { useState } from "react";
import useGet from "../Hook/useGet";
import { useForm } from "react-hook-form";
import Modal from "react-modal";


Modal.setAppElement("#root");
const Order = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [mopen, setMopen] = useState(false);
  // console.log(today);
  const [awal, setAwal] = useState("2021-09-10");
  const [akhir, setAkhir] = useState(today);

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

  let no = 1;
  return (
    <div>
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
        <table className="table mt-4 text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Pelanggan</th>
              <th>Tanggal Order</th>
              <th>Total</th>
              <th>Bayar</th>
              <th>Kembali</th>
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
                      className="btn btn-danger"
                      onClick={() => setMopen(true)}
                    >
                      Belum Bayar
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
      <div>
        <Modal
          isOpen={mopen}
          onRequestClose={() => setMopen(false)}
          style={{
            overlay: {
              background: "transparent ! important",
            },
            content: {
              top: "20%",
              left: "55%",
              bottom: "auto",
              width: "40%",
            },
          }}
        >
          <div className="row">
            <h2>Pembayaran</h2>
          </div>
          <div className="col-4">
            <form>
              <div className="mb-3">
                <label htmlFor="total" className="form-label">
                  Total
                </label>
                <input
                  type="number"
                  name="total"
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
                  placeholder="Masukan Bayar"
                  {...register("bayar", { required: true })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
          <button className="btn btn-success" onClick={() => setMopen(false)}>
            Tutup
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Order;
