import React from 'react';
import { useParams } from 'react-router';
import Kategori from './Kategori';
import Menu from './Menu';
import Pelanggan from './Pelanggan';
import Data from './Data';
import Order from './Order';
import Detail from './Detail';
import User from './User';

const Content = () => {

    const { isi } = useParams();
    let tampil;
    if (isi === 'kategori') {
        tampil=<Kategori/>
    } else if (isi === 'menu') {
        tampil=<Menu/> 
    }else if (isi === 'pelanggan') {
        tampil=<Pelanggan/>
    }else if (isi === 'data-kategori') {
        tampil=<Data/>
    }
    else if (isi === 'order') {
        tampil=<Order/>
    }
    else if (isi === 'detail') {
        tampil=<Detail/>
    }
    else if (isi === 'user') {
        tampil=<User/>
    }
    
    return (
        <>
            {tampil }
        </>
    );
}

export default Content;
