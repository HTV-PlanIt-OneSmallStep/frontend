import { apiClient, apiTaskClient } from "./apiClient"

`
getTasks
getSubtaskById
setTask
setSubTask
createSchedule
updateSubtaskById`

const parseDateAndTime = (s) => {
    const timestamp = "2025-10-04T21:15:30.000Z"; // example

    // Create a Date object
    const dateObj = new Date(timestamp);

    // Extract just the date (YYYY-MM-DD)
    const date = dateObj.toISOString().split("T")[0];

    // Extract just the time (HH:mm) in local time
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return [date, time]
} 

// FOR CALENDAR
export const getTasksInTimestampRange = async (scheduleId, s, e) => {
    const r = await apiTaskClient.get(`${scheduleId}/tasks?startTime=${s}&endTime=${e}`);
    console.log(r)
    if (r) {
        return r.reduce((acc, task) => {
            const dateSplitS = parseDateAndTime(task.startTime);
            const dateSplitE = parseDateAndTime(task.endTime);

            if (dateSplitS[0] != dateSplitE[0]) {
                acc.push(
                    {
                        id: task.id,
                        date: dateSplitS[0],
                        start: dateSplitS[1],
                        end: '23:59',
                        title: task.name,
                        description: task.description,
                        parent: task.parent,
                        ...task
                    }
                )
                acc.push(
                    {
                        id: task.id,
                        date: dateSplitE[0],
                        start: '00:00',
                        end: dateSplitE[1],
                        title: task.name,
                        description: task.description,
                        parent: task.parent,
                        ...task
                    }
                )
            } else {
                acc.push(
                    {
                        id: task.id,
                        date: dateSplitS[0],
                        start: dateSplitS[1],
                        end: dateSplitE[1],
                        title: task.name,
                        description: task.description,
                        parent: task.parent,
                        ...task
                    }
                )
            }
        }, []).flat()
    }
    return []
}


/*
Response format:
{
    name: t.NAME,
    id: t.ID,
    description: t.DESCRIPTION,
    startTime: t.STARTTIME,
    endTime: t.ENDTIME,
    status: t.STATUS,
    parent: {
        id: t.TASKID,
        name: t.TASKNAME,
        deadline: t.DEADLINE,
        start: t.TASKSTART
    }
}
*/
export const getSubtaskById = async (scheduleId, taskId, subtaskId) => {
    return await apiTaskClient.get(`${scheduleId}/tasks/${taskId}/subtask/${subtaskId}`)
}

export const getTaskById = async (scheduleId, taskId) => {
    return await apiTaskClient.get(`${scheduleId}/tasks/${taskId}`)
}

// For today's task if we need it
export const getTasksForToday = async (scheduleId) => {
    const r = await apiTaskClient.get(`${scheduleId}/dailyTasks`);
    console.log(r)
    if (r) {
        return r.map((task) => {
            const dateSplitS = parseDateAndTime(task.startTime);
            const dateSplitE = parseDateAndTime(task.endTime);

           
            return (
                {
                    id: task.id,
                    date: dateSplitS[0],
                    start: dateSplitS[1],
                    end: dateSplitE[1],
                    title: task.name,
                    description: task.description,
                    parent: task.parent
                }
            )
            
        })
    }
}
/*
returns { id: 'UUID' }
*/
export const createTask = async (scheduleId, title, start, deadline, context = '', status = 'PLANNED') => {
    return await apiTaskClient.post(`${scheduleId}/tasks`, {
            name: title,
            context,
            start,
            deadline
        })
}


/*
returns { id: 'UUID' }
*/
export const createSubtask = async (scheduleId, taskId, title, startTime, endTime, description = '', status = 'PLANNED') => {
    return await apiTaskClient.post(`${scheduleId}/tasks/${taskId}/subtasks`, {
            name: title,
            description,
            startTime,
            endTime,
            status
        })
}

/*
fields can be:
- status
- deadline
- name
- context
*/
export const setTask = async (scheduleId, taskId, fields) => {
    return await apiTaskClient.patch(`${scheduleId}/tasks/${taskId}`, fields)
    
}

/*
fields can be:
- status
- endTime
- startTime
- name
- description
*/
export const setSubtask = async (scheduleId, taskId, subtaskId, fields) => {
    return await apiTaskClient.patch(`${scheduleId}/tasks/${taskId}/subtasks/${subtaskId}`, fields)
    
}

/*
returns { id: 'UUID', userId: 'UUID' }
*/
export const createSchedule = async () => {
    return await apiClient.post('/');
}

export default {
    getTasksInTimestampRange, 
    getTasksForToday,
    getSubtaskById,
    getTaskById,
    createTask,
    createSubtask,
    createSchedule,
    setTask,
    setSubtask
}