import { useEffect } from "react";

export default function MessageAlert({info, setAlert, dispatch}){
  useEffect(()=> {
    switch(info.status.trim()){
      case "success_register":
        setAlert({text: 'Berhasil Mendaftar!', type: 'success'});
        break;
      case "fetch_fail":
        setAlert({text: 'Gagal Mendapatkan Data!', type: 'fail'});
        break;
      case "not_loggedin":
        setAlert({text: 'Anda Belum Login!', type: 'fail'});
        break;
      case "success_login":
        setAlert({text: 'Berhasil Login!', type: 'success'});
        break;
      case "success_logout":
        setAlert({text: 'Berhasil Logout!', type: 'success'});
        break;
      case "unmatch_data":
        setAlert({text: 'Data Tidak Valid!', type: 'fail'})
        break;
      case "invalid_filter":
        setAlert({text: 'Filter Tidak Valid!', type: 'fail'})
        break;
      case "success_updated":
        setAlert({text: 'Berhasil Memperbarui Profile', type: 'success'})
        break;
      case "success_added":
        setAlert({text: 'Berhasil Menambahkan!', type: 'success'});
        break;
      case "fail_added":
        setAlert({text: `Gagal Menambahkan ${info.message??''}!`, type: 'fail'});
        break;
        //Invalid Auth & Profile
      case "invalid_register":
        setAlert({text: `Data Tidak Valid`, type: 'fail'});
        break;
      case "invalid_login":
        setAlert({text: `Gagal Login, Data Tidak Valid! ${info.message??''}`, type: 'fail'});
        break;
      case "fail_updated":
        setAlert({text: `Gagal Memperbarui Profile ${info.message??''}`, type: 'fail'})
        break;
      case "redundant_register":
        setAlert({text: `${info.message??'Gagal Mendaftar, Akun Invalid'}`, type: 'fail'})
        break;
    }
    info.status ? (dispatch({type: 'RESET_STATUS'})) : ''
  }, [info.status])
}