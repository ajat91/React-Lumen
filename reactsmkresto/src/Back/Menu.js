//import React, { useEffect, useState } from "react";
import UseGet from "../Hook/useGet";
import useDelete from "../Hook/useDelete";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { link } from "../Axios/Link";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";

const Menu = () => {
  const [isi] = UseGet("/menu");
  const [hapus] = useDelete("/menu/");
  const [pesan, setPesan] = useState([]);
  const [id_menu, setId_menu] = useState("");
  const [pilihan, setPilihan] = useState(true);
  const [kategori, setKategori] = useState([]);
  const [id_kategori, setId_kategori] = useState([]);
  const [gambar, setGambar] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  //mengambil select option kategori
  useEffect(() => {
    let ambil = true;
    async function fetchData() {
      const res = await link.get("/kategori");
      if (ambil) {
        setKategori(res.data);
      }
    }
    fetchData();
    return () => {
      ambil = false;
    };
  }, [kategori]);

  function simpan(data) {
    // console.log(data);
    // console.log(data.gambar[0]);
    const formData = new FormData();
    formData.append("id_kategori", data.id_kategori);
    formData.append("menu", data.menu);
    formData.append("harga", data.harga);
    formData.append("gambar", data.gambar[0]);
    if (pilihan) {
      link.post("/menu", formData).then((res) => setPesan(res.data.pesan));
      swal({
        title: "Sukses",
        text: "Data Berhasil Ditambahkan!",
        icon: "success",
        button: false,
        timer: 1500,
      });
    } else {
      link.post("/menu/" + id_menu, formData).then((res) => setPesan(res.data.pesan));
      setPilihan(true);
      swal({
        title: "Sukses",
        text: "Data Berhasil Diubah!",
        icon: "success",
        button: false,
        timer: 1500,
      });
    }
    reset();
  }
  async function showData(id) {
    const res = await link.get("/menu/" + id);
    console.log(res.data);
    setValue("harga", res.data[0].harga);
    setValue("menu", res.data[0].menu);
    setGambar( <img src={res.data[0].gambar} alt="" width="250" height="200" />);
    setId_kategori(res.data[0].id_kategori);
    setId_menu(res.data[0].id_menu);
    setPilihan(false);
  }

  let no = 1;
  return (
    <div>
      <div className="row">
        <h2>Data Menu</h2>
      </div>
      <div>
        <p>{pesan}</p>
      </div>
      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit(simpan)}>
            <div className="mb-3">
              <label htmlFor="kategori" className="form-label">
                kategori
              </label>
              <select
                name="id_kategori"
                className="form-control"
                {...register("id_kategori", { required: true })}
              >
                <option>Pilih Kategori</option>
                {kategori.map((val, index) =>
                  val.id_kategori === id_kategori ? (
                    <option key={index} selected value={val.id_kategori}>
                      {val.kategori}
                    </option>
                  ) : (
                    <option key={index} value={val.id_kategori}>
                      {val.kategori}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="menu" className="form-label">
                Menu
              </label>
              <input
                type="text"
                name="menu"
                className="form-control"
                placeholder="Masukan Menu"
                {...register("menu", { required: true })}
              />
              {errors.Menu?.type === "required" && "Menu Wajib Diisi"}
            </div>
            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga
              </label>
              <input
                type="text"
                name="harga"
                className="form-control"
                placeholder="Masukan Harga"
                {...register("harga", { required: true })}
              />
              {errors.harga?.type === "required" && "harga Wajib Diisi"}
            </div>
            <div className="mb-3">
              <label htmlFor="gambar" className="form-label">
                Gambar
              </label>
              <input
                type="file"
                name="gambar"
                className="form-control"
                {...register("gambar", { required: true })}
              />
              {errors.gambar?.type === "required" && "gambar Wajib Diisi"}
              </div>
            <div className="mb-3">
              <input type="submit" name="submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
        <div className="col-4">
         {gambar}
        </div>
      </div>

      <div className="row">
        <Table className="table table-bordered" size="sm">
          <thead align="center">
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Menu</th>
              <th>Gambar</th>
              <th>Harga</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td align="center">{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.menu}</td>
                <td>
                  <img src={val.gambar} alt="gambar" width="80" height="50" />
                </td>
                <td>{val.harga}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => hapus(val.id_menu)}
                  >
                    Hapus
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => showData(val.id_menu)}
                  >
                    Edit
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

export default Menu;
