// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    modalActive: false,
    selectedTask: {},
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    async createTask(title, user_id) {
      const { error } = await supabase
        .from("tasks")
        .insert({ title: title, is_complete: false, user_id: user_id });
    },
    async removeTask(taskId) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: taskId });
    },
    async removeAllTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .neq("id", 0);
    },
    async updateTask() {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: this.selectedTask.title })
        .match({ id: this.selectedTask.id });
    },
    async updateStatus(is_complete, taskId) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: is_complete })
        .match({ id: taskId });
    },
  },
});
