import ScheduleModel from '../models/scheduleModel';


class ScheduleService {
    getAllSchedule(userId) {
        return ScheduleModel
            .find({},{
                
            })
    }


    getScheduleById(id) {
        return ScheduleModel
            .findById(id)
    }


    createNewSchedule(tuitionSchedule){
        return ScheduleModel
            .create(tuitionSchedule)
    }


 }


 export default new ScheduleService()