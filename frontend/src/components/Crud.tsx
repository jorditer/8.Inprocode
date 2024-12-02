import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEvents } from "../hooks/useEvents";
import { useEventMutations } from "../hooks/useEventMutations";
import { useState, useCallback, useMemo } from "react";
import { GridReadyEvent, CellValueChangedEvent } from "ag-grid-community";

const myCellComponent = p => {
    return <>
<button style={{alignContent: "center"}} className="shadow -ms-1 rounded-full border-2 hover:bg-red-400 bg-red-200 active:bg-red-500 border-red-700 hover:border-red-900 w-5 h-5 inline-flex items-center justify-center me-2">-</button>
    {p.value}
  </>
}

const Crud = () => {
  const { data: events, isLoading, error } = useEvents();
  const { updateEvent } = useEventMutations();
  
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
		suppressSizeToFit: false,
    flex: 1,
  }), []);

  const onCellValueChanged = async (params: CellValueChangedEvent) => {
    try {
      await updateEvent.mutateAsync({
        id: params.data._id,
        updates: { [params.colDef.field!]: params.newValue }
      });
    } catch (error) {
      console.error('Failed to update:', error);
      // Optionally refresh grid to revert changes
      params.api.refreshCells();
    }
  };
 

	// AG Grid makes you define the fields with the name of the key of the json value they will represent
  const [colDefs] = useState([
		{ cellRenderer: myCellComponent, field: "_id" },
    { field: "name", minWidth: 150, editable: true },
    { field: "location", minWidth: 150, editable: true },
    { field: "price", minWidth: 100, editable: true,
			cellRenderer: (params: {value: string}) => `${params.value} €`,
      // valueParser is used to validate the input value
      valueParser: (params: { newValue: string, oldValue: number }) => {
        const num = Number(params.newValue);
        if (isNaN(num) || num < 0 || num > 99) {
          return params.oldValue;
        }
        return num;
      },
      // Custom cell editor, if above 99 or below 0 the cell turns red
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
        max: 99
      }
    
		 },
     { 
      field: "date", 
      minWidth: 150, 
      editable: true,
      valueFormatter: (params: {value: string}) => {
        const date = new Date(params.value);
        return `${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      }
    },
  ]);

	const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    
    // Add window resize listener
    window.addEventListener('resize', () => {
      setTimeout(() => {
				params.api.sizeColumnsToFit();
      });
    });
  }, []);
	
	if (isLoading) return <div>...</div>;
	if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <h1>Events</h1>
      <div className="mx-auto max-w-[95vw] ag-theme-quartz">
        <AgGridReact 
          rowData={events}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default Crud;