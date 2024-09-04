"use client";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/Components/Breadcrumb";
import Tables from "@/Components/Tables";
import Loading from "@/Components/Loading";
import { httpForNextServer } from "@/utils/setting";

const HomePage: React.FC = () => {
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    getUserFromApi();
  }, []);

  const getUserFromApi = async () => {
    const res = await httpForNextServer.get("/api/UserManagement");
    try {
      if (_.get(res, "status", 404) === 200) {
        setListUsers(_.get(res, "data.data.items", []));
      } else {
        setListUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Breadcrumb pageName="User" />
          <div className="flex flex-col gap-10">
            <Tables listUsers={listUsers} />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
