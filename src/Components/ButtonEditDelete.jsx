import React from 'react'
import { Button} from 'react-bootstrap'

function ButtonEditDelete(props) {
    return (
        <div>
            <div className='button d-flex justify-content-end mb-4' style={{ width: '25rem' }}>
                <div className="div btn-edit mx-2">
                    <Button
                        onClick={() => props.edit(props.id)}
                        // onClick={() => { history.push(`/formupdate/${props.id}`) }}
                        variant="success">edit</Button>
                </div>
                <div className="div btn-delete" buttonDelete={props.id}>
                    <Button
                        onClick={() => props.remove(props.id)}
                        variant="danger">Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default ButtonEditDelete