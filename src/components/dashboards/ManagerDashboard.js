import React, { useEffect} from 'react';
import axios from "axios";

import { URL } from '../../utils/backend';

import Loading from '../Loading';
import Reimbursements from './Reimbursements';

const ManagerDashboard = (props) => {

    const {user, isLoading, setIsLoading, setReimbList} = props.myHooks;

    useEffect(() => {
        setIsLoading(true);
        axios
        .post(`${URL}by-manager-id.reimb-list`, user)
        .then((res) => {
            const data = res.data;
            console.log(data);
            setReimbList(data);
            setIsLoading(false);
        },)
        .catch((er) => {
            console.log(er);
            setIsLoading(false);
        });
       
    }, [user]);   

    return (
        <div>
        {isLoading ? <Loading/> : <Reimbursements myHooks={props.myHooks}/>}
    </div>);
}

export default ManagerDashboard;