import React, { useState, useRef } from "react";
import { Modal } from "@dorai-ui/modal";
import styled from "styled-components";

const StyledTrigger = styled(Modal.Trigger)`
  height: 40px;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
`;

const StyledTitle = styled(Modal.Title)`
  text-align: left;
  font-weight: 400;
  font-size: 21px;
  margin-bottom: 20px;
`;

const StyledOverlay = styled(Modal.Overlay)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.2;
  top: 0;
  left: 0;
`;

const StyledContainer = styled("div")`
  position: absolute;
  width: 600px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 10px;
  padding: 45px 60px;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledCloseButton = styled(Modal.Close)`
  border: none;
  background: transparent;
  font-size: 20px;
  font-weight: bold;
`;

const StyledDescription = styled(Modal.Description)`
  margin-top: 40px;
  font-size: 21px;
`;

const StyledProceedButton = styled(Modal.Close)`
  margin-top: 40px;
  font-size: 21px;
  background-color: #000000;
  color: #ffffff;
  padding: 10px 35px;
  &:focus {
    box-shadow: rgb(220 219 221) 0px 0px 0px 5px;
  }
  outline: none;
  border-radius: 4px;
  border: none;
  float: right;
`;

function UsersInputModal({ data,handleClick }) {
  const refUsername = useRef()
const refStatus=useRef()
const refRole=useRef()
  // 

  return (
    <Modal>
      <Modal.Trigger><a >update</a></Modal.Trigger>
      <Modal.Group>
        <StyledOverlay />
        <StyledContainer>
          <StyledHeader>
            <StyledTitle as="h3">Update Task</StyledTitle>
            <StyledCloseButton>X</StyledCloseButton>
          </StyledHeader>

          <StyledDescription>
            <div NameName="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  defaultValue={data.username}
                  ref={refUsername}
                />
              </div>

              <div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                  <div className="mb-3 ">
                    <select ref={refStatus} className="form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                      {
                        data.status.props.children==='active' ? <><option value={true} selected>Active</option>
                          <option value={false} >Inactive</option></> :
                          <><option value={false} selected>Inactive</option><option value={true} >Active</option></>
                      }
                    </select>
                  </div>
                </div>
              </div>


              <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role</label>
                <div className="mb-3 ">
                  <select ref={refRole} className="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                  {data.role.props.children === 'ADMIN' ? <><option value="ADMIN" selected>ADMIN</option>
                      <option value="USER" >USER</option></> :
                      <><option value="USER" selected>USER</option>
                        <option value="ADMIN" >ADMIN</option></>
                    }
                  </select>
                </div>
              </div>
            </div>



          </StyledDescription>
          <Modal.Close>
            <StyledProceedButton
             onClick={() => handleClick(data.id, 
              refUsername.current.value,
               data.password, data.userId,
                refStatus.current.value,
            refRole.current.value==='ADMIN'?[{role_id:1,role:'ADMIN'}]:[{role_id:2,role:'USER'}])}>
              Update
            </StyledProceedButton>
          </Modal.Close>
        </StyledContainer>
      </Modal.Group >
    </Modal >
  );
}
export default UsersInputModal
