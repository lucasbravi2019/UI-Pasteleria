import { Table, ConfigProvider } from 'antd';
import React from 'react';
import es_ES from 'antd/locale/es_ES'

const TableGrid = (props) => {
  const { columns, data } = props

  return (
    <>
      <ConfigProvider locale={es_ES}>
        <Table columns={columns} dataSource={data} bordered tableLayout='fixed' />
      </ConfigProvider>
    </>
  )
}

export default TableGrid