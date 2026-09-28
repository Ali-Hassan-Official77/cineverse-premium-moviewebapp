"use client";
import {useEffect,useState} from "react";
import {ToastProvider} from "@/components/Toast";
export default function AppProviders({children}){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const saved=localStorage.getItem("cineverse-theme");
    const theme=saved||"dark";
    document.documentElement.dataset.theme=theme;
    setReady(true);
  },[]);
  return <ToastProvider>{children}</ToastProvider>;
}
