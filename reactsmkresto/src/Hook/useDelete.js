import swal from "sweetalert";
import { link } from "../Axios/Link";
//import {useState} from 'react';



const useDelete = (url) => {
    // const [pesan, setPesan] = useState("");
    // async function hapus(id) {
    //     if (window.confirm("Yakin Akan Menghapus")) {
    //         const res = await link.delete(url + id);
    //         setPesan(res.data.pesam);
    //     }
    // }
    function hapus(id) {
        swal({
          title: "Yakin Akan Menghapus?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
          
        }).then((willDelete) => {
          if (willDelete) {
            link.delete(url + id);
            swal("Data Berhasil Dihapus", {
              icon: "success",
              timer: 1500,
            });
          } else {
            swal("Data Gagal Dihapus");
          }
        });
      }
    return [hapus] ;
}

export default useDelete;
