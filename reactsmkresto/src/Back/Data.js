import React, { useState } from "react";
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
//For API Requests
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Icon = () => {
  return <FontAwesomeIcon icon={faTrash} />;
};
const Ubah = () => {
  return <FontAwesomeIcon icon={faEdit} />;
};

class Data extends React.Component {
  // State array variable to save and show data
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    //Get all users details in bootstrap table
    axios.get("http://localhost:8000/api/kategori").then((res) => {
      //Storing users detail in state array object
      this.setState({ data: res.data });
    });
    //initialize datatable
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").DataTable();
      }, 1000);
    });
  }

  render() {
    //Datatable HTML

    return (
      <div className="MainDiv">
        <div className="jumbotron text-center">
          <h3>Therichpost.com</h3>
        </div>
        <div className="container">
          <table
            id="example"
            className="text-center table table-hover table-bordered"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Kategori</th>
                <th>Keterangan</th>
                <th>Hapus</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((result, index) => {
                return (
                  <tr key={index}>
                    <td>{result.id_kategori}</td>
                    <td>{result.kategori}</td>
                    <td>{result.keterangan}</td>
                    {/* <td>
                      <button className="btn btn-danger">
                      <Icon />
                            </button>
                            <button className="btn btn-warning">
                            <Ubah />
                      </button>
                    </td> */}

                    <td>
                      <button className="btn btn-danger">
                        <Icon />
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-warning">
                        <Ubah />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Data;
