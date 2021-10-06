import React from "react";
import { Table } from "react-bootstrap";
import useGet from "../Hook/useGet";
import useDelete from "../Hook/useDelete";

const Pelanggan = () => {
  const [isi] = useGet("/pelanggan");
  const [hapus, pesan] = useDelete("/pelanggan/");
  let no = 1;
  return (
    <div>
      <div className="row">
        <h2>Data Pelanggan</h2>
      </div>
      <div className="row">
        <p>{pesan}</p>
      </div>
      <div className="row">
        <Table className="table table-bordered" size="sm">
          <thead>
            <tr align="center">
              <th>No</th>
              <th>Nama Pelanggan</th>
              <th>Alamat</th>
              <th>No Telp</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td align="center">{no++}</td>
                <td>{val.pelanggan}</td>
                <td>{val.alamat}</td>
                <td>{val.telp}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => hapus(val.id_pelanggan)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Pelanggan;
