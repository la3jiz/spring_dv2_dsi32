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

function TasksInputModal({ data, handleClick }) {
    const refTitle = useRef()
    const refDescription = useRef()
    const refCreationDate = useRef()


    
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
                        <div class="grid gap-6 mb-6 md:grid-cols-1">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                    defaultValue={data.title}
                                    ref={refTitle}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                                <textarea type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                    defaultValue={data.description}
                                    ref={refDescription}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Creation Date</label>
                                <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                    defaultValue={`${new Date (data.creation_date).getFullYear()}-${new Date (data.creation_date).getMonth()}-${new Date (data.creation_date).getDate()}`}
                                    ref={refCreationDate}
                                />
                                <input type="text" />
                            </div>  </div>

                    </StyledDescription>
                    <Modal.Close>
                        <StyledProceedButton onClick={() => handleClick(data.taskId, refTitle.current.value, refDescription.current.value, refCreationDate.current.value || data.creation_date, data.userId)}>
                            Update
                        </StyledProceedButton>
                    </Modal.Close>
                </StyledContainer>
            </Modal.Group>
        </Modal>
    );
}
export default TasksInputModal
