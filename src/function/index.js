import React from 'react';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ['ID', 'Name', 'Age'],
      data: [
        [1, 'John Doe', 30],
        [2, 'Jane Doe', 25],
        // ...更多数据  
      ],
    };
  }

  test() {
    if (data instanceof Promise) {
      return data.then((data) => {
        this.props.updata({
          history: typeof data === 'object' ? data : JSON.parse(data)
        })
      })
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.exportExcel()}>导出Excel</button>
      </div>
    );
  }

  exportExcel = () => {
    const { columns, data } = this.state;
    const ws = XLSX.utils.aoa_to_sheet([columns, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    try {
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'my-data.xlsx');
    } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout); }
    return wbout;
  };
}

export default MyTable;