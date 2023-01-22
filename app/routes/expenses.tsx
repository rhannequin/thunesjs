import { json } from "@remix-run/node"
import { Form, Link, useLoaderData } from "@remix-run/react"

import { getExpenses } from "~/models/expense.server"
import { useUser, money } from "~/utils"

export const loader = async () => {
  return json({ expenses: await getExpenses() })
}

export default function ExpensesPage() {
  const user = useUser()

  const { expenses } = useLoaderData<typeof loader>()

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Expenses</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600">
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Expense
          </Link>

          <hr />
        </div>

        <div className="flex-1 p-6">
          <table className="table-auto border-collapse">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="p-2 pl-4">{expense.title}</td>
                  <td className="p-2 pl-4">{expense.date}</td>
                  <td className="p-2 pl-4">
                    {money(expense.amount, expense.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
