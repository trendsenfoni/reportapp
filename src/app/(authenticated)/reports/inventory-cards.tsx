import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getItem, getList } from '@/lib/fetch'
import { moneyFormat } from '@/lib/utils'

export function InventoryCards() {
  const [token, setToken] = useState('')
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      getList('/reports/inventoryCards', token)
        .then(result => {
          console.log('result:', result)
          setList(result)
        })
        .catch(err => toast({ title: 'error', description: err || '' }))
    }
  }, [token])
  return (
    <Table className='overflow-hidden'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="">Kod</TableHead>
          <TableHead className="">Isim</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='overflow-hidden'>
        {list && list.map((e) => (
          <TableRow key={e.Kod}>
            <TableCell className="font-medium text-wrap">{e.Kod}</TableCell>
            <TableCell className="">{e.Isim}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  )
}
