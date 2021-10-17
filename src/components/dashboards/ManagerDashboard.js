import React, { useEffect} from 'react';
import axios from "axios";

import { URL } from '../../utils/backend';

import Loading from '../modals/Loading';
import Reimbursements from './Reimbursements';

const ManagerDashboard = (props) => {

    const {user, isLoading, setIsLoading, setReimbList, setEmplList} = props.myHooks;

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

        setIsLoading(true);
        axios
        .post(`${URL}empl.user-list`, user)
        .then((res) => {
            const data = res.data;
            console.log(data);
            setEmplList(data);
            setIsLoading(false);
        },)
        .catch((er) => {
            console.log(er);
            setIsLoading(false);
        });
       
    }, [user]);   

    return (
        <div>
        <Loading isLoading={isLoading}/>
        <Reimbursements myHooks={props.myHooks}/>
    </div>);
}

export default ManagerDashboard;