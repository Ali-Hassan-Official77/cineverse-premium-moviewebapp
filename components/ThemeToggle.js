"use client";
import {useEffect,useState} from "react";
import {Moon,Sun} from "lucide-react";
import {notify} from "@/components/Toast";
export default function ThemeToggle(){
 const [theme,setTheme]=useState("dark");
 useEffect(()=>setTheme(document.documentElement.dataset.theme||"dark"),[]);
 function toggle(){const next=theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("cineverse-theme",next);setTheme(next);notify(`${next==="dark"?"Dark":"Light"} mode enabled`,"info")}
 return <button type="button" onClick={toggle} aria-label={`Switch to ${theme==="dark"?"light":"dark"} mode`} className="theme-toggle"><span className="sr-only">Toggle theme</span>{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button>
}
