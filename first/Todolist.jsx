import React,{useState} from "react";

const Todolist=()=>{
    const[message,setMessage]=useState(
        {
            text:"",
            id:""
        }
    );
    const[list,setList]=useState([]);

    const[editingItem,setEditingItem]=useState(
        {
            id:"",
            isEditing:false
        }
    );
 
    const clickSubmit=(e)=>{
             e.preventDefault();
             const a={
                text:message.text,
                id: new Date().getTime().toString()
             }
             console.log(a);
             setList(
                [   /// i used[] braces bcoz setList is array . for object we use {}
                    ...list,
                    a
                ]
             )
              setMessage({
                text:"",
                id:""
           } )
          }

  const clickDelete=(id)=>{
         let c=list.filter((eachItem)=>{
            return eachItem.id!=id;
         })  
         setList(c);
  }

  const changeEditState=(id)=>{
      console.log(id);
      setEditingItem({
        ...editingItem,
        id:id,
        isEditing:true,
      })
      let editableItem = list.find((eachItem) =>eachItem.id===id);
      setMessage({
        ...message,
        text:editableItem.text,
        id:editableItem.id,
      })
  }

  const clickEdit=(e)=>{
    e.preventDefault();
    console.log("previous todos",list);
    let newTodos=list.map((eachItem)=>{
        if(eachItem.id===editingItem.id){
        return{
            text:message.text,
            id:editingItem.id,
        }
    }
   else{
    return eachItem;
   }} );
     setList(newTodos);
     setMessage({
        text:"",
        id:""
     })
     setEditingItem({
        id:"",
        isEditing:false
     })
  }


    return(
        <div>
           <form>
            <input 
                type="text"
                placeholder="enter some text"
                value={message.text}
                onChange={(e)=> setMessage({
                       ...message,
                       text:e.target.value })
                    }
            />
            
            {editingItem.isEditing? (<button type="submit" onClick={clickEdit}>Edit</button>):(<button type="submit" onClick={clickSubmit}>Add</button>)}
           </form>
           <hr/>
         {list.length==0 && <h4>There is no items in List</h4>}
       
           <ul>
              <>
                {
                    list.map((eachItem)=>{
                        const{text,id}=eachItem;
                        return(
                            <li key={id}>
                                <span>{text}</span>
                                       <button onClick={()=>changeEditState(id)}>Edit</button>
                                       <button onClick={()=>clickDelete(id)}>Delete</button>
                            </li>
                    
                        )
                    })
                }
             
              </>
           </ul>
          
        </div>
    
    )
}
export default Todolist;