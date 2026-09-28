"use client";
import {createContext,useCallback,useContext,useEffect,useMemo,useState} from "react";
import {CheckCircle2,Info,AlertTriangle,X} from "lucide-react";
const ToastContext=createContext(null);
export function ToastProvider({children}){
 const [items,setItems]=useState([]);
 const toast=useCallback((message,type="success")=>{
   const id=Date.now()+Math.random(); setItems(v=>[...v,{id,message,type}]);
   setTimeout(()=>setItems(v=>v.filter(x=>x.id!==id)),2800);
 },[]);
 useEffect(()=>{const fn=e=>toast(e.detail?.message||"Done",e.detail?.type||"success");window.addEventListener("cineverse:toast",fn);return()=>window.removeEventListener("cineverse:toast",fn)},[toast]);
 const value=useMemo(()=>({toast}),[toast]);
 return <ToastContext.Provider value={value}>{children}<div className="fixed bottom-5 right-5 z-[120] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2 pointer-events-none">{items.map(t=><div key={t.id} className="toast pointer-events-auto flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] px-4 py-3 shadow-2xl backdrop-blur-xl"><span className={t.type==="error"?"text-red-500":t.type==="info"?"text-cyan-500":"text-emerald-500"}>{t.type==="error"?<AlertTriangle size={18}/>:t.type==="info"?<Info size={18}/>:<CheckCircle2 size={18}/>}</span><span className="flex-1 text-sm font-medium text-[var(--text)]">{t.message}</span><button onClick={()=>setItems(v=>v.filter(x=>x.id!==t.id))} aria-label="Dismiss"><X size={15} className="text-[var(--muted)]"/></button></div>)}</div></ToastContext.Provider>
}
export function useToast(){return useContext(ToastContext)||{toast:()=>{}}}
export function notify(message,type="success"){if(typeof window!=="undefined")window.dispatchEvent(new CustomEvent("cineverse:toast",{detail:{message,type}}))}
