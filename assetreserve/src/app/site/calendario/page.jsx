import { Suspense } from "react";
import CalendarioClient from "@/components/calendario/CalendarioClient";


export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Carregando...</p>}>
      <CalendarioClient />
    </Suspense>
  );
}
