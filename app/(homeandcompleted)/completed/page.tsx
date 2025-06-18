"use client";

import { useState, useEffect } from "react";
import CompletedComp from "@/components/CompletedComp";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
async function fetchData() {
  const res = await fetch(`${baseUrl}/completed`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.log("Failed to fetch data");
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default function CompletedTaskPage() {
  const [data, setData] = useState<any>(null);

  const getUserData = async () => {
    const currentData = await fetchData();
    setData(currentData);
  };
  // Call getUserData when the component mounts
  useEffect(() => {
    getUserData();
  }, []);
  console.log(data);

  return (
    <>
      {data && data.length > 0 ? (
        <div className="grid justify-center items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 px-6">
          {data?.map((item: any) => (
            <CompletedComp
              value={item.id}
              id={item.id}
              key={item.id}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl text-green-500 font-bold mt-40">
            No completed tasks available!
          </h1>
        </div>
      )}
    </>
  );
}
