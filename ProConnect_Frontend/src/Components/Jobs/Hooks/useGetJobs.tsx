import { useState, useEffect } from "react";
import { get } from "../../../Services/Requests";
import { Job, JobDateSearch, JobStatus } from "../../../Models/Job";

const URI = "jobs/page";

export function useGetJobs()
{
  const [jobs, setJobs] = useState<Job[]>([]);
  const params: Map<string,any> = new Map();

  useEffect(() =>
  {
    const page = {pageNumber: 1, pageSize: 5, sortDirection: "ASC", sortBy:"datePosted"}
    const criteria = {budget: 100, jobStatus: JobStatus.DRAFT, jobDateSearch: JobDateSearch.AllTime}
    params.clear();
    params.set("pageNumber", 1);
    params.set("pageSize", 5);
    params.set("sortDirection", "ASC");
    params.set("sortBy", "datePosted");
    params.set("budget", 100);
    params.set("jobStatus", JobStatus.PUBLISHED);
    params.set("jobDateSearch",JobDateSearch.AllTime);
    get(URI, params)
      .then((response) =>
      {
        setJobs(response.data);
        console.log(response.data)
      })
      .catch((error : Error) =>
      {
        console.log(error.message);
      });
  },[]);

  return jobs;
}

export function useGetJobsWithParams(params: Map<string,any>)
{
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() =>
  {
    get(URI, params)
      .then((response) =>
      {
        setJobs(response.data);
      })
      .catch((error) =>
      {
        alert(error.message);
      });
  },[]);

  return jobs;
}
