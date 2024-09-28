// pages/index.js
import Head from 'next/head';
import DatePicker from './components/DatePicker';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <Head>
        <title>Recurring Date Picker</title>
      </Head>

      <div className="max-w-lg w-full">
        <DatePicker />
      </div>
    </div>
  );
}
