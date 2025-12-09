import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';

const PrivateRouts = ({ children }) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    console.log(location);

    if(loading){
        return(
            <div className='flex justify-center items-center py-16'>
                <span className="loading loading-bars loading-xl"></span>
            </div>
        )
    }

    if(!user){
        return <Navigate state={location.pathname} to={`/login`}></Navigate>
    }


    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRouts;



