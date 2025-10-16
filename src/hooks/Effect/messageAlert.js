import { useEffect } from "react";

export default function MessageAlert({info, setAlert, dispatch}){
    useEffect(()=> {
        switch(info.status.trim()){
            case "invalid_register":
                return setAlert({text: 'Filter Tidak Valid!', type: 'fail'});
            case "success_register":
                return setAlert({text: 'Berhasil Mendaftar!', type: 'success'});
            case "fetch_fail":
                return setAlert({text: 'Gagal Mendapatkan Data!', type: 'fail'});
            case "invalid_login":
                return setAlert({text: 'Gagal Login, Data Tidak Valid!', type: 'fail'});
            case "not_loggedin":
                return setAlert({text: 'Anda Belum Login!', type: 'fail'});
            case "success_login":
                return setAlert({text: 'Berhasil Login!', type: 'success'});
            case "success_logout":
                return setAlert({text: 'Berhasil Logout!', type: 'success'});
            case "unmatch_data":
                return setAlert({text: 'Data Tidak Valid!', type: 'fail'})
            case "invalid_filter":
                return setAlert({text: 'Filter Tidak Valid!', type: 'fail'})
           }
            info.status ? (dispatch({type: 'RESET_STATUS'})) : ''
        }, [info.status])
}