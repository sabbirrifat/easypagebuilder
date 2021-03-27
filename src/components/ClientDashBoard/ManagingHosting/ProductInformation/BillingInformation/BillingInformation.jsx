import React from 'react';
import { useSelector } from 'react-redux';
import './BillingInformation.css'
const BillingInformation = ({details}) => {
    const translation = useSelector(state=>state.pages.translation)==='English';
    return (
        <div className="billinginfo">
            <table className="t_xx">
                <tr>
                    <td>
                    {translation?'Registration Date':'תאריך רישום'}

                    </td>
                    <td>
                        {details.Registration_date}
                    
                    </td>
                
                </tr>
                <tr>
                    <td>
                    {translation?'Recurring Amount ':'סכום חוזר'}

                    </td>
                    <td>
                        {details.Recurring_ammount}
                    
                    </td>
                
                </tr>
                <tr>
                    <td>
                       {translation?'Next Due Date':'תאריך היעד הבא'} 

                    </td>
                    <td>
                        {details.Next_due_data}
                    
                    </td>
                
                </tr>
                <tr>
                    <td>
                        {translation?'Billing Cycle':'מחזור חיוב'}

                    </td>
                    <td>
                        {details.Billing_cycle}
                    
                    </td>
                
                </tr>
                <tr>
                    <td>
                     {translation?'Payment Method':'אמצעי תשלום'}

                    </td>
                    <td>
                        {details.Payment_method}
                    
                    </td>
                
                </tr>
            
            
            </table>
        </div>
    );
};

export default BillingInformation;