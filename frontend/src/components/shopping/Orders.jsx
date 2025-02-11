import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'

const Orders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2345678</TableCell>
              <TableCell>17/06/2024</TableCell>
              <TableCell>In Progress</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>
                <Button>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Orders