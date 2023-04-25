import React, {useState} from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { disabilityOptions } from './Disabilities';

const DropdownMultiselect = () => {

    const [options] = useState(disabilityOptions)

    return(
        <div>
            <Multiselect options={options} displayValue='label' />
        </div>

    )
    
}

export default DropdownMultiselect;


