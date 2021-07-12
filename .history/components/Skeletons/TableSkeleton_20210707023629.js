import React from 'react';
import 


function CellSkeleton() {

    return (
        <div class="animate-pulse flex space-x-4 w-32">
            <div class="rounded-full bg-blue-400 h-5/6 w-16"></div>
            <div class="flex-1 space-y-4 py-1">
                <div class="h-4 bg-blue-400 rounded w-32"></div>
                <span class="space-y-1">
                    <div class="h-2 bg-blue-400 rounded"></div>
                </span> 
            </div>
        </div>
    )
}


const TableSkeleton = ({ pageSize, rowSize, loading }) => {
    if(!loading || !pageSize || !rowSize) return null

    const cols = new Array(pageSize).fill(null);
    const rows = new Array(rowSize).fill(null);

    return (
        <TableBody className="min-w-full min-h-full">
            {rows.map((row, i) => {
                return (
                    <TableRow index={i} className="min-w-full min-h-full">
                        {cols.map(function (cell, j) {
                            return (
                                <TableCell index={j} className="m-2">
                                    <CellSkeleton /> 
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </TableBody>
    );
}

export default { TableSkeleton, CellSkeleton  }