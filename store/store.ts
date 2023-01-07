import create from "zustand";


const store = create(set => ({
    count:0,
    tasks:[],
    addTaskFunction : (taskArray:any) => set((state:any) => ({
        tasks: taskArray
    }))
}))

export default store;