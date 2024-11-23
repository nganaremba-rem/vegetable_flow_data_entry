'use client';

import { salesRepForecast } from '@/actions/salesRepForecast';
import type { StoreType } from '@/app/@admin/store/columns';
import CSVDownloadButton from '@/components/CSVDownloadButton';
import { DialogContainer } from '@/components/DialogContainer';
import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useCSVData from '@/hooks/useCSVData';
import { useColumns } from '@/hooks/useColumns';
import { useItemStore } from '@/store/itemStore';
import type {
  CustomResponseType,
  ItemsWithPreset,
  SalesRepForecastType,
} from '@/typings';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MailCheck, MessageCircleWarning } from 'lucide-react';
import { useEffect, useMemo, useState, useTransition } from 'react';
import SuggestedForecastField from './SuggestedForecastField';
import UpdateInventoryField from './UpdateInventoryField';
import UpdatePacketsRequiredField from './UpdatePacketsRequiredField';

// This interface defines the props (properties) that must be passed to the MainComponent
interface MainComponentProps {
  items: ItemsWithPreset[]; // List of items with their preset values
  storeId: string; // Unique identifier for the store
  byRole: string; // User role (e.g. sales rep, manager)
  isAlreadyForecasted: boolean; // Whether forecast has already been submitted
  storeDetail: StoreType; // Details about the store
  alreadyForecastedData: CustomResponseType<{
    storeId: string;
    storeName: string;
    data: SalesRepForecastType[];
  }> | null; // Data from previous forecast if it exists
}

// Interface for managing dialog/popup state
interface DialogState {
  issues: string[]; // List of error messages
  message: string; // Success/info message
}

