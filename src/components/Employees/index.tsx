import { useEffect, useMemo, useState } from 'react';
import { getEmployeesRequest } from '../../api-rest/employees';
import DataTable from 'react-data-table-component';
import { FilterComponent } from '../FilterComponent';

export const Employees = () => {
  const [pending, setPending] = useState(true);
  const [employees, setEmployees] = useState([]);

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    getEmployeesRequest()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPending(false);
      });
  }, []);

  const columns = [
    {
      name: 'Id',
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row: any) => row.lastName,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row: any) => row.firstName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: 'Age',
      selector: (row: any) => row.age,
      sortable: true,
    },
    {
      name: 'Salary',
      selector: (row: any) => row.salary,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row: any) => row.address,
      sortable: true,
    },
    {
      name: 'Contact Number',
      selector: (row: any) => row.contactNumber,
      sortable: true,
    },
  ];

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const filteredEmployees = employees.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  return (
    <div className="max-w-[1100px] m-auto border border-1 rounded-lg">
      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination
        progressPending={pending}
        defaultSortFieldId={1}
        striped
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    </div>
  );
};
