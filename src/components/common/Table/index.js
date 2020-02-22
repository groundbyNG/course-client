import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {api} from "../../../constants";
import {request} from "../../../helpers/request";

function Table(props) {
  const [elements, setElements] = useState();
  const [columns, ] = useState(props.columns);

  useEffect(() => {
    (async () => {
      const result = await request('GET', true, null,`${api}${props.route}`);
      setElements(result);
    })();
  }, []);

  const onRowAdd = async element => {
    await request('POST', true, element,`${api}${props.route}`);
    const result = await request('GET', true, null,`${api}${props.route}`);
    setElements(result);
  };

  const onRowUpdate = async element => {
    await request('PUT', true, element,`${api}${props.route}`);
    const result = await request('GET', true, null,`${api}${props.route}`);
    setElements(result);
  };
  const onRowDelete = async element => {
    await request('DELETE', true, { [props.deleteField]: element[props.deleteField] },`${api}${props.route}`);
    const result = await request('GET', true, null,`${api}${props.route}`);
    setElements(result);
  };

  return (
    <MaterialTable
      title={props.title}
      columns={columns}
      data={elements}
      options={{
        search: false,
        paging: false,
      }}
      style={{ width: '100%', height: '100%' }}
      editable={props.isEditable ? { onRowAdd, onRowUpdate, onRowDelete } : {}}
    />
  );
}

export default Table;
