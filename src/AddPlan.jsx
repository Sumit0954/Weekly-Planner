import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AddPlan = () => {
    const [input, setInput] = useState({
        Tasks_Detail: "",
        SetTime: ""
    })
    const navigate = useNavigate()
    const [state, setState] = useState(false)
    const handleSubmit = () => {
        axios.post("http://localhost:3000/Tasks", input)
            .then(res => setState(true))
            .catch(err => console.log(err))
        navigate("/")

    }
    return (
        <>
            <div className="container" style={{ backgroundColor: "lightgray" , height:200 , width:500 , borderRadius:50 ,  boxShadow: '1px 2px 9px black',}}>
                <center>
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div class="form-group">
                           <h4>Add New Task</h4>
                            <input type="text" placeholder="Enter Task Details" class="form-control" name="Task" onChange={e => setInput({ ...input, Tasks_Detail: e.target.value })} style={{height:50 , width:"50%", borderRadius:50 ,}}/>
                        </div>
                        <div class="form-group">
                        <h4>Set Time</h4>
                            <input type="datetime-local" class="form-control" name="SetTime" onChange={e => setInput({ ...input, SetTime: e.target.value })} style={{height:50 , width:"50%", borderRadius:50}} />
                        </div>
                        <center>
                        <button style={{ margin: 10, borderRadius: 50 , boxShadow: '1px 2px 9px black', }} className="btn btn-success">Submit</button>
                        </center>
                    </div>
                </form>
                </center>
            </div>
        </>
    )
}
export default AddPlan;