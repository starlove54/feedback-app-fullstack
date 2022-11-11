import Card from './Shared/Card'
import {useState, useEffect} from 'react'
import Button from './Shared/Button'
import RatingSelect from './RatingSelect'
import {useContext} from 'react'
import FeedbackContext from "./Context/FeedbackContext";
function FeedbackForm() {

    const {addFeedback , feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [isDisabled, setisDisabled] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setisDisabled(false);
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating);
        }
    },[feedbackEdit])

    const handleTextChange = (e) => {
     
        if(text === ''){
            setMessage(null);
            setisDisabled(true);
        }
        else if(text.trim().length <= 10 && text !== '' ){
            setMessage("Text should be atleast 10 characters");
            setisDisabled(true);
        }
        else{
            setisDisabled(false);
            setMessage(null);
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10){
            const newFeedback = {
                text : text,
                rating: rating
            }

            if(feedbackEdit.edit === true){
                updateFeedback( feedbackEdit.item.id, newFeedback);
            }
            else {
                addFeedback(newFeedback);
            }
            setText('');
        }
    }

  return (
    <Card>
    <form onSubmit={handleSubmit}>
        <h2>How would you rate your service us?</h2>
        <RatingSelect select={(arg) => setRating(arg)}/>
        <div className="input-group">
            <input onChange = {handleTextChange} type="text" placeholder ="Write a review" value = {text} />
            <Button type = "submit" isDisabled = {isDisabled} >Send</Button>
        </div>
        {message && <div className ='message'>{message}</div>}
    </form>
    </Card>
  )
}

export default FeedbackForm