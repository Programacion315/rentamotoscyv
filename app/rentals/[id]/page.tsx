import React from "react";
import RentalDetailsClient from "./RentalDetailsClient";
import { motorcycles } from "../../data/motorcycles";

export async function generateStaticParams() {
  return motorcycles.map((m) => ({ id: m.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RentalDetailsClient id={id} />;
}
