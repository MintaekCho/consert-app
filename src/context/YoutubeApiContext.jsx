'use client'
import Youtube from "@/api/youtube/Youtube";
import YoutubeClient from "@/api/youtube/YoutubeClient";
import { createContext, useContext } from "react";

const YoutubeApiContext = createContext();

const youtubeClient = new YoutubeClient();
const youtube = new Youtube(youtubeClient);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
