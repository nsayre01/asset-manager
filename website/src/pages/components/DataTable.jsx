import { DataGrid } from "@mui/x-data-grid";

/**
 * DataTable
 *
 * A reusable React component that displays tabular data using MUI's DataGrid.
 * If columns are not provided, they are generated automatically from the data keys.
 * Each row is ensured to have a unique `id` property.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.data - The array of data objects to display in the table.
 * @param {Array<Object>} [props.columns] - Optional array of column definitions for the DataGrid.
 * @returns {JSX.Element} The rendered DataTable component.
 */
export default function DataTable({ data, columns, ...props }) {
  // Generate columns dynamically based on model keys
  // Generate columns if not provided
  const autoColumns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          
          flex: 1,
        }))
      : [];

  // Ensure each row has a unique id
  const rows = data.map((row, idx) => ({
    id: row.id ?? idx,
    ...row,
  }));

  return (
      <DataGrid
        rows={rows}
        columns={columns || autoColumns}
        rowsPerPageOptions={[5, 10, 25]} // Allows the user to choose between viewing 5, 10, or 25 rows per page.
        disableRowSelectionOnClick
        {...props}
      />
  );
}
