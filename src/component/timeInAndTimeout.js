import React from 'react';
import { Input, Card, Row, Col, Spin, Image } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import TimeKeepingAction from '../component/timeInAndTimeoutAction'
import GetCurrentTimeAction from '../component/getCurrentTimeAction'
import TimeInAndOutTable from '../component/timeInAndTimeoutTable'
import moment from 'moment';


const EmployeePage = () => {


  let{
    getStudentByIdNumber,
    loading,
    studentDetail,
    studentDetailTimeInDetails
  } = TimeKeepingAction({});

  let{
    today
  } = GetCurrentTimeAction({});

  let onChange = (e) => {
    getStudentByIdNumber(e.target.value)
  }

  return (
    <Spin spinning={loading} delay={500}>
   <Row gutter={16}>
    <Col span={12}>
        <Input allowClear placeholder="Enter ID Number here" onChange={(e)=> onChange(e)}/>
    </Col>
    </Row>
    <Card className="h-82 p-70 l-500" title={today} style={{ width:500 }}>
    <Row gutter={16}>
      <Col span={12}>
      <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
      </Col>
      <Col span={12}>
      <p>ID Number</p>
      <Input disabled={true} value={studentDetail && studentDetail.student ? studentDetail.student.idNumber: null}/>
      <p>Name</p>
      <Input disabled={true} value={studentDetail && studentDetail.student ? studentDetail.student.firstName + " " + studentDetail.student.lastName : null}/>
      <p>Grade</p>
      <Input disabled={true} value={studentDetail && studentDetail.student ? studentDetail.student.gradeLevel : null}/>
      <p>Time In</p>
      <Input disabled={true} value={studentDetail && studentDetail.timeIn ? moment(studentDetail.timeIn).format('MMMM Do YYYY, h:mm:ss a') : null}/>
      <p>Time Out</p>
      <Input disabled={true} value={studentDetail && studentDetail.timeOut ? moment(studentDetail.timeOut).format('MMMM Do YYYY, h:mm:ss a') : null}/>
      </Col>
      </Row>
      <TimeInAndOutTable details={studentDetailTimeInDetails} />
     
    </Card>

	</Spin>
      
  );
}

export default EmployeePage;

