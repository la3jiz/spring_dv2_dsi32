import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';



const CustomTable = ({columns, data}) => {
  return <Table columns={columns} dataSource={data} />;
}
export default CustomTable;