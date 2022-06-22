import React from 'react';
import CSVReader from 'react-csv-reader';

const DashboardCSV = () => {

    return (
        <div>
            <CSVReader onFileLoaded={(data, fileInfo, originalFile) => console.log(data)} />
        </div>
    );
};

export default DashboardCSV;