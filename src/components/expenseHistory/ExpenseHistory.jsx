import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseHistory = ({ expenses }) => {
  
  const categoryTotals = expenses.reduce((totals, expense) => {
    const category = expense.category;
    if (!totals[category]) {
      totals[category] = 0;
    }
    totals[category] += expense.price;
    return totals;
  }, {});

  
  const data = Object.keys(categoryTotals).map(category => ({
    category,
    amount: categoryTotals[category],
  }));

  return (
    <ResponsiveContainer width={400} height={300}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" /> 
        <YAxis dataKey="category" type="category" /> 
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ExpenseHistory;
