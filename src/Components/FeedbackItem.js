import {useContext} from 'react';
import Card from './Shared/Card';
import PropTypes from 'prop-types';
import {FaTimes, FaEdit} from 'react-icons/fa';
import FeedbackContext from "./Context/FeedbackContext";

function FeedbackItem({item}) {

  const {deleteFeedback, editFeedback} = useContext(FeedbackContext);

  return (
    <Card >
        <div className="num-display">{item.rating}</div>  
        <button className="close">
            <FaTimes onClick = {() => deleteFeedback(item.id)} color = 'purple'/>
        </button>    
        <button onClick={() => editFeedback(item)} className="edit">
          <FaEdit color = 'purple'/>
        </button>  
        <div className="text-display">
        {item.text}
        </div>        
    </Card>
  )
}

FeedbackItem.propTypes = {
    item : PropTypes.object.isRequired,
}


export default FeedbackItem