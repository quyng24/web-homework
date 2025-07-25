import { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/LayoutDefault";

export default function UserDashboard() {
  const [nameUser, setNameUser] = useState();
  useEffect(() => setNameUser(JSON.parse(localStorage.getItem('user')).name), []);
  return (
    <LayoutDefault>
      <div className="flex flex-col min-h-screen">
        <h2 className="text-2xl font-bold">Xin chào, {nameUser}!</h2>
      </div>
    </LayoutDefault>
  );
}
