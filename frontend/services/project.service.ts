import { api } from "@/lib/axios";

export const getProjects = (email: string) => {
    return api.get(`/project?email=${email}`);
};

export const createProject = (data: { name: string; url: string }) => {
    return api.post("/project", data);
};
