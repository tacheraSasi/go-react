import { useAuth } from '@/context/AuthProvider';
import { api } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

interface Project {
    id: number;
    title: string;
    desc: string;
    progress: string;
    githubURL: string;
    createdAt: string;
    owner: string;
}

  
const RecentProjects = () => {
    const [projects, setProjects] = useState([])
    const { authenticatedUser } = useAuth();
    const user = authenticatedUser;

    useEffect(()=>{
        getAllTasks()
      },[])
    
      const getAllTasks = async () => {
        try {
          const res = await api.post(
            "/projects",
            {
              owner: user?.email,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          setProjects(res.data)
          console.log(res.data)
        } catch (error) {}
      };
  return (
    <div className="p-6 bg-neutral-800 rounded-lg shadow-md border border-neutral-700">
        <h3 className="text-lg font-semibold mb-4 text-neutral-100">
          Recent Projects
        </h3>
        <ul className="space-y-4">
          {projects.map((project:Project, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="text-neutral-300 font-medium">
                  {project.title}
                </p>
                <p className="text-neutral-500 text-sm">
                  Owner: {project.owner}
                </p>
              </div>
              <p className="text-green-400 font-semibold">{project.createdAt}</p>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default RecentProjects