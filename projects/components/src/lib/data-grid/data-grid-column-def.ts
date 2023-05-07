export type DataGridActionColumnDef = {
  type: 'actions';
  enableEdit?: boolean;
  enableDelete?: boolean;
  onEdit?: (record: Record<string, unknown>) => void;
  onDelete?: (record: Record<string, unknown>) => void;
};

export type DataGridProcessedActionColumnDef = DataGridActionColumnDef & {
  id: number;
};

export type DataGridColumnDef = {
  fieldName: string;
  sticky?: boolean;
  headerText?: string;
  visible?: boolean;
};

export type DataGridColumn = DataGridColumnDef | DataGridActionColumnDef;

export type DataGridColumns = DataGridColumn[];

export function isActionColumn(
  column: DataGridColumn
): column is DataGridActionColumnDef {
  return 'type' in column && column.type === 'actions';
}
