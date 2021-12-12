import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getLocalData = () =>{
    const lists = localStorage.getItem("todolist")
    if(lists){
        return JSON.parse(lists)
    }else{return []}
}

const getJobDone = () => {
    const jobDone = localStorage.getItem("jobDone")
    if(jobDone){
        return JSON.parse(jobDone)
    }else{
        return []
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [toggleButton, setToggleButton] = useState(false)
    const [edited, setEdited] = useState("")
    const [showSuccess, setShowSuccess] = useState(getJobDone())

    // add items
    const addItem = () =>{
        if(!inputData){
            toast("plz fill the item!!")
        }else if(inputData && toggleButton){
            setItems(items.map((i)=>{
                if(i.id === edited){
                    return {...i, name : inputData}
                }else{return i}
            }))
            setInputData("")
            setToggleButton(false)
            setEdited(null)
        }else{
            const newData = {
                id : new Date().getTime().toString(),
                name : inputData
            }
            setItems([...items, newData]);
            setInputData("")
        }
    }

    // edit items
    const editedItem = (id) =>{
        const edited = items.find((i)=>{
            return i.id === id
        })
        setInputData(edited.name)
        setToggleButton(true)
        setEdited(id)
    }

    // delete items
    const deletedItem = (id) => {
        const deleted = items.filter((i)=>{
            return i.id !== id
        })
        setItems(deleted)
    }

//  success works
const success = (id) => {
    const suc = items.find((i)=>{
        return i.id === id
    })
    setShowSuccess([...showSuccess, suc])
    setItems(items.filter((i)=>{
        return i.id !== id
    }))
}


    // remove all item
    const removeAll = () =>{
        setItems([])
    }

    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(items))
        localStorage.setItem("jobDone",JSON.stringify(showSuccess))
       document.title = `Items-to-do(${getLocalData().length})`
    },[items],[showSuccess])

    return (
        <>
        <Snowfall />
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todo-list" />
                        <figcaption>Add Your Item Here ✌️</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" className="form-control" placeholder="✍️ Add Item" value={inputData} onChange={(e)=>setInputData(e.target.value)} />
                        {
                            toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                        }
                        
                    </div>

                    {/* show items */}
                    <div className="showItems">
                        {
                            items.map((i)=>{
                                return (
                                    <div className="eachItem" key={i.id}>
                            <h3>{i.name}</h3>
                            <div className="todo-btn">
                                <i className="far fa-edit add-btn" onClick={()=>editedItem(i.id)}></i>
                                <i className="far fa-trash-alt add-btn" onClick={()=>deletedItem(i.id)}></i>
                                <i className="far fa-check-circle add-btn" onClick={()=>success(i.id)}></i>
                            </div>  
                        </div>
                                )
                            })
                        }
                        
                    </div>

                    {/* remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text ="Remove All" onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>

                      

                </div>

                   {/* show success work */}
                   <div className="child-div">

                   <div className="showItems">
                        <h1>Jobs Done 👍</h1>
                            {
                                showSuccess.map((i)=>{
                                    return(
                                        <div className="eachItem" key={i.id}>
                                            <h3>{i.name}</h3>
                                        </div>
                                    )
                                })
                            }
                   </div>

                        </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Todo
