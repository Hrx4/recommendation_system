"use client";

import VideoCard from "../../_components/VideoCard";
import { use, useCallback, useEffect, useState } from "react";
import { video } from "../../_components/VideoSearch";
import { backend } from "@/app/api/lib/backend";

type Params = Promise<{ id: string }>


const Page = (props: { params: Params }) => {
//   const video = useQuery(api.videos.getVideo, {
//     id: params.id as Id<"videos">,
//   });
// const router = useRouter()
const params = use(props.params);

  const [videos, setVideos] = useState<video[]>([]);
  const [video, setVideo] = useState<video>();


  const handleCurrentVideo = useCallback(
    async () => {
        await fetch(`${backend}api/allvideos/${params.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            res.json().then((data)=>{
                setVideo(data.video)
                setVideos(data.similarVideos)
            })
          }).catch((error)=>{
            console.log(error)
          })
    },
    [],
  )
  

  useEffect(() => {
        handleCurrentVideo()
  }, []);

  return (
    <div className="flex flex-col px-2">
      <div className="relative w-full mb-3">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        </div>

        <img
          src={video?.thumbnail}
          alt={video?.title}
          width={500}
          height={500}
        />
      </div>
      <h1 className="text-2xl font-bold">{video?.title}</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        {video?.description}
      </p>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Upcoming Video</h2>
        <div>
          {videos.length === 0 && (
            <p className=" text-sm text-muted-foreground">
              Loading related videos
            </p>
          )}
          {videos?.length > 0 &&
            videos
              .slice(1)
              .map((video) => (
                <VideoCard
                  key={video._id}
                  id={video?._id}
                  title={video?.title}
                  description={video?.description}
                  thumbnail={video?.thumbnail}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Page;