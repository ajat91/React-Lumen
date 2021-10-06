import { link } from './link.js';

export function ubah(){
    let id=4;
    let data={
        pelanggan :'date pelanggan axios',
        alamat :'update alamat axios',
        telp: '089990'
    }
    link.put('/pelanggan/' + id, data).then(res => {
        let tampil=`<h1>${res.data.pesan}</h1>`;
        document.querySelector('#out').innerHTML=tampil;
    })
    
}