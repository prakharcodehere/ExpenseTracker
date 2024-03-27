import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const CustomPieChart = ({ expenses }) => {
  // Calculate total amount of all expenses
  const totalAmount = expenses.reduce((total, expense) => total + expense.price, 0);

  // Create an object to store the total amount for each category
  const categoryTotals = {};

  // Iterate through expenses to sum up amounts for each category
  expenses.forEach(expense => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.price;
    } else {
      categoryTotals[expense.category] = expense.price;
    }
  });

  // Convert categoryTotals object into an array of objects for Recharts data
  const data = Object.keys(categoryTotals).map(category => ({
    name: category,
    value: (categoryTotals[category] / totalAmount) * 100, // Calculate percentage of total amount
  }));

  // Define colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Add more colors as needed

  return (
    
    <ResponsiveContainer width="60%" height={275} className="chart-container">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;
