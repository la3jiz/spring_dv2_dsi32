import React, { useContext, useState, useEffect, useCallback } from "react";

import "antd/dist/antd.css";
import { Space, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import "antd/dist/antd.css";
import { notification } from "antd";

import { Header } from "../components";
import CustomTable from "../components/CustomTable";
import { useHttpHook } from "../hooks/use-http";
import { AuthContext } from "../contexts/auth-context";
import Loader from "../components/UiElements/Loader";
import axios from "axios";
import TasksInputModal from "../components/UiElements/TasksInputModal";
import { setStyleAttribute } from "@syncfusion/ej2/spreadsheet";

const Tasks = () => {
  const { sendRequest } = useHttpHook();
  const { userId, token } = useContext(AuthContext);
  const [searchedTask, setSearchedTask] = useState("");

  const { data, error, isLoading, isSuccess, refetch } = useQuery(
    ["tasks"],
    () =>
      sendRequest("http://localhost:8090/api/listAll", "GET", null, {
        Authorization: "Bearer " + token,
      }),
    {}
  );

  // const {data:usersData,isSuccess:isUserSuccess}=useQuery("[users]",async () =>await axios.get("http://localhost:8091/users/all",  { Authorization: "Bearer " + token }))

  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "description",
    },
    {
      title: "Task Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Creation Date",
      dataIndex: "readable_creation_date",
      key: "readable_creation_date",
    },
    {
      title: "Creator",
      dataIndex: "username",
      key: "username",
      render: (_, data) => {
        return (
          <Space size="middle">
            <p className="font-bold text-gray-500">{data.username}</p>
          </Space>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, data) => {
        return (
          <Space size="middle">
            <TasksInputModal data={data} handleClick={handleUpdate} />
            <a
              onClick={async () => {
                try {
                  const response = await sendRequest(
                    `http://localhost:8090/api/${data.taskId}`,
                    "DELETE",
                    null,
                    { Authorization: "Bearer " + token }
                  );

                  if (response.status === 200 || response.status === 201) {
                    openNotificationWithIcon(
                      "success",
                      "Deleted Successfully",
                      "this task was deleted successfully and could not be restaured."
                    );
                    refetch();
                  } else {
                    openNotificationWithIcon(
                      "error",
                      "Deleted Unsuccessfully",
                      "some error ocurred,you could not delete this task for now, please try later."
                    );
                  }
                } catch (err) {
                  openNotificationWithIcon(
                    "error",
                    err.message,
                    "some error ocurred,you could not delete this task for now, please try later."
                  );
                }
              }}
            >
              Delete
            </a>
          </Space>
        );
      },
    },
  ];

  //antd notification method
  const openNotificationWithIcon = (type, title, description) => {
    notification[type]({
      message: title,
      description: description,
    });
  };

  const handleUpdate = async (
    id,
    title,
    description,
    creation_date,
    userId
  ) => {
    try {
      console.log(creation_date);
      const response = await sendRequest(
        `http://localhost:8090/api/${id}`,
        "PUT",
        {
          id: id,
          title: title,
          description: description,
          creation_date: new Date(creation_date),
          uid: userId,
        },
        { Authorization: "Bearer " + token }
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        refetch();
        openNotificationWithIcon(
          "success",
          "Updated Successfully",
          "this task was updated successfully ."
        );
        return;
      } else {
        openNotificationWithIcon(
          "error",
          "updated Unsuccessfully",
          "some error ocurred,you could not update this task for now, please try later."
        );
      }
    } catch (err) {
      openNotificationWithIcon(
        "error",
        err.message,
        "some error ocurred,you could not update this task for now, please try later."
      );
    }
  };

  // const handleUser=async(uid)=>{
  //   try{
  //     const response=await axios.get(`http://localhost:8091/users/${uid}`,{headers:{Authorization:"Bearer "+token}})
  // if(response.status===200 || response.status===201)
  // {
  //   console.log("handleUser: ",response.data)
  //   return response.data
  // }
  //   }catch(err){
  //     console.log(err)
  //     }

  // }

  let customTableData = [];
  if (isSuccess) {
    customTableData = data.data.map((item, index) => {
      return {
        key: index,
        title: item.title,
        description: item.description,
        readable_creation_date: new Date(item.creation_date).toDateString(),
        creation_date: item.creation_date,
        userId: item.uid,
        taskId: item.id,
        username:item.username,
      };
    });
  }

  const handleSearch = (event) => {
    setSearchedTask(event.target.value);
    console.log(searchedTask);
  };

  const searchedCustomTableData = customTableData.filter((item)=> {
    if(  item.title.includes(searchedTask) || item.username.includes(searchedTask) ){
      return true;
    }
    return false;
  }
  
  );

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Tasks" />
        <div class="flex ">
  <div class="mb-3 w-1/3">
    <div class="input-group relative flex  w-full mb-4 rounded ">
      <input onChange={handleSearch} type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
      <span class="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </span>
    </div>
  </div>
</div>
   
        <CustomTable columns={columns} data={searchedCustomTableData} />
      </div>
    </React.Fragment>
  );
};
export default Tasks;
