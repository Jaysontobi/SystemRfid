import React, { useState, useEffect } from 'react';
import moment from 'moment';
import userService from '../component/userService';
import timeKeepingService from '../component/timeKeepingService'
const TimeKeepingAction = (initial = { searchRequest: {} }) => {
    const locale = 'en';
    let [loading,setLoading] = useState(false)
    let [studentDetail, setStudentDetail] = useState({});
    let [studentDetailTimeInDetails, setStudentDetailTimeInDetails] = useState([]);
    const [today, setDate] = useState(moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')); // Save the current date to be able to trigger an update
    const getStudentByIdNumber = async (idNumber) => {
        setLoading(true)
        let finalResult;
        let response = await userService.findAllUser()
        let result = response.data.filter(user => user.idNumber === idNumber)
        if(result.length >= 1){
            let timeResponse = await timeKeepingService.findAllTimekeeping()
            let result1 = timeResponse.data.filter(time => moment(time.timeIn).format('MMMM Do YYYY') === moment(new Date()).format('MMMM Do YYYY') && time.student.idNumber === idNumber && !time.timeOut)
            if(result1.length >= 1) {
                let timeObj= {
                    timeIn: result1[0].timeIn,
                    timeOut: new Date(),
                    student: result[0],
                }
                let timeResponse = await timeKeepingService.update(result1[0]._id,timeObj)
                timeResponse.data.timeOut = timeObj.timeOut
                let result22 = await timeKeepingService.findAllTimekeeping()
                let result23 = result22.data.filter(time => time.student.idNumber === idNumber)
                let newArray = result23.map((user) => {
                return {
                    timeIn : moment(user.timeIn).format('MMMM Do YYYY, h:mm:ss a'),
                    timeOut : moment(user.timeOut).format('MMMM Do YYYY, h:mm:ss a')
                }})
                setStudentDetailTimeInDetails(newArray)
                setStudentDetail(timeResponse.data)
            } else {
                let timeObj= {
                    timeIn: new Date(),
                    student: result[0]
                }
                let timeResponse = await timeKeepingService.add(timeObj)
                let result22 = await timeKeepingService.findAllTimekeeping()
                let result23 = result22.data.filter(time => time.student.idNumber === idNumber)
                let newArray = result23.map((user) => {
                return {
                    timeIn : moment(user.timeIn).format('MMMM Do YYYY, h:mm:ss a'),
                    timeOut : moment(user.timeOut).format('MMMM Do YYYY, h:mm:ss a')
                }})
                setStudentDetailTimeInDetails(newArray)
                setStudentDetail(timeResponse.data)
            }
        }
        
        setLoading(false)

    };
  useEffect(() => {
  }, []);


  return {
    today,
    getStudentByIdNumber,
    loading,
    studentDetail,
    studentDetailTimeInDetails
  }
};

export default TimeKeepingAction;