import React from "react";
import swal from "sweetalert";
import { useContext } from "react";
import { authenticate } from "../../App";
import { useState, useEffect } from "react";

import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
function Logout() {
  const [isLogin, handleIsLogin] = useContext(authenticate);
  const accessFirebase = collection(db, "access");
  const userDetailFirebase = collection(db, "userDetail");

  const [loginDetail, setLoginDetail] = useState([]);
  const [access, setAccess] = useState([]);

  useEffect(() => {
    const getlist = async () => {
      const data = await getDocs(accessFirebase);
      setAccess(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getlist();
  }, [accessFirebase]);

  useEffect(() => {
    const getlist = async () => {
      const data = await getDocs(userDetailFirebase);
      setLoginDetail(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getlist();
  }, [userDetailFirebase]);

  const deleteTodo = async (id) => {
    const userDoc = doc(db, "userDetail", id);
    await deleteDoc(userDoc);
  };
  const deleteAccess = async (id) => {
    const userDoc = doc(db, "access", id);
    await deleteDoc(userDoc);
  };

  function handleLogout(e) {
    swal("successfully logout!", "You clicked at logout!", "success");

    e.preventDefault();
    {
      loginDetail &&
        loginDetail.map((elm) => {
          deleteTodo(elm.id);
        });
    }
    {
      access &&
        access.map((elm) => {
          deleteAccess(elm.id);
        });
    }

    localStorage.removeItem("access");
    handleIsLogin();
  }
  return (
    <div>
      <button
        className="btn btn-outline-danger text-black bg-danger"
        onClick={handleLogout}
        type="submit"
      >
        LOGOUT
      </button>
    </div>
  );
}

export default Logout;
