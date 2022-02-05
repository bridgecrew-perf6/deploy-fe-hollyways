import React, {useState } from 'react'
import { Button } from 'react-bootstrap'
import FormLoginModal from '../Components/FormLoginModal';

  function Login() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <div to="/login" className='login'>
                <Button onClick={() => setModalShow(true)} variant="outline-light">Login</Button>
            </div>

        <FormLoginModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
}


export default Login