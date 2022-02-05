import React, {useContext, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

import FormLoginModal from '../Components/FormLoginModal'

function PrivateRoute({ component: Component, ...rest }) {
    const [modalShow, setModalShow] = useState(false);
    const [state] = useContext(UserContext)
    // console.log(state.user)

    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    state.isLogin ? <Component {...props} /> : <Redirect to={<FormLoginModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        />} />
                }
            />
        </>
    )
}

export default PrivateRoute