import React from 'react';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  headers: React.ReactNode[];
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children, className = '', ...props }) => {
  return (
    <div className="product-table-wrapper">
      <table className={`product-table ${className}`.trim()} {...props}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
