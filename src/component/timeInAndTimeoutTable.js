import React from 'react';
import { Table } from 'antd';

const TimeKeepingTable = ({ details }) => {

   const columns = [
      {
         title: 'Time In',
         dataIndex: 'timeIn',
      },
      {
         title: 'Time Out',
         dataIndex: 'timeOut',
      },
                            
   ];

   return (
      <Table columns={columns} dataSource={details}
      />
   );
}

export default TimeKeepingTable;