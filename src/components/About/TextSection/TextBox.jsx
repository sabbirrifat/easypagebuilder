import React from 'react'
import FormattedText from '../../../hooks/FormattedText'

const TextBox = ({item}) => {
    return (
        <div className="col-12 col-lg-6">
            <p>
              <FormattedText objectName={item} extension="Description" />
            </p>
        </div>
    )
}

export default TextBox
