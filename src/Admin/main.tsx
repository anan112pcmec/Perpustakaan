import { Outlet } from "react-router";
import {Header} from "./Header";
import { Sidebar } from "./Sidebar";
import { useSelector } from "react-redux";


export default function AdminApp(){
    const Dimana = useSelector((state:any) => state.namahalamanadmin)
    return(
        <>
        <div className="grid grid-cols-[15%_85%]">
            <div><Sidebar/></div>
            <div>
                <Header title={Dimana}/>
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
        </>
    )
}