import Link from 'next/link'
import Table from './Table'
import { parseISO, format } from 'date-fns'

export default function ChargeTable({ charges }) {
    const headers = [
        'ID',
        'Is Paid ?',
        'Payment ID',
        'Referral Code',
        'Is Delivered ?',
        'Created At',
        'Total Price',
    ]

    return (
        <Table headers={headers}>
            {charges &&
                charges.map((charge, index) => (
                    <tr
                        key={index}
                        className="border-b bg-white hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-600 hover:dark:text-white"
                    >
                        <td className="py-4 px-6">{charge.id}</td>
                        <td className="py-4 px-6">
                            {charge.isPaid ? 'False' : 'No'}
                        </td>
                        <td className="py-4 px-6">
                            {charge.paymentId || '---'}
                        </td>
                        <td className="py-4 px-6">
                            {charge.referralCode || '---'}
                        </td>
                        <td className="py-4 px-6">
                            {charge.isDelivered ? 'False' : 'No'}
                        </td>
                        <td className="py-4 px-6">
                            {format(
                                parseISO(charge.createdAt),
                                'MMMM dd, yyyy'
                            )}
                        </td>
                        <td className="py-4 px-16">${charge.payableAmount}</td>
                    </tr>
                ))}
        </Table>
    )
}