export default function MainComponent({
  items: initialItems,
  storeId,
  byRole,
  isAlreadyForecasted,
  storeDetail,
  alreadyForecastedData,
}: MainComponentProps) {
  // Get functions to manage items in global store
  const { setItems, items: finalItems } = useItemStore();

  // State for managing async operations
  const [isPending, startTransition] = useTransition();

  // State for dialog messages and visibility
  const [state, setState] = useState<DialogState>({
    issues: [],
    message: '',
  });
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  // When component first loads, process the initial items to calculate packets required
  useEffect(() => {
    // Added null check to prevent processing undefined/null items
    if (!initialItems) return;

    const processedItems = initialItems.map((item) => ({
      ...item,
      // Calculate packets required if not already set:
      // If packets_required is undefined or 0, use preset minus inventory
      // Otherwise keep existing packets_required value
      packets_required:
        item?.packets_required !== 0 && !item?.packets_required
          ? Math.max(0, (item.preset || 0) - (item.inventory || 0)) // Added null checks and ensure non-negative value
          : item.packets_required || 0, // Ensure packets_required is never undefined
    }));
    setItems(processedItems);
  }, [initialItems, setItems]);

  // Function to submit forecast data to the server
  const submitForecast = async (items: ItemsWithPreset[]) => {
    // Added validation to prevent submission of empty/invalid data
    if (!items || items.length === 0) {
      setState({
        issues: ['No items to submit'],
        message: '',
      });
      setIsErrorDialogOpen(true);
      return;
    }

    const dataToSubmit = items.map((item) => {
      // Added null checks and default values
      const inventory = Math.max(0, item?.inventory || 0); // Ensure non-negative inventory
      let srForecast = 0;

      // Calculate sales rep forecast based on packets required
      if (item?.packets_required !== 0 && !item?.packets_required) {
        srForecast = Math.max(0, (item.preset || 0) - inventory);
      } else if (item?.packets_required >= 0) {
        srForecast = item.packets_required;
      }

      return {
        itemCode: Number(item.itemCode) || 0, // Convert to number and provide fallback, // Added default value
        inventory,
        srForecast,
      };
    });

    // Prepare final data object for submission
    const finalData = {
      storeId: storeId || '', // Added default value
      byRole: byRole || '', // Added default value
      data: dataToSubmit,
    };

    try {
      // Added error handling for API call
      const { issues, message } = await salesRepForecast(finalData);
      setState({ issues: issues || [], message: message || '' }); // Added default values

      // Show appropriate dialog based on response
      setIsErrorDialogOpen(issues?.length > 0);
      setIsSuccessDialogOpen(!issues || issues.length === 0);
    } catch (error) {
      // Handle API errors gracefully
      setState({
        issues: ['Failed to submit forecast. Please try again.'],
        message: '',
      });
      setIsErrorDialogOpen(true);
    }
  };

  // Define columns that should be hidden in the table/CSV
  const hiddenColumns = useMemo(() => ['itemCode'], []);

  // Prepare data for CSV export with null check
  const csvData = useCSVData({
    data: alreadyForecastedData?.data?.data ?? initialItems ?? [], // Added fallback empty array
    hiddenColumns,
  });

  // Define columns for displaying already forecasted data with null checks
  const alreadyForecastedColumns = useColumns(
    alreadyForecastedData?.data?.data || [],
    [],
    ['itemCode']
  ) as ColumnDef<SalesRepForecastType | ItemsWithPreset>[];

  // Define columns for the main data table
  const columns = useColumns(
    initialItems || [], // Added null check
    [
      {
        id: 'inventory',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Inventory' />
        ),
        cell: ({ row }) => <UpdateInventoryField row={row} />,
      },
      {
        id: 'suggested_forecast',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Suggested Forecast' />
        ),
        cell: ({ row }) => <SuggestedForecastField row={row} />,
      },
      {
        id: 'packets_required',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Sales Rep. Forecast' />
        ),
        cell: ({ row }) => <UpdatePacketsRequiredField row={row} />,
      },
    ],
    ['itemCode']
  );

  return (
    <div className='2xl:px-[17rem] px-3 md:px-10 flex flex-col gap-2 py-2'>
      {/* Error Dialog */}
      <DialogContainer open={isErrorDialogOpen} setOpen={setIsErrorDialogOpen}>
        <div className='flex flex-col'>
          <div className='text-red-600 flex gap-6 items-center'>
            <MessageCircleWarning size={30} color='red' />
            {state.issues?.[0]} {/* Added optional chaining */}
          </div>
          <Separator className='my-5' />
          <Button
            className='bg-red-600 text-white hover:bg-red-700 w-max self-end'
            onClick={() => setIsErrorDialogOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>

      {/* Success Dialog */}
      <DialogContainer
        open={isSuccessDialogOpen}
        setOpen={setIsSuccessDialogOpen}
      >
        <div className='flex flex-col'>
          <div className='text-green-600 flex gap-6 items-center'>
            <MailCheck size={39} color='green' />
            {state.message}
          </div>
          <Separator className='my-5' />
          <Button
            className='bg-red-600 text-white hover:bg-red-700 w-max self-end'
            onClick={() => setIsSuccessDialogOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>

      {/* Header section with date and CSV download */}
      <div className='flex justify-between items-center gap-2'>
        <p className='text-gray-700 text-sm'>
          Date: {format(Date.now(), 'dd/MM/yyyy')}
        </p>
        {isAlreadyForecasted &&
          storeDetail?.storeName && ( // Added null check for storeName
            <CSVDownloadButton
              filename={`Sales Rep Record - ${storeDetail.storeName} (${format(
                Date.now(),
                'dd-MM-yyyy hh:mma'
              )})`}
              csvData={csvData}
            />
          )}
      </div>

      {/* Success message for forecasted data */}
      <div className='text-green-500 text-sm'>
        {isAlreadyForecasted && alreadyForecastedData?.message}{' '}
        {/* Added optional chaining */}
      </div>

      {/* Main data table */}
      <DataTable
        searchId='itemName'
        searchPlaceholder='Search Vegetable'
        columns={isAlreadyForecasted ? alreadyForecastedColumns : columns}
        data={alreadyForecastedData?.data?.data ?? initialItems ?? []} // Added fallback empty array
      />

      {/* Submit button */}
      <Button
        onClick={() => {
          startTransition(() => {
            submitForecast(finalItems);
          });
        }}
        disabled={isPending || isAlreadyForecasted || !finalItems?.length} // Added null check
        className='w-full my-10 shadow-lg bg-primary-blue hover:bg-sky-700 dark:text-white'
      >
        {isPending ? 'Submitting...' : 'Submit to Sales Manager'}
      </Button>
    </div>
  );
}
