import React, { useState } from "react";
import { link } from "../Axios/Link";
import useGet from "../Hook/useGet";

const Detail = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [awal, setAwal] = useState("2021-09-10");
  const [akhir, setAkhir] = useState(today);

  const [isi] = useGet(`/detail/${awal}/${akhir}`);
  let no = 1;
  return (
    <div>
      <div className="row">
        <h1>Detail Order</h1>
      </div>
      <div className="row">
        <table className="table table-bordered table-hover text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Faktur</th>
              <th>Pelanggan</th>
              <th>Tgl Order</th>
              <th>Menu</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.id_order}</td>
                <td>{val.pelanggan}</td>
                <td>{val.tgl_order}</td>
                <td>{val.menu}</td>
                <td>{val.harga_jual}</td>
                <td>{val.jumlah}</td>
                <td>{val.harga_jual * val.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Detail;
