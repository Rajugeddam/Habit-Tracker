
// Homepage

// importing react hooks
import { useEffect, useState } from "react";

// redux hooks
import { useDispatch, useSelector } from "react-redux";

// actions from habitReducer
import { habitSelector, quoteFetchThunk, setSuggestionSelected } from "../Redux/Reducer/habitReducer";

// different Components used in homepage

//for adding a new habit to list 
import AddHabit from "../Component/AddHabit";




// render the homepage 
const Homepage = () => {

    // for calling redux actions
    const dispatch = useDispatch();

    // state variable from habitReducer , to show image on homepage, to know if user clicked on a habit in suggestion list
    const { displayImageUrl,suggestionSelected } = useSelector(habitSelector);

    // whether to show / hide the input section to "Add Habit"
    const [showAddHabit,setShowAddHabit] = useState(false);

    // fetch a quote from api on first render of the page
    useEffect(() => {
        dispatch(quoteFetchThunk());
    },[]);


    // if user click on a suggestion in suggestion list
    // show the "Add Habit" form
    useEffect(() => {
        if(suggestionSelected){
            setShowAddHabit(true);
        }
    },[suggestionSelected]);


    // to show or hide the "Add Habit"
    const toggleAddHabit = (e) => {
        e.preventDefault();
        // toggle the value
        setShowAddHabit((prev) => !prev);

        // if user hide the "Add Habit" form, then reset the value of suggestion selected to null (if there was some value in it)
        if(!showAddHabit){
            // calling the action
            dispatch(setSuggestionSelected(null));
        }
    }


    // render the page
    return(
        // main container of page
        <div className="w-full flex h-full justify-center my-2 overflow-auto bg-fixed">

        {/* container containing all the differnet section on the home page */}
            <div className="w-[90%] h-fill flex">

                {/* container showing quote , "Add Habit" form, and "image" */}
                <div className="w-full h-fit md:w-2/3 flex flex-col items-center justify-between
                                 bg-[white] md:h-full p-2 mr-1 rounded shadow-md">
                    
                        <div className="w-full lg:w-4/5 mb-1">
                            {/* button to show / hide the "Add Habit" form on screen */}
                            <button className="bg-[green] hover:bg-[black] text-md 
                                                p-[20px] px-[40px] float-center
                                                rounded shadow-sm text-white"
                                    onClick={toggleAddHabit}>

                                {/* value of button on different condition */}
                                {!showAddHabit? "Add New Habbit" : "Cancel"}
                            </button>
                        </div>

                    
                    
                    {
                        // if user clicked on the 'Add Habit' button
                        showAddHabit?
                            <div className="w-full h-full flex justify-center">
                                {/* show the "Add Habit" component */}
                                <AddHabit />
                            </div>
                        :
                            // else show a image on screen { new image on each render }
                            <img src={displayImageUrl} alt="image" 
                                className="hidden md:block w-full lg:w-4/5 md:h-full lg:h-2/3 mb-2 opacity-90" />
                    }
                    
                    
                    
                </div>


               
                
            </div>
        </div>            
    )
}

// exporting the homepage for using it outside
export default Homepage;