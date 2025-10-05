import { apiClient, apiTaskClient } from "./apiClient"

`
getTasks
getSubtaskById
setTask
setSubTask
createSchedule
updateSubtaskById`

const parseDateAndTime = (s) => {
    const timestamp = s; // example

    // Create a Date object
    const dateObj = new Date(timestamp);

    // Extract just the date (YYYY-MM-DD)
    const date = dateObj.toISOString().split("T")[0];

    // Extract just the time (HH:mm) in local time
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    console.log(`${timestamp} turns into ${date}, ${time}`)
    return [date, time]
} 

function getDaysBetween(start, end) {
  const [startYear, startMonth, startDay] = start.split('-').map(Number);
  const [endYear, endMonth, endDay] = end.split('-').map(Number);

  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  const result = [];
  let current = new Date(startDate);
  let i = 0;
  while (current < endDate) {
    const yy = String(current.getFullYear());
    const mm = String(current.getMonth() + 1).padStart(2, '0');
    const dd = String(current.getDate()).padStart(2, '0');
    if (i > 0) result.push(`${yy}-${mm}-${dd}`);
    current.setDate(current.getDate() + 1);
    i++
  }
  return result;
}

// FOR CALENDAR
export const getTasksInTimestampRange = async (scheduleId, s, e) => {
    const r = await apiTaskClient.get(`${scheduleId}/tasks?startTime=${s}&endTime=${e}`);
    console.log(r)
    if (r.data) {
        return r.data.reduce((acc, task) => {
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
                        eventId: task.id
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
                        eventId: task.id + `${Math.random().toString().slice(2,5)}`
                    }
                )
                getDaysBetween(dateSplitS[0], dateSplitE[0]).forEach(d => acc.push(
                    {
                        id: task.id,
                        date: d,
                        start: '00:00',
                        end: '23:59',
                        title: task.name,
                        description: task.description,
                        parent: task.parent,
                        eventId: task.id + `${Math.random().toString().slice(2,5)}`

                    })
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
                        eventId: task.id
                    }
                )
            }
            return acc
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
    return (await apiTaskClient.get(`${scheduleId}/task/${taskId}/subtask/${subtaskId}`)).data
}

export const getTaskById = async (scheduleId, taskId) => {
    return (await apiTaskClient.get(`${scheduleId}/task/${taskId}`)).data
}

// For today's task if we need it
export const getTasksForToday = async (scheduleId) => {
    const r = await apiTaskClient.get(`${scheduleId}/dailyTasks`);
    console.log(r)
    if (r.data) {
        return r.data.map((task) => {
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

export const getSubtasksByTaskId = async (scheduleId, taskId) => {
    const r = await apiTaskClient.get(`${scheduleId}/task/${taskId}/subtasks`);
    console.log(r)
    if (r.data) {
        return r.data.map(t => ({...t, eventId: t.id }))
    } else {
        return []
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
    return await apiTaskClient.post(`${scheduleId}/task/${taskId}/subtasks`, {
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
    return (await apiTaskClient.patch(`${scheduleId}/task/${taskId}/update`, fields)).data
    
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
    return (await apiTaskClient.patch(`${scheduleId}/task/${taskId}/subtask/${subtaskId}/update`, fields)).data
    
}

/*
returns { id: 'UUID', userId: 'UUID' }
*/
export const createSchedule = async () => {
    return (await apiTaskClient.post('/')).data;
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