import React from 'react'
import { Skeleton } from '../ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'


function TableSkeleton() {

  const rows = Array.from({ length: 5 })

  return (
    <div className="overflow-x-auto">

      <Table>

        <TableHeader>
          <TableRow>
            <TableHead className="pl-6">
              <Skeleton className="h-4 w-20" />
            </TableHead>

            <TableHead>
              <Skeleton className="h-4 w-28" />
            </TableHead>

            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>

            <TableHead className="text-right pr-6">
              <div className="flex justify-end">
                <Skeleton className="h-4 w-14" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {
            rows.map((_, index) => (

              <TableRow key={index}>

                {/* Logo */}
                <TableCell className="pl-6">

                  <Skeleton className="h-11 w-11 rounded-full" />

                </TableCell>


                {/* Company Name */}
                <TableCell>

                  <div className="space-y-2">

                    <Skeleton className="h-4 w-36" />

                    <Skeleton className="h-3 w-24" />

                  </div>

                </TableCell>


                {/* Date */}
                <TableCell>

                  <Skeleton className="h-4 w-24" />

                </TableCell>


                {/* Action */}
                <TableCell className="text-right pr-6">

                  <Skeleton className="h-9 w-9 rounded-md ml-auto" />

                </TableCell>

              </TableRow>

            ))
          }

        </TableBody>

      </Table>

    </div>
  )
}

export default TableSkeleton