import {useState, createContext, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext();
export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])
    const [isLoading, setisLoading]= useState(true)

    useEffect( () => {
        fetchFeedback()
    },[])
        //fetch feedback 
        const fetchFeedback = async () => {
            const response = await fetch(`/feedback?_sort=id&_order=desc`)
            const data = await response.json();
            setFeedback(data);
            setisLoading(false);
        }

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // delete feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){

            await fetch(`/feedback/${id}`,{method: 'DELETE'})
            setFeedback( feedback.filter( (item) => item.id !== id))
        }
    }

    // set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit( prevVal => ({
            item :item,
            edit: true 
        }))
    }

    // update feedback
    const updateFeedback = async (id, updItem) => {
        const response  = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(updItem)
        })
        const data = await response.json();
        setFeedback(feedback.map( (item) => item.id === id ? {...item, ...data} : item));
    }

    // add feedback
    const addFeedback = async (newFeedback) =>  {
        const response = await fetch( '/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const  data = await response.json();
        setFeedback( prev => [data,...feedback]);    
    }

    return <FeedbackContext.Provider value = {{
            feedback,
            deleteFeedback,
            isLoading,
            addFeedback,
            editFeedback,
            feedbackEdit,
            updateFeedback
    }}
    >
    {children}
    </FeedbackContext.Provider>
} 

export default FeedbackContext;                                                                                     