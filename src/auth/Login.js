import React,{ useContext } from 'react';
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios'
import  jwtDecoder from 'jwt-decode'

import { AuthContext } from '../contexts/auth-context';
import { useHttpHook } from '../hooks/use-http';
import 'antd/dist/antd.css';
import './login.css'
import { Spin } from 'antd';

const Login = () => {

  const {login} =useContext(AuthContext)
const {sendRequest, isLoading}=useHttpHook()

  const onFinish =async (values) => {
    console.log('Success:', values);
    try{
      const response =await sendRequest("http://localhost:8091/users/login",'POST',{
        username:values.username,
        password:values.password,
      });
      const arrayResponse=response.data.split(' ');
      const decodedToken=jwtDecoder(arrayResponse[0])
      if(decodedToken.roles[0]==="ADMIN"){
        login(arrayResponse[1],arrayResponse[0]);
      }else {
        throw new Error("you are not authorized, only admin can get access !!");
      }
    }catch(err){
console.log(err)
    }
 
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>



    <div className='relative shadow-md m-auto sm:w-1/2 p-4 w-2/3 h-3/2 top-32 flex justify-start'>

    <div className='w-5/6'>
    <div className='mx-8 mt-4 mb-6 flex justify-center w-full'>
      <label className='items-center gap-3 ml-3 mt-4 sm:ml-14 flex text-2xl  tracking-tight dark:text-white text-slate-900 uppercase font-semibold'>welcome: </label>
      </div>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      werCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType="submit" className=' text-xl p-3 w-32 hover:drop-shadow-xl hover:bg-#03C9D7'>
          {isLoading ? <Spin />:"Login"}
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
    </React.Fragment>
  );
};

export default Login;