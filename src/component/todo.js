import React, { useState } from 'react';
import todo from "../images/notes.png";
import "../index.css";

const Todo = () => {
    const [inputdata, setinputdata] = useState('');
    const [items, setitems] = useState([]);
    const [togglesbmt, settogglesbmt] = useState(true);
    const [isEditItem, setisEditItem] = useState(null);

    const addItem = () => {
        if (!inputdata) {
            alert('Blank data not accepted.');
        }

        /*Edit an existing entry in todo list*/
        else if (inputdata && !togglesbmt) {
            setitems(

                /*where ever the entry matches edit the data, rest keep the same*/
                items.map((elem) => {
                    if (elem.id == isEditItem) {
                        return { ...elem, name: inputdata }
                    }
                    return elem;
                })
            )

            /*Reset the data back to originals*/
            settogglesbmt(true);
            setinputdata('');
            setisEditItem(null);
        }

        /*Add new entry in worklist*/
        else {
            const allInputdata = { id: new Date().getTime().toString(), name: inputdata }
            setitems([...items, allInputdata]);
            setinputdata('');
            /*setitems([...items, inputdata]);
            setinputdata('');*/
        }
    }


    /*delete only that data where id matches with the index given in arguement*/
    const deleItem = (index) => {
        const updatedItems = items.filter((element) => {
            return index != element.id;
        });

        setitems(updatedItems);
    }


    //Edit the item
    //Step1 --> Get the id and name of element which user clicked to edit.
    //Step2 --> Set the toggle mode to change the submit button into edit button.
    //Step3 --> Now update the value of the setinput data with the new updated value into edit.
    //Step4 --> To pass the current element Id to new state variable for reference.


    /* Most important part*/
    const editItem = (id) => {

        /*Fetch the id of selected element. If matches with clicked element, 
        send its name and id and set togglesbmt to false*/
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });

        settogglesbmt(false);
        setinputdata(newEditItem.name);
        setisEditItem(id);
    }

    const deleteAll = () => {
        setitems([]);
    }

    return (
        <div className='main-div'>
            <div className='child-div'>


                <figure>
                    <img src={todo} alt='todologo' />
                    <figcaption>Add your work list here👍</figcaption>
                </figure>

                <div><input type='text' placeholder='Add your items...'
                    value={inputdata}
                    onChange={(e) => setinputdata(e.target.value)}
                />
                    {
                        togglesbmt ? <i className="fa fa-plus add-btn" title="Add an Item"
                            onClick={addItem}></i> : <i className="far fa-edit add-btn" title="Update an Item"
                                onClick={addItem} style={{ color: "blue" }}></i>
                    }


                </div>


                <div className='showItems'>
                    {
                        items.map((element) => {
                            return (
                                <div className='eachItem' key={element.id}>
                                    <h3>{element.name}</h3>
                                    <div className='td-btn'>
                                        <i className="far fa-edit add-btn" title='Edit Item' style={{ marginRight: "4px" }} onClick={() => editItem(element.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title='Delete Item' onClick={() => deleItem(element.id)}></i>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

                {/*Clear all buttons*/}
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Clear List" onClick={deleteAll}><span>WORK LIST</span></button>
                </div>
            </div>
        </div>
    )
}

export default Todo;