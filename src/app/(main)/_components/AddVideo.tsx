"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";


interface Video{
  title: string;
  url: string;
  description: string;
  thumbnail: File|null;  
  category: string;
}

export const AddVideo = () => {

  const [video, setVideo] = useState<Video>({
    title: "",
    url: "",
    description: "",
    thumbnail: null,
    category: "",
  });

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };
  const handleChageTumbnail = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files)
    setVideo({ ...video, [e.target.name]: e.target.files[0]});
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", video.title);
    data.append("url", video.url);
    data.append("description", video.description);
    if(video.thumbnail)data.append("thumbnail", video.thumbnail);
    else return;
    data.append("category", video.category);
    await fetch("http://192.168.137.1:3000/api/addvideo/", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if(res.status===201){
          alert("Video added")
          setVideo({
            title: "",
            url: "",
            description: "",
            thumbnail: null,
            category: "",
          })
          if(ref.current)
          ref.current.value =""
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className=" p-4">
      <form className=" flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={video.title}
          className=" border-muted-foreground"
        />
        <Input
          type="text"
          placeholder="URL"
          name="url"
          value={video.url}
          onChange={handleChange}
          className=" border-muted-foreground"
          required
        />
        <Input
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={video.description}
          className=" border-muted-foreground"
          required
        />

        <Input
          type="text"
          placeholder="Category"
          name="category"
          value={video.category}
          onChange={handleChange}
          className=" border-muted-foreground"
          required
        />
        <div>Thumbnail</div>
        <Input
          type="file"
          accept="image/*"
          placeholder="Thumbnail"
          name="thumbnail"
          onChange={handleChageTumbnail}
          className=" border-muted-foreground"
          ref={ref}
          required
        />
        <Button onClick={handleSubmit}>Add Video</Button>
      </form>
    </div>
  );
};
