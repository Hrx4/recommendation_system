"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import VideoCard from "./VideoCard";

export interface video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
}
export const VideoSearch = () => {
  const [search, setSearch] = useState("");
  const [loading , setLoading] = useState(false)
  const [videos, setVideos] = useState<video[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    if (search.length < 1) {
      alert("Please enter a search query");
      return;
    }
    setLoading(true)
    await fetch("http://192.168.137.1:3000/api/query/", {
        method: "POST",
        body: JSON.stringify({ videoQuery: search }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((data)=>{
            setVideos(data)
        })
      }).catch((error)=>{
        console.log(error)
      })
      setLoading(false)

  };

  const allVideos = useCallback(
    async()=>{
      setLoading(true)
        await fetch("http://192.168.137.1:3000/api/allvideos/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            
            res.json().then((data)=>{
                setVideos(data)
            })
          }).catch((error)=>{
            console.log(error)
          })
          setLoading(false)
    },
    [],
  )
  
  useEffect(() => {
    allVideos()
  }, [])
  


  return (
    <div className=" w-1/2">
      <div className="flex items-center justify-center gap-x-4">
        <Input
          onChange={handleChange}
          placeholder="Search"
          className=" border-muted-foreground/60"
        />
        <Button
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      <div className=" my-5 flex flex-col gap-y-4 justify-center gap-x-4">
        {loading && <div>Loading...</div>}
        {!loading && videos.length===0 && <div>No videos</div>}

        { videos.length > 0 && (
          videos.map((video) => (
            <VideoCard
              key={video._id}
              id={video._id}
              title={video?.title}
              description={video?.description}
              thumbnail={video?.thumbnail}
            />
          ))
        )}
      </div>
    </div>
  );
};