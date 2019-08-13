import ScheduleModel from '../models/scheduleModel';


class ScheduleService {
    getAllSchedule(userId) {
        return ScheduleModel
            .find({
                $or: [{tutorId: userId}, {senderId: userId}]
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


    updateSchedule(id, tuiSchedule){
        return ScheduleModel
            .findByIdAndUpdate(id, tuiSchedule, {new: true})
    }

    deleteSchedule(id) {
        return ScheduleModel
            .remove({_id: id})
    }
 }


 export default new ScheduleService()