import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './App.css';

const DisplayAllTask = () => {

    const [input, setInput] = useState({
        Tasks_Detail: "",
        SetTime: ""
    })

    const [isLoading, Setloading] = useState(true);
    const [error, setError] = useState(null);

    const [Data, setData] = useState([])
    useEffect(() => {
        try {
            axios.get("http://localhost:3000/Tasks")
                .then(item => setData(item.data))
            Setloading(false)
        }
        catch (error) {
            setError(error)
        }
    }, [])

    const navigate = useNavigate()
    const [state, setState] = useState(false)
    const handleSubmit = () => {
        axios.post("http://localhost:3000/Tasks", input)
            .then(res => setState(true))
            .catch(err => console.log(err))
        navigate("/")

    }


    const TaskDone = (id) => {
        let confirm = window.confirm("Task Done!!!")
        if (confirm) {
            axios.delete(`http://localhost:3000/Tasks/${id}`)
                .then(res => window.location.reload())
                .catch(err => console.log(err))
        }

    }


    const AllDone = () => {
        const confirm = window.confirm("This Week Task is Completed!!!")
        if (confirm) {
            setData([])
        }

    }

    if (isLoading) {
        return (
            <>
                <div className="spinner-border" style={{ width: "2rem", height: "2rem" , position:"relative" , left:"62rem" , top:"6px" , zIndex:"10" }} role="status">
                </div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <div className="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Error Occured!!!</h4>
                    <p>{error.message}</p>
                </div>
            </>
        )
    }


    return (
        <>
            <div className="container" style={{ backgroundColor: "lightgray" }}>
                <h1 style={{ color: "green", boxShadow: '1px 2px 9px black' }}>𝐖𝐄𝐄𝐊𝐋𝐘 𝐏𝐋𝐀𝐍𝐍𝐄𝐑</h1><span><i className="bi bi-bookmarks-fill"></i></span>
                <div className="container" style={{ backgroundColor: "black", boxShadow: '1px 2px 9px black' }}>
                    <ol className="list-group list-group-numbered" id="box">
                        {
                            Data.map((d, i) => {
                                return <li key={i + 1}></li>,
                                    <li className="list-group-item">{d.id}</li>,
                                    <li className="list-group-item">{d.Tasks_Detail}<button style={{ margin: 10, borderRadius: 50, float: "right", boxShadow: '1px 2px 9px black' }} onClick={() => TaskDone(d.id)} className="btn btn-success">Done</button><br /><span style={{ fontWeight: "bolder" }}>{d.SetTime}</span></li>
                            })
                        }
                    </ol>
                    <div class="d-grid gap-1 col-4 mx-auto">
                        <button class="btn btn-primary" style={{ margin: 5, borderRadius: 50, boxShadow: '1px 2px 9px darkblue' }} onClick={() => AllDone()}>All Task Done</button>
                    </div>
                </div>
            </div>
            {/* -----------------------------Add New Task---------------------------------- */}
            <br />
            <br />
            <div className="container" style={{ backgroundColor: "lightgray", height: 200, width: 500, borderRadius: 50, boxShadow: '1px 2px 9px black' }}>
                <center>
                    <form onSubmit={handleSubmit}>
                        <div className="container">
                            <div class="form-group">
                                <h4>Add New Task</h4>
                                <input type="text" placeholder="Enter Task Details" class="form-control" name="Task" onChange={e => setInput({ ...input, Tasks_Detail: e.target.value })} style={{ height: 50, width: "50%", borderRadius: 50, boxShadow: '1px 2px 9px black' }} />
                            </div>
                            <div class="form-group">
                                <h4>Set Time</h4>
                                <input type="datetime-local" placeholder="datetime" class="form-control" name="SetTime" onChange={e => setInput({ ...input, SetTime: e.target.value })} style={{ height: 50, width: "50%", borderRadius: 50, boxShadow: '1px 2px 9px black' }} />
                            </div>
                            <center>
                                <button style={{ margin: 10, borderRadius: 50, boxShadow: '1px 2px 9px black', }} className="btn btn-success">Submit</button>
                            </center>
                        </div>
                    </form>
                </center>
            </div>
        </>
    )
}
export default DisplayAllTask;