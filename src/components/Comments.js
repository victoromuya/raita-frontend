import React from 'react'


function Comments(props) {
   
      
  return (
  <div>
    {props.comments && props.comments.map?.(comment => {
        return (
          <div key={comment.id} className='comment'>
            <div>
              <div className='title__date d-flex'>
                <p>{comment.comments}</p>
              </div>
            </div>
            <hr className="hrclass pr-5" />
          </div>
        )
      })}
    </div>
  )
}

export default Comments
