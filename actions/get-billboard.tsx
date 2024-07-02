import prismadb from '@/lib/prismadb';
import { Billboard } from '@/types';
import axios from 'axios';
import { NextResponse } from 'next/server';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string) => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();

  /* const billboard = await prismadb.billboard.findUnique({
    where: {
      id: id,
    },
  });
  return billboard; */
};

export default getBillboard;
