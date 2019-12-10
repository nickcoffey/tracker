import React from 'react'
import PropTypes from 'prop-types'

export default function Table(props) {
    const columns = props.headerColumns.map(((column, index) =>
        <th key={index}>{column}</th>
    ))

    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        {columns}
                    </tr>
                </thead>
                <tbody>
                    {props.bodyRows}
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    headerColumns: PropTypes.any.isRequired,
    bodyRows: PropTypes.any.isRequired
}