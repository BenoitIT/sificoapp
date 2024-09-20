import React from 'react';
import CardSales from './CardSales';
import SalesList from './SalesList';

const salesData = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', avatarUrl: '/images/avatar.png', amount: '$1,999.00' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', avatarUrl: '/images/avatar.png', amount: '$39.00' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', avatarUrl: '/images/avatar.png', amount: '$299.00' },
  { name: 'William Kim', email: 'will@email.com', avatarUrl: '/images/avatar.png', amount: '$99.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', avatarUrl: '/images/avatar.png', amount: '$39.00' },
];

const SalesPanel: React.FC = () => {
  return (
    <div className=" lg:mt-0 lg:w-[40%] w-full">
      <CardSales title="Recent Shippings" subtitle="You made 265 shippings this month.">
        <SalesList sales={salesData} />
      </CardSales>
    </div>
  );
};

export default SalesPanel;
