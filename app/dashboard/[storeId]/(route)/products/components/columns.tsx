import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  images: string;
};

export const columns: ColumnDef<ProductColumn, unknown>[] = [
  {
    accessorKey: 'images',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrls = row.original.images.split(', ');
      const firstImageUrl = imageUrls[0] || '/placeholder-image.jpg';
      return (
        <div className="flex items-center justify-center">
          <img src={firstImageUrl} alt={row.original.name} className="w-10 h-10 object-cover rounded-full" />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    accessorKey: 'id',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
