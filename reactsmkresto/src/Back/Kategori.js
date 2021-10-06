import React, { useState } from "react";
import { link } from "../Axios/Link";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import UseGet from '../Hook/useGet';

const Icon = () => {
  return <FontAwesomeIcon icon={faTrash} />;
};
const Ubah = () => {
  return <FontAwesomeIcon icon={faEdit} />;
};




const Kategori = () => {
  //const [isi, setIsi] = useState([]);
  const [pesan, setPesan] = useState([]);
  const [id_kategori, setId_kategori] = useState("");
  const [pilihan, setPilihan] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  //menampilkan semua data dari database (Read)
  // async function fetchData() {
  //   const request = await link.get("/kategori");
  //   setIsi(request.data);
  // }
  //fungsi menyimpan data (Create)
  const [isi] = UseGet('/kategori');
  function simpan(data) {
    if (pilihan) {
      link.post("/kategori", data).then((res) => setPesan(res.data.pesan));
      swal({
        title: "Sukses",
        text: "Data Berhasil Ditambahkan!",
        icon: "success",
        button: false,
        timer: 1500,
      });
    } else {
      link
        .put("/kategori/" + id_kategori, data)
        .then((res) => console.log(res));
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

  //menghapus data
  function hapus(id) {
    //if (window.confirm('Yakin Akan Menghapus ?')) {

    swal({
      title: "Yakin Akan Menghapus?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      
    }).then((willDelete) => {
      if (willDelete) {
        link.delete("/kategori/" + id);
        swal("Data Berhasil Dihapus", {
          icon: "success",
          timer: 1500,
        });
      } else {
        swal("Data Gagal Dihapus");
      }
    });
    // swal({
    //   title: "Data Berhasil Di Hapus!",
    //   text:
    //     "Sukses Hapus Pesanan",
    //   icon: "error",
    //   button: false,
    //   timer: 1500,
    //   })

    //setPesan(res.data.pesan);
    //}
  }
  async function showData(id) {
    const res = await link.get("/kategori/" + id);
    setValue("kategori", res.data[0].kategori);
    setValue("keterangan", res.data[0].keterangan);
    setId_kategori(res.data[0].id_kategori);
    setPilihan(false);
  }

  // useEffect(() => {
  //   fetchData();
  // }, [isi]);

  let no = 1;
  return (
    <div>
      <div className="row">
        <h2>Data Kategori</h2>
      </div>
      <div className="row">
        <p>{pesan}</p>
      </div>
      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit(simpan)}>
            <div className="mb-3">
              <label htmlFor="kategori" className="form-label">
                Kategori
              </label>
              <input
                type="text"
                name="kategori"
                className="form-control"
                placeholder="Masukan Kategori"
                {...register("kategori", { required: true })}
              />
              {errors.kategori?.type === "required" && "Kategori Wajib Diisi"}
            </div>
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">
                Keterangan
              </label>
              <input
                type="text"
                name="keterangan"
                className="form-control"
                placeholder="Masukan Kategori"
                {...register("keterangan", { required: true })}
              />
              {errors.keterangan?.type === "required" &&
                "Keterangan Wajib Diisi"}
            </div>
            <div className="mb-3">
              <input type="submit" name="submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <Table className="table table-hover table-bordered">
          <thead align="center">
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>

            {isi.map((val, index) => (
              <tr key={index}>
                <td align="center">{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.keterangan}</td>
                <td>
                  <button
                    onClick={() => hapus(val.id_kategori)}
                    className="btn btn-danger"
                  >
                    <Icon />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => showData(val.id_kategori)}
                    className="btn btn-warning"
                  >
                    <Ubah />
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

export default Kategori;
