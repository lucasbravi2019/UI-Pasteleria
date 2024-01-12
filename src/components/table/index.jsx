import { Table, ConfigProvider } from 'antd';
import React, { useState } from 'react';
import es_ES from 'antd/locale/es_ES'

const TableGrid = (props) => {
  const { columns, data } = props
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1
  })
  return (
    <>
      <ConfigProvider locale={es_ES}>
        <Table columns={columns} dataSource={data} bordered tableLayout='fixed'
          pagination={{
            ...pagination,
            pageSizeOptions: [10, 20, 30, 40, 50],
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setPagination(prev => ({ ...prev, current: page, pageSize }))
            },
            onShowSizeChange: (_, size) => {
              setPagination(prev => ({ ...prev, current: 1, pageSize: size }))
            }
          }} />
      </ConfigProvider>
    </>
  )
}

export default TableGrid