import scheduleService from '../../services/scheduleService';
import * as body from 'body-parser';


class ScheduleController {
    getById(req, res) {
        scheduleService
            .getScheduleById(req.params.id)
            .then(tuiSchedule => {
                if(!tuiSchedule) res.status(404).json({success: false, message: 'This tuition schedule is not exist!!'})
                else{
                    res.status(200).json({success: true, tuiSchedule})
                }
            })
            .catch(err => res.status(500).json({success: false, err}))
    }

    updateSchedule(req, res) {
        scheduleService
            .updateSchedule(req.params.id, req.body)
            .then(tuiSchedule => {
                if(!tuiSchedule) res.status(404).json({success: false, message: 'This tuition schedule is not exist!!'})
                else{
                    //calculator total fee
                    console.log(typeof tuiSchedule.feePerHour)
                    console.log(typeof tuiSchedule.hoursPerLession)
                    console.log(typeof tuiSchedule.lessionsPerCourse)
                    tuiSchedule.feeTotal = tuiSchedule.feePerHour*tuiSchedule.hoursPerLession*tuiSchedule.lessionsPerCourse
                    //calculator date time
                    tuiSchedule.hourEnd = tuiSchedule.hourStart + tuiSchedule.hoursPerLession
                    //set periodeEnd
                    tuiSchedule.periodeEnd = '2019-10-10'
                    console.log(tuiSchedule)

                    return tuiSchedule.save()
                }
            })
            .then(updated => {
                res.status(200).json({success: true, updated})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({success: false, err})
            })
    }


    deleteSchedule(req, res) {
        scheduleService
            .deleteSchedule(req.params.id)
            .then(res.status(200).json({success: true, message: "deleted!"}))
            .catch(err => res.status(500).json({success: false, err}))
    }


    paymentGate(req, res) {
        const statusObj = {};
        statusObj.paymentStatus = 'Completed';
        statusObj.tuitionStatus = 'In Progress';
        statusObj.paymentDate = Date.now();
        scheduleService
            .updateScheduleStatus(req.params.id, statusObj)
            .then(statusUpdated => {
                if(statusUpdated) res.status(200).json({status: statusUpdated, message: "Thank you!!!"})
                else res.status(403).json({success: false, message: 'This tuition schedule not exist!!'})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({err, message: "something went wrong!!!"})
            })
    }
}


export default new ScheduleController()